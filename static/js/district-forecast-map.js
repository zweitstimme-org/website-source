/**
 * District (Direktmandat) forecast map — Leaflet choropleth + detail panel.
 * Used by the internal preview at /preview/direktmandate/.
 * Method: blog/posts/district-forecast-methodology/
 */
(function (global) {
  'use strict';

  const DISTRICT_PARTY_COLORS = {
    'CDU/CSU': '#000000',
    CDU: '#000000',
    AfD: '#009EE0',
    SPD: '#E3000F',
    'GRÜNE': '#46962b',
    LINKE: '#BE3075',
    FDP: '#FFED00',
    BSW: '#FF6B35',
    Sonstige: '#888888'
  };

  const DISTRICT_GEO_ATTRIBUTION = {
    MV: 'Wahlkreise: LAiV MV',
    ST: 'Wahlkreise: StaLA Sachsen-Anhalt',
    BE: 'Wahlkreise: Geoportal Berlin / AfS BBB'
  };

  let mapInstance = null;
  let mapLayer = null;
  let leafletLoaderPromise = null;

  function formatStandDate(raw) {
    if (!raw || typeof raw !== 'string') return '';
    const d = /^\d{4}-\d{2}-\d{2}$/.test(raw)
      ? new Date(raw + 'T00:00:00Z')
      : new Date(raw);
    if (Number.isNaN(d.getTime())) return '';
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const yyyy = String(d.getUTCFullYear());
    return `${dd}.${mm}.${yyyy}`;
  }

  function setDistrictStand(metadata) {
    const el = document.getElementById('vorhersage-districts-stand');
    if (!el) return;
    const raw = (metadata && (metadata.statewide_last_poll_date || metadata.last_poll_date)) || '';
    const formatted = formatStandDate(raw);
    el.textContent = formatted ? ` · Stand: ${formatted}` : '';
  }

  function ensureLeaflet() {
    if (global.L) return Promise.resolve(global.L);
    if (leafletLoaderPromise) return leafletLoaderPromise;
    leafletLoaderPromise = new Promise((resolve, reject) => {
      const cssId = 'leaflet-css-cdn';
      if (!document.getElementById(cssId)) {
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }
      if (!document.getElementById('leaflet-zoom-fix')) {
        const style = document.createElement('style');
        style.id = 'leaflet-zoom-fix';
        style.textContent = `
          #vorhersage-districts-map .leaflet-control-zoom a,
          #vorhersage-districts-map .leaflet-bar a {
            text-decoration: none !important;
            color: #333 !important;
            background-color: #fff !important;
          }
          #vorhersage-districts-map .leaflet-control-zoom a:hover,
          #vorhersage-districts-map .leaflet-bar a:hover {
            text-decoration: none !important;
            background-color: #f4f4f4 !important;
          }
        `;
        document.head.appendChild(style);
      }
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => resolve(global.L);
      script.onerror = () => reject(new Error('Leaflet failed to load'));
      document.head.appendChild(script);
    });
    return leafletLoaderPromise;
  }

  function districtWinnerIndex(items) {
    const byWkr = {};
    (items || []).forEach(row => {
      if (!row || row.wkr == null) return;
      if (!byWkr[row.wkr]) byWkr[row.wkr] = [];
      byWkr[row.wkr].push(row);
    });
    const winners = {};
    Object.keys(byWkr).forEach(wkr => {
      const rows = byWkr[wkr];
      const win = rows.find(r => r.winner) || rows.slice().sort((a, b) => (b.probability || 0) - (a.probability || 0))[0];
      if (win) winners[String(wkr)] = win;
    });
    return winners;
  }

  function districtFillStyle(win) {
    const color = win ? (DISTRICT_PARTY_COLORS[win.partei] || '#999') : '#ccc';
    const p = Math.max(0, Math.min(100, Number(win && win.probability) || 0)) / 100;
    const fillOpacity = 0.2 + 0.75 * p;
    return { color: '#fff', weight: 1, fillColor: color, fillOpacity };
  }

  function districtHasCandidateName(r) {
    if (!r) return false;
    if (r.name && String(r.name).trim()) return true;
    return !!(r.Vornamen && r.Nachname);
  }

  function districtIsOthers(r) {
    const p = String((r && r.party) || '').toLowerCase();
    const label = String((r && r.partei) || '');
    return p === 'others' || p === 'oth' || label === 'Sonstige' || label === 'And.' || label === 'Andere';
  }

  function districtPartyNameCoverage(stateItems) {
    const byParty = {};
    const wkrs = new Set();
    (stateItems || []).forEach(r => {
      if (!r || districtIsOthers(r)) return;
      const wkr = Number(r.wkr);
      if (!Number.isFinite(wkr)) return;
      wkrs.add(wkr);
      const key = String(r.party || r.partei || '');
      if (!key) return;
      if (!byParty[key]) byParty[key] = { namedWkrs: new Set(), label: r.partei || key };
      if (districtHasCandidateName(r)) byParty[key].namedWkrs.add(wkr);
    });
    const nWkr = Math.max(1, wkrs.size);
    const out = {};
    Object.keys(byParty).forEach(key => {
      const n = byParty[key].namedWkrs.size;
      out[key] = {
        namedCount: n,
        share: n / nWkr,
        fairlyComplete: n / nWkr >= 0.7
      };
    });
    return out;
  }

  function districtRowsForDisplay(rows, stateItems) {
    const all = (rows || []).slice();
    const coverage = districtPartyNameCoverage(stateItems || all);
    const keep = [];
    const fold = [];
    all.forEach(r => {
      if (districtIsOthers(r)) return;
      if (districtHasCandidateName(r)) {
        keep.push(r);
        return;
      }
      const key = String(r.party || r.partei || '');
      const cov = coverage[key];
      if (cov && cov.fairlyComplete) {
        fold.push(r);
      } else {
        keep.push(r);
      }
    });
    const othersSrc = all.find(districtIsOthers);
    const foldValue = fold.reduce((s, r) => s + (Number(r.value) || 0), 0);
    const foldL1 = fold.reduce((s, r) => s + (Number(r.value_l1) || 0), 0);
    const foldLow = fold.reduce((s, r) => s + (Number(r.low) || 0), 0);
    const foldHigh = fold.reduce((s, r) => s + (Number(r.high) || 0), 0);

    const out = keep.map(r => ({ ...r }));
    if (othersSrc || foldValue > 0.05) {
      const o = othersSrc ? { ...othersSrc } : {
        party: 'others',
        partei: 'Sonstige',
        probability: 0,
        winner: false
      };
      o.partei = (o.partei === 'And.') ? 'Andere' : (o.partei || 'Sonstige');
      o.value = Math.round(((Number(o.value) || 0) + foldValue) * 10) / 10;
      o.value_l1 = Math.round(((Number(o.value_l1) || 0) + foldL1) * 10) / 10;
      o.low = Math.round(Math.max(0, (Number(o.low) || 0) + foldLow) * 10) / 10;
      o.high = Math.round(Math.min(100, (Number(o.high) || 0) + foldHigh) * 10) / 10;
      delete o.name;
      delete o.Vornamen;
      delete o.Nachname;
      out.push(o);
    }
    return out.sort((a, b) => {
      const aOth = districtIsOthers(a) ? 1 : 0;
      const bOth = districtIsOthers(b) ? 1 : 0;
      if (aOth !== bOth) return aOth - bOth;
      return (b.probability || 0) - (a.probability || 0) || (b.value || 0) - (a.value || 0);
    });
  }

  function formatWinProbabilityPct(prob) {
    const n = Number(prob);
    if (!Number.isFinite(n)) return '—';
    const rounded = Math.round(n);
    if (rounded >= 100) return '~100%';
    if (rounded <= 0) return '~0%';
    return `${rounded}%`;
  }

  function districtBandBarHtml(row, maxHigh) {
    const lo = Number(row.low);
    const hi = Number(row.high);
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) return '';
    const scaleMax = Math.max(5, maxHigh || 50);
    const left = Math.max(0, (lo / scaleMax) * 100);
    const width = Math.max(1.5, Math.min(100 - left, ((hi - lo) / scaleMax) * 100));
    const barWidth = Math.min(width, Math.max(0, 78 - left));
    const color = DISTRICT_PARTY_COLORS[row.partei] || '#999';
    const label = `${Math.round(lo)}–${Math.round(hi)}%`;
    return `
      <div style="position:relative;height:20px;background:#f0f0f0;border-radius:4px;width:100%;margin-top:0.35rem;">
        <div style="position:absolute;left:${left}%;width:${barWidth}%;height:4px;top:50%;transform:translateY(-50%);background:${color};border-radius:2px;"></div>
        <div style="position:absolute;right:6px;top:50%;transform:translateY(-50%);font-size:0.78rem;color:#333;background:#f0f0f0;padding-left:4px;z-index:1;">${label}</div>
      </div>`;
  }

  function renderDistrictDetail(wkr, items, wkrName, l1Label) {
    const el = document.getElementById('vorhersage-districts-detail');
    if (!el) return;
    const allRows = (items || []).filter(r => Number(r.wkr) === Number(wkr));
    const rows = districtRowsForDisplay(allRows, items);
    if (!rows.length) {
      el.style.display = 'none';
      el.innerHTML = '';
      return;
    }
    const name = wkrName || allRows[0]?.wkr_name || `Wahlkreis ${wkr}`;
    const winner = allRows.find(r => r.winner) || allRows.slice().sort((a, b) => (b.probability || 0) - (a.probability || 0))[0] || rows[0];
    el.style.display = 'block';
    const winnerName = winner.name || [winner.Vornamen, winner.Nachname].filter(Boolean).join(' ');
    const yearLabel = l1Label || 'l1';
    const maxHigh = Math.ceil(Math.max(...rows.map(r => Number(r.high) || 0), 1) / 5) * 5 + 5;
    const needsToggle = rows.length > 3;
    const unnamedCount = rows.filter(r => !districtIsOthers(r) && !districtHasCandidateName(r)).length;
    const escapeHtml = (s) => String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    const candidateNameHtml = (displayName, sourceUrl) => {
      const safe = escapeHtml(displayName);
      if (sourceUrl && /^https?:\/\//i.test(String(sourceUrl))) {
        return `<a class="district-candidate-link" href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer" title="Quelle öffnen">${safe}</a>`;
      }
      return safe;
    };
    const winnerSource = (winner.name_source && /^https?:\/\//i.test(String(winner.name_source)))
      ? String(winner.name_source)
      : '';
    const winnerLabel = winnerName
      ? ` · ${candidateNameHtml(winnerName, winnerSource)}`
      : ' · <span style="font-weight:400;font-style:italic;color:#888;">Name noch nicht bekannt</span>';
    el.innerHTML = `
      <div style="font-weight:700; margin-bottom:0.55rem; text-align:center;">
        WK ${wkr}: ${escapeHtml(name)}
        <span style="font-weight:500; color:#555;"> — voraus. ${escapeHtml(winner.partei)}${winnerLabel} (${formatWinProbabilityPct(winner.probability)})</span>
      </div>
      <div class="district-party-list${needsToggle ? ' is-collapsed' : ''}" style="display:flex; flex-direction:column; gap:0.55rem;">
        ${rows.map((r, index) => {
          const isOthers = districtIsOthers(r);
          const cand = isOthers
            ? ''
            : (r.name || [r.Vornamen, r.Nachname].filter(Boolean).join(' ') || '');
          const nameUnknown = !isOthers && !cand;
          const src = (r.name_source && /^https?:\/\//i.test(String(r.name_source)))
            ? String(r.name_source)
            : '';
          const color = DISTRICT_PARTY_COLORS[r.partei] || '#999';
          const weight = r.winner ? '600' : '500';
          const who = nameUnknown
            ? `<span style="font-style:italic;color:#888;font-weight:400;">Name noch nicht bekannt</span> · ${escapeHtml(r.partei)}`
            : `${cand ? `${candidateNameHtml(cand, src)} · ` : ''}${escapeHtml(r.partei)}`;
          return `
            <div class="district-party-item" style="border-left:4px solid ${color}; padding:0.35rem 0 0.45rem 0.65rem; border-top:${index ? '1px solid #eee' : 'none'};">
              <div style="display:flex; flex-wrap:wrap; gap:0.25rem 0.75rem; align-items:baseline; font-size:0.88rem; font-weight:${weight};">
                <span>${who}</span>
                <span style="font-weight:500; color:#666; font-size:0.8rem;">${escapeHtml(yearLabel)}: ${Math.round(Number(r.value_l1))}%</span>
                <span style="font-weight:500; color:#666; font-size:0.8rem;">P(Sieg): ${formatWinProbabilityPct(r.probability)}</span>
              </div>
              ${districtBandBarHtml(r, maxHigh)}
            </div>`;
        }).join('')}
      </div>
      ${needsToggle ? '<button type="button" class="scenario-prob-toggle district-party-toggle" aria-expanded="false">Mehr anzeigen</button>' : ''}
      ${unnamedCount ? `<div style="margin-top:0.65rem;text-align:center;font-size:0.78rem;color:#888;">Bei ${unnamedCount === 1 ? 'einer Partei' : unnamedCount + ' Parteien'} ist uns der Direktkandidat:innen-Name noch nicht bekannt — die Partei wird trotzdem ausgewiesen.</div>` : ''}
    `;
    const list = el.querySelector('.district-party-list');
    const toggle = el.querySelector('.district-party-toggle');
    if (list && toggle) {
      toggle.addEventListener('click', () => {
        const collapsed = list.classList.toggle('is-collapsed');
        toggle.textContent = collapsed ? 'Mehr anzeigen' : 'Weniger anzeigen';
        toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      });
    }
  }

  function hide() {
    const section = document.getElementById('vorhersage-districts-section');
    if (section) section.style.display = 'none';
    setDistrictStand(null);
    const detail = document.getElementById('vorhersage-districts-detail');
    if (detail) {
      detail.style.display = 'none';
      detail.innerHTML = '';
    }
    const sizeEl = document.getElementById('vorhersage-parliament-size');
    if (sizeEl) {
      sizeEl.style.display = 'none';
      sizeEl.innerHTML = '';
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderParliamentSize(code, payload) {
    const el = document.getElementById('vorhersage-parliament-size');
    if (!el) return;
    const st = payload && payload.states && payload.states[code];
    if (!st) {
      el.style.display = 'none';
      el.innerHTML = '';
      return;
    }
    const buckets = Array.isArray(st.buckets) ? st.buckets : [];
    const maxPct = Math.max(1, ...buckets.map(b => Number(b.pct) || 0));
    const chamber = st.chamber || 'Parlament';
    const pointSize = st.point && st.point.size;
    const bars = buckets.map(b => {
      const pct = Number(b.pct) || 0;
      const width = Math.max(pct > 0 ? 2 : 0, (pct / maxPct) * 100);
      return `
        <div class="district-size-row">
          <span>${escapeHtml(b.label)}</span>
          <div class="district-size-bar-track">
            <div class="district-size-bar-fill" style="width:${width}%;"></div>
          </div>
          <span style="text-align:right;">${pct.toFixed(1)}%</span>
        </div>`;
    }).join('');

    let note = '';
    if (code === 'MV') {
      const pInc = st.p_incomplete_pct;
      const p1 = (st.advantage_seats_pct && st.advantage_seats_pct['1']) || null;
      const impact = st.majority_impact || {};
      const abs = impact.scenarios && impact.scenarios.abs_maj_afd;
      const absLine = abs
        ? ` Die <strong>Absolute Mehrheit der AfD</strong> verschiebt der Deckel nicht
            (Sitzmehrheit mit Deckel ${escapeHtml(String(abs.seats_capped_pct))} % vs.
            vollem Ausgleich ${escapeHtml(String(abs.seats_full_ausgleich_pct))} % —
            Differenz ${escapeHtml(String(abs.cap_minus_full_pp))} pp).`
        : '';
      const oneSeat = p1 != null
        ? ` Wenn der Deckel greift, bleibt praktisch immer <strong>genau ein</strong> Extra-Sitz
            (ca. ${escapeHtml(String(p1))} % der Simulationen).`
        : '';
      note = `
        <div class="district-size-note">
          <p><strong>Überhang &amp; Ausgleich in MV:</strong> ${escapeHtml(st.note_de)}</p>
          <p>
            In etwa <strong>${escapeHtml(String(pInc))} %</strong> der Simulationen reicht der Ausgleich
            nicht vollständig (Deckel: höchstens doppelt so viele Ausgleichs- wie Überhangmandate).
            ${oneSeat}
            Betroffen sind vor allem SPD oder AfD als Überhangpartei — andere Parteien erhalten
            dann Ausgleichssitze, aber keinen unkompensierten Extra-Sitz.
          </p>
          <p>
            <strong>Mehrheiten:</strong> Der Effekt auf Szenario-Wahrscheinlichkeiten liegt unter 0,5 pp.
            ${absLine}
            Die Koalitionsszenarien der Landesprognose bleiben deshalb die Zweitstimmen-Näherung.
          </p>
          <p style="color:#888;font-size:0.76rem;">
            Indikativ aus dem Wahlkreis-Swing-Modell (ohne Kandidateneffekte) — keine amtliche Sitzzuteilung.
            Details im <a href="${escapeHtml((global.pipelineData.SITE_BASE || '/') + 'blog/posts/district-forecast-methodology/#parlamentsgroesse')}" style="color:var(--primary,#0056b3);">Methoden-Explainer</a>.
          </p>
        </div>`;
    } else if (code === 'ST') {
      const majNote = (st.majority_impact && st.majority_impact.note_de)
        ? escapeHtml(st.majority_impact.note_de)
        : 'Ausgleich stellt den Proporz in der Regel (nahezu) wieder her; Mehrheits-Szenarien über Zweitstimmen bleiben eine gute Näherung.';
      note = `
        <div class="district-size-note">
          <p><strong>Überhang &amp; Ausgleich in ST:</strong> ${escapeHtml(st.note_de)}</p>
          <p>
            Der Ausgleich vergrößert den Landtag schrittweise; ein kleiner Restüberhang
            kann nach mehreren Runden an der Fraktionsstärke-Grenze stehen bleiben
            (meist höchstens ein Sitz). Die Verteilung zeigt vor allem die
            mögliche Gesamtgröße.
          </p>
          <p><strong>Mehrheiten:</strong> ${majNote}</p>
          <p style="color:#888;font-size:0.76rem;">
            Indikativ aus dem Wahlkreis-Swing-Modell — keine amtliche Sitzzuteilung.
          </p>
        </div>`;
    } else {
      const majNote = (st.majority_impact && st.majority_impact.note_de)
        ? escapeHtml(st.majority_impact.note_de)
        : 'Überhang wird vollständig ausgeglichen; Sitzmehrheiten ≈ Zweitstimmenmehrheiten.';
      note = `
        <div class="district-size-note">
          <p><strong>Überhang &amp; Ausgleich in Berlin:</strong> ${escapeHtml(st.note_de)}</p>
          <p>
            In unseren Simulationen wird der Überhang vollständig ausgeglichen
            (unvollständiger Ausgleich: 0 %) — die Unsicherheit steckt vor allem in der
            <em>Größe</em> des Abgeordnetenhauses.
          </p>
          <p><strong>Mehrheiten:</strong> ${majNote}</p>
          <p style="color:#888;font-size:0.76rem;">
            Indikativ aus dem Wahlkreis-Swing-Modell — keine amtliche Sitzzuteilung.
          </p>
        </div>`;
    }

    el.style.display = 'block';
    el.innerHTML = `
      <h4>Geschätzte Größe — ${escapeHtml(chamber)}</h4>
      <div class="district-size-stats">
        <span>Minimum gesetzlich: <strong>${escapeHtml(String(st.base_seats))}</strong></span>
        <span>Median: <strong>${escapeHtml(String(st.size_median))}</strong></span>
        <span>Punktschätzung: <strong>${escapeHtml(String(pointSize))}</strong></span>
        <span>p90: <strong>${escapeHtml(String(st.size_p90))}</strong></span>
      </div>
      <div class="district-size-bars">${bars}</div>
      ${note}
    `;
  }

  async function mount(opts) {
    const code = String((opts && opts.code) || 'MV').toUpperCase();
    const section = document.getElementById('vorhersage-districts-section');
    const mapEl = document.getElementById('vorhersage-districts-map');
    const legendEl = document.getElementById('vorhersage-districts-legend');
    if (!section || !mapEl || !global.pipelineData) {
      console.warn('DistrictForecastMap: missing DOM or pipelineData');
      return;
    }
    if (!['MV', 'ST', 'BE'].includes(code)) {
      hide();
      return;
    }

    try {
      const [districtForecast, geo, parliamentSize] = await Promise.all([
        global.pipelineData.loadForecastDistricts(code),
        global.pipelineData.loadWahlkreiseGeo(code),
        global.pipelineData.loadParliamentSize
          ? global.pipelineData.loadParliamentSize().catch(() => null)
          : Promise.resolve(null)
      ]);
      const items = districtForecast.items || districtForecast;
      const meta = districtForecast.metadata || {};
      const l1Label = meta.l1_label || 'l1';
      const winners = districtWinnerIndex(items);
      const L = await ensureLeaflet();

      section.style.display = 'block';
      setDistrictStand(meta);
      if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
        mapLayer = null;
      }
      mapEl.innerHTML = '';
      mapInstance = L.map(mapEl, {
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: false
      });
      const geoAttr = DISTRICT_GEO_ATTRIBUTION[code] || 'Wahlkreise';
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: `&copy; OpenStreetMap, &copy; CARTO · ${geoAttr}`,
        maxZoom: 12
      }).addTo(mapInstance);

      mapLayer = L.geoJSON(geo, {
        style(feature) {
          const win = winners[String(feature.properties.wkr)];
          return districtFillStyle(win);
        },
        onEachFeature(feature, layer) {
          const wkr = feature.properties.wkr;
          const name = feature.properties.wkr_name;
          const win = winners[String(wkr)];
          const tip = win
            ? `WK ${wkr}: ${name}<br>${win.partei} ${formatWinProbabilityPct(win.probability)}`
            : `WK ${wkr}: ${name}`;
          layer.bindTooltip(tip, { sticky: true });
          layer.on('click', () => renderDistrictDetail(wkr, items, name, l1Label));
        }
      }).addTo(mapInstance);

      mapInstance.fitBounds(mapLayer.getBounds(), { padding: [12, 12] });
      setTimeout(() => mapInstance.invalidateSize(), 50);

      const used = [...new Set(Object.values(winners).map(w => w.partei))];
      if (legendEl) {
        legendEl.innerHTML = used.map(p => `
          <span style="display:inline-flex;align-items:center;gap:0.35rem;">
            <span style="width:12px;height:12px;border-radius:2px;background:${DISTRICT_PARTY_COLORS[p] || '#999'};"></span>
            ${p}
          </span>
        `).join('') + `
          <span style="width:100%; text-align:center; color:#777; font-size:0.78rem; margin-top:0.15rem;">
            Intensität = Gewinnwahrscheinlichkeit
          </span>`;
      }

      const tally = {};
      Object.values(winners).forEach(w => {
        tally[w.partei] = (tally[w.partei] || 0) + 1;
      });
      const detail = document.getElementById('vorhersage-districts-detail');
      if (detail) {
        detail.style.display = 'block';
        detail.innerHTML = `
          <div style="text-align:center; font-size:0.9rem; color:#333;">
            Voraus. Direktmandate:
            ${Object.entries(tally).sort((a,b)=>b[1]-a[1]).map(([p,n]) => `<strong>${p}</strong> ${n}`).join(' · ')}
            <div style="color:#777; font-size:0.8rem; margin-top:0.25rem;">Klicken Sie einen Wahlkreis für Erststimmen-Details.</div>
          </div>
        `;
      }
      renderParliamentSize(code, parliamentSize);
    } catch (e) {
      console.warn('District map unavailable', e);
      hide();
    }
  }

  global.DistrictForecastMap = { mount, hide };
})(typeof window !== 'undefined' ? window : this);
