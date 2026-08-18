(function () {
  'use strict';

  function siteBase() {
    if (window.pipelineData && typeof window.pipelineData.siteBase === 'function') {
      return window.pipelineData.siteBase();
    }
    var path = window.location.pathname || '/';
    var idx = path.indexOf('/preview/');
    if (idx >= 0) return path.slice(0, idx + 1);
    return '/';
  }

  function dataUrl(name) {
    return siteBase() + 'data/' + name;
  }

  function stampLogo(ctx, cssW, cssH) {
    if (typeof window.drawZweitstimmeWatermark !== 'function' || !ctx) return;
    window.drawZweitstimmeWatermark(ctx, {
      left: 0,
      top: 0,
      right: cssW,
      bottom: cssH
    }, {
      anchor: 'top-right',
      maxWidth: 156,
      maxHeight: 28,
      pad: 6,
      opacity: 0.55
    });
  }

  function landFromQuery() {
    var q = new URLSearchParams(window.location.search || '');
    var s = (q.get('state') || q.get('land') || 'st').toLowerCase();
    if (s === 'st' || s === 'mv' || s === 'be') return s;
    return 'st';
  }

  function replayFileForLand(land) {
    if (land === 'st') return 'wahlabend_nowcast_st.json';
    if (land === 'mv') return 'wahlabend_nowcast_mv.json';
    return 'wahlabend_nowcast_replay.json';
  }

  var SCENARIO_LABELS = {
    actual_times: 'AfS-Zeiten (_W_ Datum/Zeit)',
    urne_first: 'Urne zuerst, dann Brief (Bias)',
    random: 'Zufällig (wenig Bias)',
    small_first: 'Kleine Bezirke zuerst',
    green_first: 'Grüne Hochburgen zuerst (Bias)',
    cdu_first: 'CDU-Hochburgen zuerst (Bias)'
  };

  var SCOPE_LABELS = {
    zweit: 'Zweitstimme',
    lage: 'Szenarien',
    land: 'Listen',
    wkr: 'Wahlkreise'
  };

  // Berlin 2026: nur CDU/SPD/Linke mit Bezirkslisten; Grüne/AfD/FDP/BSW = Landesliste.
  var BEZIRKSLISTE_PARTIES = ['spd', 'cdu', 'linke'];
  var BEZIRKSLISTE_LABEL = 'CDU/SPD/Linke';

  var PARTIES_ORDER = ['cdu', 'spd', 'gruene', 'linke', 'afd', 'fdp', 'others'];

  var state = {
    data: null,
    land: 'st',
    scenario: 'actual_times',
    scope: 'zweit',
    unit: 'BE',
    partyFocus: null,
    step: 10,
    openBezirk: {},
    openWkr: {},
    showZeroScenarios: false,
    wkrSearch: ''
  };


  var PARTY_COLORS = {
    cdu: '#111111',
    spd: '#E3000F',
    gruene: '#64A12D',
    linke: '#BE3075',
    afd: '#009EE0',
    fdp: '#C4A000',
    others: '#8a8a8a'
  };

  function $(id) { return document.getElementById(id); }

  function hasBezirkslisten() {
    var f = state.data && state.data.features;
    if (f && typeof f.bezirkslisten === 'boolean') return f.bezirkslisten;
    return state.land === 'be' &&
      ((state.data && state.data.geo_units && state.data.geo_units.bezirk) || []).length > 0;
  }

  function hasListenEinzug() {
    var f = state.data && state.data.features;
    if (f && typeof f.listen_einzug === 'boolean') return f.listen_einzug;
    return state.land === 'be';
  }

  function listenModeLabel() {
    var mode = state.data && state.data.listen_mode;
    if (mode === 'landes') return 'Landeslisten';
    if (mode === 'berlin_mixed') return 'Landes- und Bezirkslisten';
    return hasBezirkslisten() ? 'Landes- und Bezirkslisten' : 'Landeslisten';
  }

  /** German decimal: 1,2 instead of 1.2 */
  function fmtNum(x, digits) {
    if (x == null || !isFinite(x)) return '—';
    return Number(x).toFixed(digits).replace('.', ',');
  }

  function fmtPct(x) {
    if (x == null || !isFinite(x)) return '—';
    return fmtNum(x, 1) + '\u00a0%';
  }

  /** Official last-election turnout / size (amtliches Endergebnis). */
  function lastElectionRef() {
    var d = state.data || {};
    var fromJson = d.last_election;
    if (fromJson && (fromJson.turnout != null || fromJson.parliament_size != null || fromJson.size != null)) {
      return {
        year: fromJson.year,
        label: fromJson.label || String(fromJson.year || 'letzte Wahl'),
        turnout: fromJson.turnout,
        parliament_size: fromJson.parliament_size != null
          ? fromJson.parliament_size
          : fromJson.size
      };
    }
    var land = state.land;
    var el = String(d.election || '');
    var live = /2026/.test(el);
    if (live) {
      if (land === 'be') return { year: 2023, label: 'AGH 2023', turnout: 62.9, parliament_size: 159 };
      if (land === 'st') return { year: 2021, label: 'LTW 2021', turnout: 60.3, parliament_size: 97 };
      if (land === 'mv') return { year: 2021, label: 'LTW 2021', turnout: 70.8, parliament_size: 79 };
    }
    if (land === 'be' || el === 'AGH2023') {
      return { year: 2016, label: 'AGH 2016', turnout: 66.9, parliament_size: 160 };
    }
    if (land === 'st') {
      return { year: 2016, label: 'LTW 2016', turnout: 61.1, parliament_size: 87 };
    }
    if (land === 'mv') {
      return { year: 2016, label: 'LTW 2016', turnout: 61.6, parliament_size: 71 };
    }
    return null;
  }

  function lastElectionShort(ref) {
    if (!ref) return 'letzte Wahl';
    return ref.year != null ? String(ref.year) : (ref.label || 'letzte Wahl');
  }

  function drawHRef(ctx, pad, w, yAt, value, text, color) {
    if (value == null || !isFinite(value)) return;
    var y = yAt(value);
    ctx.strokeStyle = color || '#8a6d3b';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(pad.l + w, y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = color || '#8a6d3b';
    ctx.font = '11px system-ui,sans-serif';
    ctx.fillText(text, pad.l + 6, y - 4);
  }

  /** German integer with thousands separator (1.234.567). */
  function fmtInt(x) {
    if (x == null || !isFinite(x)) return '—';
    return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function fmtPp(x) {
    if (x == null || !isFinite(x)) return '—';
    return (x >= 0 ? '+' : '') + fmtNum(x, 2) + '\u00a0PP';
  }

  var PARTY_SHORT = {
    cdu: 'CDU', spd: 'SPD', gruene: 'Grüne', linke: 'Linke',
    afd: 'AfD', fdp: 'FDP', bsw: 'BSW', others: 'Andere'
  };

  function partyShort(p) {
    if (!p) return '—';
    if (PARTY_SHORT[p]) return PARTY_SHORT[p];
    var labels = (state.data && state.data.party_labels) || {};
    return labels[p] || p;
  }

  /** P(Führung hält) als Anzeige: >99,9 % statt 100 %. */
  function fmtProb(x) {
    if (x == null || !isFinite(x)) return '—';
    if (x >= 0.9995) return '>99,9\u00a0%';
    if (x <= 0.0005) return '<0,1\u00a0%';
    return fmtNum(x * 100, 1) + '\u00a0%';
  }

  function fmtClockShort(clock) {
    if (!clock) return null;
    var m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/.exec(String(clock));
    if (!m) return String(clock);
    var hm = m[4] + ':' + m[5];
    // Wahlabend / früher Morgen: nur Uhrzeit; sonst Datum + Uhrzeit
    if (m[2] === '02' && (m[3] === '12' || m[3] === '13')) return hm;
    return m[3] + '.' + m[2] + '. ' + hm;
  }

  /** scope: 'land' | 'wkr' | null — makes “ausgezählt” unambiguous. */
  function fmtFracPct(frac, scope) {
    if (frac == null || !isFinite(frac)) return null;
    var pct = Math.round(frac * 100) + '\u00a0%';
    if (scope === 'land') return pct + ' Land ausgezählt';
    if (scope === 'wkr') return pct + ' WK ausgezählt';
    return pct + ' ausgezählt';
  }

  /** Primär Uhrzeit, sekundär Auszählungsstand. */
  function fmtWhen(clock, frac, src, scope) {
    var t = fmtClockShort(clock);
    var f = fmtFracPct(frac, scope);
    var sim = (src === 'simulated' && t) ? ' (sim.)' : '';
    if (t && f) return t + sim + ' · ' + f;
    if (t) return t + sim;
    return f || '—';
  }

  function stepWhen(s, scope) {
    if (!s) return '—';
    return fmtWhen(s.clock, s.frac_reported, s.clock_source, scope || 'land');
  }

  function callWhen(call) {
    if (!call) return null;
    // Call-Zeitpunkt am landesweiten Auszählungsstand verankert
    return fmtWhen(call.called_at_clock, call.called_at, call.called_at_clock_source, 'land');
  }

  function likelyWhen(call) {
    if (!call || call.likely_at == null) return null;
    return fmtWhen(call.likely_at_clock, call.likely_at, call.likely_at_clock_source, 'land');
  }

  /** Nur Uhrzeit (für „voll ausgezählt seit …“). */
  function clockOnly(clock, src) {
    var t = fmtClockShort(clock);
    if (!t) return null;
    return t + (src === 'simulated' ? ' (sim.)' : '');
  }

  function completeWhen(call) {
    if (!call || call.complete_at == null) return null;
    return clockOnly(call.complete_at_clock, call.complete_at_clock_source) ||
      fmtFracPct(call.complete_at);
  }

  function isCompleteNow(r, call, s) {
    if (r && (r.complete || (r.frac_reported != null && r.frac_reported >= 0.999))) {
      return true;
    }
    if (!call || call.complete_at == null || !s) return false;
    return call.complete_at <= (s.frac_reported || 0) + 1e-9;
  }

  /** Land voll ausgezählt — erst dann Endstände im Live-Dashboard zeigen. */
  function isLandComplete(s) {
    return !!(s && s.frac_reported != null && s.frac_reported >= 0.999);
  }

  function isWkrComplete(s, wkrId) {
    if (!s || !wkrId) return false;
    var r = (s.by_wkr && s.by_wkr[wkrId]) || {};
    return isCompleteNow(r, wkrCalls()[wkrId] || {}, s);
  }

  /** 'called' | 'likely' | 'open' — wahrscheinlich auch ohne lokale Auszählung. */
  function callTier(r) {
    if (!r) return 'open';
    if (r.called) return 'called';
    if (r.likely) return 'likely';
    var thr = (state.data && state.data.call_threshold) || 0.90;
    if ((r.p_lead || 0) >= thr) return 'likely';
    return 'open';
  }

  function wkrCalls() {
    var b = scenarioBundle();
    if (b && b.wkr_calls) return b.wkr_calls;
    return (state.data && state.data.wkr_calls) || {};
  }

  /** Anzeige der Generierungszeit (Europe/Berlin), Sekunden. */
  function formatBerlin(isoOrLocal) {
    if (!isoOrLocal) return '—';
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(isoOrLocal)) {
      return isoOrLocal + ' (Berlin)';
    }
    var d = new Date(isoOrLocal);
    if (isNaN(d.getTime())) return String(isoOrLocal);
    var parts = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Europe/Berlin',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    }).formatToParts(d);
    var get = function (t) {
      var p = parts.find(function (x) { return x.type === t; });
      return p ? p.value : '';
    };
    return get('year') + '-' + get('month') + '-' + get('day') + ' ' +
      get('hour') + ':' + get('minute') + ':' + get('second') + ' (Berlin)';
  }

  function scenarioBundle() {
    if (!state.data) return null;
    return (state.data.scenarios || {})[state.scenario] || null;
  }

  function steps() {
    var b = scenarioBundle();
    if (b && b.steps && b.steps.length) return b.steps;
    return (state.data && state.data.steps) || [];
  }

  function unitLabel(scope, unitId) {
    var catalog = (state.data && state.data.geo_units) || {};
    var list = catalog[scope] || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === unitId) return list[i].label;
    }
    return unitId;
  }

  /** Split "01 · Mitte" into code + name for Wahlkreis-tile group headers. */
  function bezirkHeadParts(bid) {
    if (!bid || bid === '?') return { code: '', name: 'Ohne Bezirk' };
    var label = String(unitLabel('bezirk', bid) || bid);
    var m = label.match(/^(\d{2})\s*[·.•\-–]\s*(.+)$/);
    if (m) return { code: m[1], name: m[2] };
    if (label !== bid) return { code: String(bid), name: label };
    return { code: String(bid), name: '' };
  }

  function viewForStep(s) {
    if (!s) return null;
    var staticRoot = (state.data && state.data.geo_static) || {};
    if (state.scope === 'bezirk' && s.by_bezirk && s.by_bezirk[state.unit]) {
      var zb = s.by_bezirk[state.unit];
      var sb = (staticRoot.bezirk || {})[state.unit] || {};
      return {
        frac_reported: zb.frac_reported,
        n_reported: zb.n_reported,
        n_total: sb.n_total,
        nowcast: zb.nowcast,
        naive: zb.naive,
        prior: sb.prior,
        truth: sb.truth,
        mae_nowcast: zb.mae_nowcast,
        mae_naive: zb.mae_naive,
        mae_prior: sb.mae_prior,
        uncertainty: zb.uncertainty || null,
        methodNote: null
      };
    }
    if (state.scope === 'wkr' && s.by_wkr && s.by_wkr[state.unit]) {
      var zw = s.by_wkr[state.unit];
      var sw = (staticRoot.wkr || {})[state.unit] || {};
      return {
        frac_reported: zw.frac_reported,
        n_reported: zw.n_reported,
        n_total: sw.n_total,
        nowcast: zw.nowcast,
        naive: zw.naive,
        prior: sw.prior,
        truth: sw.truth,
        mae_nowcast: zw.mae_nowcast,
        mae_naive: zw.mae_naive,
        mae_prior: sw.mae_prior,
        uncertainty: zw.uncertainty || null,
        methodNote: null
      };
    }
    var land = {
      frac_reported: s.frac_reported,
      n_reported: s.n_reported,
      n_total: s.n_total,
      nowcast: s.nowcast,
      naive: s.naive,
      prior: s.prior || s.baseline,
      truth: s.truth,
      mae_nowcast: s.mae_nowcast,
      mae_naive: s.mae_naive,
      mae_prior: s.mae_prior != null ? s.mae_prior : s.mae_baseline,
      uncertainty: s.uncertainty || null,
      methodNote: null
    };
    return land;
  }

  function ensureUnit() {
    if (!state.data) return;
    if (state.scope === 'land' && !hasListenEinzug()) {
      state.scope = 'zweit';
    }
    if (state.scope === 'zweit' || state.scope === 'lage' || state.scope === 'land') {
      state.unit = 'BE';
      return;
    }
    var list = ((state.data.geo_units || {})[state.scope]) || [];
    var ids = list.map(function (u) { return String(u.id); });
    var cur = state.unit != null ? String(state.unit) : '';
    if (state.scope === 'wkr') {
      // Kein Auto-Pick: erst Tiles/Hub, bis ein WK gewählt ist.
      if (cur && ids.indexOf(cur) < 0) state.unit = '';
      return;
    }
    if (ids.indexOf(cur) < 0) {
      state.unit = ids[0] || '';
    }
  }

  function renderScopeButtons() {
    var tabs = $('wb-scope-tabs');
    if (!tabs) return;
    tabs.querySelectorAll('[data-scope]').forEach(function (btn) {
      var scope = btn.getAttribute('data-scope');
      if (scope === 'land') btn.hidden = !hasListenEinzug();
      btn.classList.toggle('is-active', scope === state.scope);
    });
  }

  function renderSubnav() {
    var el = $('wb-subnav');
    if (!el || !state.data) return;

    if (state.scope === 'lage') {
      el.innerHTML =
        '<p class="wb-subnav-label">Politische Szenarien und Parlamentsgröße (landesweit)</p>';
      return;
    }

    if (state.scope === 'zweit' || state.scope === 'land') {
      var labels = state.data.party_labels || {};
      var chips = '<button type="button" class="wb-sub-btn' +
        (!state.partyFocus ? ' is-active' : '') +
        '" data-party="">Alle</button>' +
        PARTIES_ORDER.map(function (p) {
          var col = PARTY_COLORS[p] || '#888';
          var active = state.partyFocus === p;
          return '<button type="button" class="wb-sub-btn has-party' +
            (active ? ' is-active' : '') +
            '" data-party="' + p + '" style="border-left-color:' + col + ';">' +
            escapeHtml(labels[p] || partyShort(p)) + '</button>';
        }).join('');
      el.innerHTML =
        '<p class="wb-subnav-label">' +
          (state.scope === 'zweit' ? 'Partei (Chart-Fokus)' : 'Partei (Listenplätze)') +
        '</p>' +
        '<div class="wb-sub-chips">' + chips + '</div>';
      return;
    }

    // Wahlkreise: Tiles als Unterauswahl
    var st = steps();
    if (!st.length) {
      el.innerHTML = '<p class="wb-subnav-label">Wahlkreis wählen</p>';
      return;
    }
    var s = st[Math.min(state.step, st.length - 1)];
    var races = collectWkrRaces(s);
    if (!races.length) {
      el.innerHTML = '<p class="wb-meta">Keine Wahlkreisdaten.</p>';
      return;
    }
    var nCalled = 0, nLikely = 0, nOpen = 0;
    races.forEach(function (x) {
      if (x.called) nCalled++;
      else if (x.likely) nLikely++;
      else nOpen++;
    });
    var byBez = {};
    races.forEach(function (x) {
      var bid = x.bezirk || '?';
      if (!byBez[bid]) byBez[bid] = [];
      byBez[bid].push(x);
    });
    var bezirkIds = Object.keys(byBez).sort();
    var showBezirkGroups = bezirkIds.some(function (id) { return id && id !== '?'; });
    var tilesHtml = '';
    function appendTiles(list) {
      list.slice().sort(function (a, b) {
        return Number(a.id) - Number(b.id);
      }).forEach(function (x) {
        tilesHtml += wkrTileHtml(x);
      });
    }
    if (!showBezirkGroups) {
      appendTiles(races);
    } else {
      bezirkIds.forEach(function (bid) {
        var head = bezirkHeadParts(bid);
        var title = [head.code, head.name].filter(Boolean).join(' · ');
        tilesHtml += '<div class="wb-wkr-bez-group" data-bez="' + escapeHtml(bid) + '">' +
          '<span class="wb-wkr-bez-head" title="' + escapeHtml(title) + '">' +
            (head.code
              ? '<span class="wb-wkr-bez-code">' + escapeHtml(head.code) + '</span>'
              : '') +
            (head.name
              ? '<span class="wb-wkr-bez-name">' + escapeHtml(head.name) + '</span>'
              : '') +
          '</span>' +
          '<div class="wb-wkr-bez-tiles">';
        appendTiles(byBez[bid]);
        tilesHtml += '</div></div>';
      });
    }
    el.innerHTML =
      '<p class="wb-subnav-label">Wahlkreis' +
        (state.unit ? '' : ' — Tiles antippen') + '</p>' +
      '<div class="wb-wkr-search-row">' +
        '<input type="search" id="wb-wkr-search" class="wb-wkr-search" ' +
        'placeholder="WK-Nr., Bezirk, Name …" autocomplete="off" ' +
        'value="' + escapeHtml(state.wkrSearch || '') + '">' +
        '<span class="wb-wkr-search-hint wb-art" id="wb-wkr-search-hint"></span>' +
      '</div>' +
      '<div class="wb-wkr-tile-legend">' +
        '<span><i class="wb-wkr-tile-swatch is-called"></i> gecallt</span>' +
        '<span><i class="wb-wkr-tile-swatch is-likely"></i> wahrscheinlich</span>' +
        '<span><i class="wb-wkr-tile-swatch is-open"></i> offen</span>' +
        '<span class="wb-art">' + nCalled + ' Call · ' + nLikely +
          ' wahrsch. · ' + nOpen + ' offen</span>' +
      '</div>' +
      '<div class="wb-wkr-tiles' +
        (showBezirkGroups ? ' wb-wkr-tiles-grouped' : '') + '">' +
        tilesHtml + '</div>';
    bindWkrLinks(el);
    applyWkrSearchFilter();
  }

  function normSearch(s) {
    return String(s || '').toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss').trim();
  }

  function wkrSearchHaystack(x) {
    var bezLabel = unitLabel('bezirk', x.bezirk || '');
    var parts = shortWkrLabel(x.label, x.id);
    return normSearch([
      x.id,
      parts.num,
      parts.rest,
      x.label,
      x.bezirk,
      bezLabel,
      x.party ? partyShort(x.party) : ''
    ].join(' '));
  }

  function applyWkrSearchFilter() {
    var wrap = $('wb-subnav');
    if (!wrap || state.scope !== 'wkr') return;
    var q = normSearch(state.wkrSearch);
    var tiles = wrap.querySelectorAll('.wb-wkr-tile');
    var groups = wrap.querySelectorAll('.wb-wkr-bez-group');
    var n = 0;
    tiles.forEach(function (tile) {
      var hay = tile.getAttribute('data-search') || '';
      var show = !q || hay.indexOf(q) >= 0;
      tile.hidden = !show;
      if (show) n++;
    });
    groups.forEach(function (g) {
      var visible = false;
      g.querySelectorAll('.wb-wkr-tile').forEach(function (tile) {
        if (!tile.hidden) visible = true;
      });
      g.hidden = !!q && !visible;
    });
    var hint = $('wb-wkr-search-hint');
    if (hint) {
      if (!q) hint.textContent = '';
      else if (!n) hint.textContent = 'Keine Treffer';
      else hint.textContent = n + (n === 1 ? ' Treffer' : ' Treffer');
    }
  }

  function setScope(scope) {
    if (!scope || scope === state.scope) {
      renderScopeButtons();
      return;
    }
    if (scope !== 'wkr') state.wkrSearch = '';
    state.scope = scope;
    ensureUnit();
    renderScopeButtons();
    renderStep();
  }

  function drawLineChart(canvasId, seriesA, seriesB, opts) {
    opts = opts || {};
    var canvas = $(canvasId);
    if (!canvas || !state.data) return;
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var cssW = canvas.clientWidth || 900;
    var cssH = 220;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    var n = seriesA.length;
    if (!n) return;
    var pad = { l: 36, r: 12, t: 16, b: 28 };
    var w = cssW - pad.l - pad.r;
    var h = cssH - pad.t - pad.b;
    var yMin = opts.yMin != null ? opts.yMin : 0;
    var yMax = opts.yMax != null ? opts.yMax : Math.max(1, Math.max.apply(null, seriesA.concat(seriesB)) * 1.15);
    if (yMax <= yMin) yMax = yMin + 1;

    function xAt(i) { return pad.l + (i / Math.max(1, n - 1)) * w; }
    function yAt(v) { return pad.t + (1 - (v - yMin) / (yMax - yMin)) * h; }

    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t);
    ctx.lineTo(pad.l, pad.t + h);
    ctx.lineTo(pad.l + w, pad.t + h);
    ctx.stroke();

    ctx.fillStyle = '#888';
    ctx.font = '11px system-ui,sans-serif';
    ctx.fillText('0\u00a0%', pad.l, cssH - 8);
    ctx.fillText('100\u00a0%', pad.l + w - 28, cssH - 8);
    var topLabel = opts.pctAxis
      ? Math.round(yMax * 100) + '\u00a0%'
      : fmtNum(yMax, 1) + ' PP';
    ctx.fillText(topLabel, 4, pad.t + 10);

    function strokeSeries(arr, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      arr.forEach(function (v, i) {
        var x = xAt(i), y = yAt(v);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }
    strokeSeries(seriesB, '#c45c26');
    strokeSeries(seriesA, '#1a1a1a');

    var i = Math.min(state.step, n - 1);
    ctx.strokeStyle = '#5b7cfa';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(xAt(i), pad.t);
    ctx.lineTo(xAt(i), pad.t + h);
    ctx.stroke();
    ctx.setLineDash([]);
    stampLogo(ctx, cssW, cssH);
  }

  function colorWithAlpha(hex, a) {
    var h = (hex || '#888').replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var r = parseInt(h.slice(0, 2), 16);
    var g = parseInt(h.slice(2, 4), 16);
    var b = parseInt(h.slice(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  function marginUnc(r) {
    if (!r) return null;
    var u = r.uncertainty || {};
    var lead = r.direct_pred || r.leader_pred;
    var run = r.runner_up;
    if (!lead || !run) return null;
    var ul = u[lead];
    var ur = u[run];
    if (ul == null || ur == null) return null;
    return Math.sqrt(ul * ul + ur * ur);
  }

  function drawShareChart() {
    var canvas = $('wb-chart-shares');
    var legend = $('wb-share-legend');
    var label = $('wb-share-chart-label');
    if (!canvas || !state.data || state.scope !== 'zweit') return;
    var st = steps();
    if (!st.length) return;
    var ci = Math.min(state.step, st.length - 1);
    var showTruth = isLandComplete(st[ci]);
    var views = st.map(viewForStep);
    var parties = PARTIES_ORDER.filter(function (p) {
      return views.some(function (v) {
        return v && v.nowcast && v.nowcast[p] != null;
      });
    });
    if (state.scope === 'zweit' && state.partyFocus &&
        parties.indexOf(state.partyFocus) >= 0) {
      parties = [state.partyFocus];
    }
    // In WK: Bänder nur für die aktuell führenden Parteien (weniger Clutter)
    var bandParties = parties;
    if (state.scope === 'wkr') {
      var curV = views[Math.min(state.step, views.length - 1)];
      if (curV && curV.nowcast) {
        bandParties = parties.slice().sort(function (a, b) {
          return (curV.nowcast[b] || 0) - (curV.nowcast[a] || 0);
        }).slice(0, 4);
      }
    }
    if (label) {
      label.textContent = state.partyFocus
        ? partyShort(state.partyFocus) + ' — Zweitstimme über die Nacht (Nowcast ± Band)'
        : 'Zweitstimme — Partei-Anteile über die Nacht (Nowcast ± Band)';
    }
    if (legend) {
      legend.innerHTML = parties.map(function (p) {
        var c = PARTY_COLORS[p] || '#888';
        return '<span><i style="background:' + c +
          ';display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:0.35rem;"></i>' +
          partyShort(p) + '</span>';
      }).join(' ') +
        ' <span class="wb-art">· Fläche + gestrichelte Kanten = ± Band</span>';
    }

    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var cssW = canvas.clientWidth || 900;
    var cssH = 280;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    var n = views.length;
    var pad = { l: 36, r: 12, t: 16, b: 28 };
    var w = cssW - pad.l - pad.r;
    var h = cssH - pad.t - pad.b;
    var vals = [];
    parties.forEach(function (p) {
      views.forEach(function (v) {
        if (!v || !v.nowcast) return;
        var nc = v.nowcast[p] || 0;
        var u = (v.uncertainty && v.uncertainty[p]) || 0;
        vals.push(nc + u);
        if (showTruth && v.truth) vals.push(v.truth[p] || 0);
      });
    });
    var yMin = 0;
    var yMax = Math.max(10, Math.max.apply(null, vals.concat([0])) * 1.08);

    function xAt(i) { return pad.l + (i / Math.max(1, n - 1)) * w; }
    function yAt(v) { return pad.t + (1 - (v - yMin) / (yMax - yMin)) * h; }

    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t);
    ctx.lineTo(pad.l, pad.t + h);
    ctx.lineTo(pad.l + w, pad.t + h);
    ctx.stroke();
    ctx.fillStyle = '#888';
    ctx.font = '11px system-ui,sans-serif';
    ctx.fillText('0\u00a0%', pad.l, cssH - 8);
    ctx.fillText('100\u00a0%', pad.l + w - 28, cssH - 8);
    ctx.fillText(fmtNum(yMax, 0) + '\u00a0%', 4, pad.t + 10);

    // Uncertainty ribbons + dashed ± envelopes (draw before solid lines)
    bandParties.forEach(function (p) {
      var c = PARTY_COLORS[p] || '#888';
      var hi = [];
      var lo = [];
      views.forEach(function (v, i) {
        if (!v || !v.nowcast) return;
        var nc = v.nowcast[p] || 0;
        var u = (v.uncertainty && v.uncertainty[p]) || 0;
        hi.push({ i: i, y: nc + u });
        lo.push({ i: i, y: Math.max(0, nc - u) });
      });
      if (hi.length < 2) return;

      ctx.fillStyle = colorWithAlpha(c, 0.22);
      ctx.beginPath();
      hi.forEach(function (pt, k) {
        var x = xAt(pt.i), y = yAt(pt.y);
        if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      for (var k = lo.length - 1; k >= 0; k--) {
        ctx.lineTo(xAt(lo[k].i), yAt(lo[k].y));
      }
      ctx.closePath();
      ctx.fill();

      // Dashed envelopes so ± reads even when fills overlap
      ctx.strokeStyle = colorWithAlpha(c, 0.55);
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      hi.forEach(function (pt, k) {
        var x = xAt(pt.i), y = yAt(pt.y);
        if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.beginPath();
      lo.forEach(function (pt, k) {
        var x = xAt(pt.i), y = yAt(pt.y);
        if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Endstand nur wenn Land voll ausgezählt (nicht die ganze Nacht vorwegnehmen)
    var truth = showTruth && views[ci] && views[ci].truth;
    if (truth) {
      parties.forEach(function (p) {
        var tv = truth[p];
        if (tv == null) return;
        ctx.strokeStyle = PARTY_COLORS[p] || '#888';
        ctx.globalAlpha = 0.35;
        ctx.setLineDash([5, 4]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad.l, yAt(tv));
        ctx.lineTo(pad.l + w, yAt(tv));
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      });
    }

    parties.forEach(function (p) {
      ctx.strokeStyle = PARTY_COLORS[p] || '#888';
      ctx.lineWidth = 2;
      ctx.beginPath();
      views.forEach(function (v, i) {
        var val = (v && v.nowcast) ? (v.nowcast[p] || 0) : 0;
        var x = xAt(i), y = yAt(val);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });

    var i = Math.min(state.step, n - 1);
    ctx.strokeStyle = '#5b7cfa';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(xAt(i), pad.t);
    ctx.lineTo(xAt(i), pad.t + h);
    ctx.stroke();
    ctx.setLineDash([]);

    // Marker + error bar at current step
    parties.forEach(function (p) {
      var v = views[i];
      if (!v || !v.nowcast) return;
      var val = v.nowcast[p] || 0;
      var u = (v.uncertainty && v.uncertainty[p]) || 0;
      var x = xAt(i);
      ctx.strokeStyle = PARTY_COLORS[p] || '#888';
      ctx.lineWidth = 1.5;
      if (u > 0) {
        ctx.beginPath();
        ctx.moveTo(x, yAt(val + u));
        ctx.lineTo(x, yAt(Math.max(0, val - u)));
        ctx.stroke();
      }
      ctx.fillStyle = PARTY_COLORS[p] || '#888';
      ctx.beginPath();
      ctx.arc(x, yAt(val), 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
    stampLogo(ctx, cssW, cssH);
  }

  function stepIndexNearFrac(fracList, fracTarget) {
    var bestI = 0;
    var bestD = 1e9;
    for (var i = 0; i < fracList.length; i++) {
      var d = Math.abs((fracList[i] || 0) - fracTarget);
      if (d < bestD) { bestD = d; bestI = i; }
    }
    return bestI;
  }

  function direktAtFrac(st, fracTarget, which) {
    if (!st || !st.length) return null;
    var fracs = st.map(function (s) { return s.frac_reported || 0; });
    var i = stepIndexNearFrac(fracs, fracTarget);
    var s = st[i];
    var root = s.eval && s.eval.institutions;
    var block = root && root[which || 'nowcast'];
    if (!block || !block.direkt) return null;
    return {
      n: block.direkt.n_hit,
      total: block.direkt.n_total,
      rate: block.direkt.hit_rate,
      frac: s.frac_reported
    };
  }

  /** Direkt-Treffer nur unter noch nicht voll ausgezählten WK (faire Mid-Night-Metrik). */
  function direktOpenAtFrac(st, fracTarget, which) {
    if (!st || !st.length) return null;
    var fracs = st.map(function (s) { return s.frac_reported || 0; });
    var i = stepIndexNearFrac(fracs, fracTarget);
    var s = st[i];
    var by = s.by_wkr || {};
    var MAIN = ['cdu', 'spd', 'gruene', 'linke', 'afd', 'fdp'];
    var n = 0;
    var hit = 0;
    Object.keys(by).forEach(function (uid) {
      var r = by[uid];
      if ((r.frac_reported || 0) >= 0.999) return;
      n++;
      var truth = r.leader_truth;
      var pred;
      if (which === 'naive') {
        var nv = r.naive || {};
        pred = MAIN.reduce(function (best, p) {
          return (nv[p] || 0) > (nv[best] || 0) ? p : best;
        }, MAIN[0]);
      } else {
        pred = r.direct_pred || r.leader_pred;
      }
      if (pred && truth && pred === truth) hit++;
    });
    if (!n) return { n: 0, total: 0, rate: 1, frac: s.frac_reported, open: true };
    return {
      n: hit,
      total: n,
      rate: hit / n,
      frac: s.frac_reported,
      open: true
    };
  }

  function renderDirektMilestones() {
    var table = $('wb-direkt-table');
    if (!table) return;
    var st = steps();
    if (!st.length) { table.innerHTML = ''; return; }
    var targets = [0.25, 0.5, 0.75, 1.0];
    var labels = ['@~25\u00a0%', '@~50\u00a0%', '@~75\u00a0%', 'Ende'];

    function cell(d) {
      if (!d) return '—';
      if (!d.total) return '—';
      return d.n + '/' + d.total +
        ' <span class="wb-art">(' + Math.round(d.rate * 100) + '\u00a0%)</span>';
    }

    var ncRow = '<tr><td>Nowcast (alle WK)</td>' + targets.map(function (t) {
      return '<td>' + cell(direktAtFrac(st, t, 'nowcast')) + '</td>';
    }).join('') + '</tr>';
    var nvRow = '<tr><td>Naiv (alle WK)</td>' + targets.map(function (t) {
      return '<td>' + cell(direktAtFrac(st, t, 'naive')) + '</td>';
    }).join('') + '</tr>';
    var ncOpen = '<tr><td>Nowcast (nur offen)</td>' + targets.map(function (t) {
      return '<td>' + cell(direktOpenAtFrac(st, t, 'nowcast')) + '</td>';
    }).join('') + '</tr>';
    var nvOpen = '<tr><td>Naiv (nur offen)</td>' + targets.map(function (t) {
      return '<td>' + cell(direktOpenAtFrac(st, t, 'naive')) + '</td>';
    }).join('') + '</tr>';

    table.innerHTML =
      '<table class="wb-cov-table"><thead><tr>' +
      '<th>Direktmandate</th>' +
      labels.map(function (h) { return '<th>' + h + '</th>'; }).join('') +
      '</tr></thead><tbody>' + ncRow + nvRow + ncOpen + nvOpen + '</tbody></table>' +
      '<p class="wb-coverage-meta">Erststimme-Führer je WK. <em>Alle WK</em> zählt fertige ' +
      'Wahlkreise mit (dort sind beide ≈ Wahrheit). <em>Nur offen</em> = noch nicht ' +
      '100 % ausgezählt — dort ist Naiv bei 0 % lokal = Prior; der Nowcast kann spät ' +
      'schlechter sein, wenn der gelernte Landestrend für die spät meldenden Gebiete ' +
      '(z. B. Osten) falsch liegt.</p>';
  }

  function drawChart() {
    var st = steps();
    if (!st.length) return;
    drawLineChart(
      'wb-chart-hit',
      st.map(function (s) {
        var d = institutionsOf(s.eval);
        return (d && d.direkt) ? d.direkt.hit_rate : 0;
      }),
      st.map(function (s) {
        var d = s.eval && s.eval.institutions && s.eval.institutions.naive;
        return (d && d.direkt) ? d.direkt.hit_rate : 0;
      }),
      { yMin: 0, yMax: 1, pctAxis: true }
    );
    renderDirektMilestones();
  }


  function candidateFor(wkrId, party) {
    // AGH2023-Replay: immer Platzhalter (keine 2023-Namen; 2026 wäre falsch).
    var roster = (state.data && state.data.direkt_candidates_2026) || {};
    var cell = ((roster[String(wkrId)] || {})[party]) || null;
    if (cell && cell.is_placeholder) return cell;
    return {
      name: partyShort(party) + ' · WK ' + wkrId + ' · Platzhalter',
      is_placeholder: true
    };
  }

  function nameHtml(cell) {
    if (!cell) return '—';
    if (cell.is_placeholder) {
      return '<span class="wb-ph">' + escapeHtml(cell.name) + '</span>';
    }
    return escapeHtml(cell.name);
  }

  function drawAxisFrame(ctx, pad, w, h, cssH, yMin, yMax, yFmt) {
    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t);
    ctx.lineTo(pad.l, pad.t + h);
    ctx.lineTo(pad.l + w, pad.t + h);
    ctx.stroke();
    ctx.fillStyle = '#888';
    ctx.font = '11px system-ui,sans-serif';
    ctx.fillText('0\u00a0%', pad.l, cssH - 6);
    ctx.fillText('100\u00a0%', pad.l + w - 28, cssH - 6);
    ctx.fillText(yFmt(yMax), 4, pad.t + 10);
    if (yMin > 0) ctx.fillText(yFmt(yMin), 4, pad.t + h);
  }

  function drawWkrRaceCharts() {
    var raceCanvas = $('wb-chart-race');
    var probCanvas = $('wb-chart-prob');
    var legend = $('wb-race-legend');
    if (!raceCanvas || state.scope !== 'wkr' || !state.unit) return;
    var st = steps();
    if (!st.length) return;
    var regions = st.map(function (s) {
      return (s.by_wkr && s.by_wkr[state.unit]) || {};
    });
    var staticW = (((state.data.geo_static || {}).wkr) || {})[state.unit] || {};
    var truth = staticW.truth || {};
    var ci = Math.min(state.step, regions.length - 1);
    var sCur = st[ci];
    var showTruth = isWkrComplete(sCur, state.unit);
    var cur = regions[ci] || {};
    var parties = PARTIES_ORDER.filter(function (p) { return p !== 'others'; })
      .sort(function (a, b) {
        return ((cur.nowcast && cur.nowcast[b]) || 0) - ((cur.nowcast && cur.nowcast[a]) || 0);
      })
      .slice(0, 4);

    if (legend) {
      legend.innerHTML = parties.map(function (p) {
        var c = PARTY_COLORS[p] || '#888';
        return '<span><i style="background:' + c +
          ';display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:0.35rem;"></i>' +
          partyShort(p) + '</span>';
      }).join(' ') +
        (showTruth
          ? ' <span class="wb-art">· Band = ± (Fläche + Kante) · gestrichelt horizontal = Endstand</span>'
          : ' <span class="wb-art">· Band = ± (Fläche + Kante)</span>');
    }

    // --- Race share chart ---
    var ctx = raceCanvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var cssW = raceCanvas.clientWidth || 900;
    var cssH = 260;
    raceCanvas.width = Math.round(cssW * dpr);
    raceCanvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    var n = regions.length;
    var pad = { l: 40, r: 12, t: 14, b: 26 };
    var w = cssW - pad.l - pad.r;
    var h = cssH - pad.t - pad.b;
    var vals = [];
    parties.forEach(function (p) {
      regions.forEach(function (r) {
        var nc = (r.nowcast && r.nowcast[p]) || 0;
        var u = (r.uncertainty && r.uncertainty[p]) || 0;
        vals.push(nc + u);
      });
      if (showTruth && truth[p] != null) vals.push(truth[p]);
    });
    var yMin = 0;
    var yMax = Math.max(15, Math.max.apply(null, vals.concat([0])) * 1.1);
    function xAt(i) { return pad.l + (i / Math.max(1, n - 1)) * w; }
    function yAt(v) { return pad.t + (1 - (v - yMin) / (yMax - yMin)) * h; }
    drawAxisFrame(ctx, pad, w, h, cssH, yMin, yMax, function (v) {
      return fmtNum(v, 0) + '\u00a0%';
    });

    parties.forEach(function (p) {
      var c = PARTY_COLORS[p] || '#888';
      var hi = [];
      var lo = [];
      regions.forEach(function (r, i) {
        var nc = (r.nowcast && r.nowcast[p]) || 0;
        var u = (r.uncertainty && r.uncertainty[p]) || 0;
        hi.push({ i: i, y: nc + u });
        lo.push({ i: i, y: Math.max(0, nc - u) });
      });
      if (hi.length < 2) return;
      ctx.fillStyle = colorWithAlpha(c, 0.24);
      ctx.beginPath();
      hi.forEach(function (pt, k) {
        var x = xAt(pt.i), y = yAt(pt.y);
        if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      for (var k = lo.length - 1; k >= 0; k--) {
        ctx.lineTo(xAt(lo[k].i), yAt(lo[k].y));
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = colorWithAlpha(c, 0.55);
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      hi.forEach(function (pt, k) {
        var x = xAt(pt.i), y = yAt(pt.y);
        if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.beginPath();
      lo.forEach(function (pt, k) {
        var x = xAt(pt.i), y = yAt(pt.y);
        if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    });

    if (showTruth) {
      parties.forEach(function (p) {
        if (truth[p] == null) return;
        ctx.strokeStyle = PARTY_COLORS[p] || '#888';
        ctx.globalAlpha = 0.4;
        ctx.setLineDash([5, 4]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad.l, yAt(truth[p]));
        ctx.lineTo(pad.l + w, yAt(truth[p]));
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      });
    }

    parties.forEach(function (p) {
      ctx.strokeStyle = PARTY_COLORS[p] || '#888';
      ctx.lineWidth = 2.25;
      ctx.beginPath();
      regions.forEach(function (r, i) {
        var val = (r.nowcast && r.nowcast[p]) || 0;
        var x = xAt(i), y = yAt(val);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });

    ctx.strokeStyle = '#5b7cfa';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(xAt(ci), pad.t);
    ctx.lineTo(xAt(ci), pad.t + h);
    ctx.stroke();
    ctx.setLineDash([]);
    parties.forEach(function (p) {
      var r = regions[ci];
      var val = (r.nowcast && r.nowcast[p]) || 0;
      var u = (r.uncertainty && r.uncertainty[p]) || 0;
      var x = xAt(ci);
      ctx.strokeStyle = PARTY_COLORS[p] || '#888';
      ctx.lineWidth = 1.5;
      if (u > 0) {
        ctx.beginPath();
        ctx.moveTo(x, yAt(val + u));
        ctx.lineTo(x, yAt(Math.max(0, val - u)));
        ctx.stroke();
      }
      ctx.fillStyle = PARTY_COLORS[p] || '#888';
      ctx.beginPath();
      ctx.arc(x, yAt(val), 4, 0, Math.PI * 2);
      ctx.fill();
    });
    stampLogo(ctx, cssW, cssH);

    // --- P(lead) chart ---
    if (!probCanvas) return;
    ctx = probCanvas.getContext('2d');
    cssW = probCanvas.clientWidth || 900;
    cssH = 160;
    probCanvas.width = Math.round(cssW * dpr);
    probCanvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    pad = { l: 40, r: 12, t: 12, b: 24 };
    w = cssW - pad.l - pad.r;
    h = cssH - pad.t - pad.b;
    yMin = 0;
    yMax = 1;
    function yP(v) { return pad.t + (1 - (v - yMin) / (yMax - yMin)) * h; }
    drawAxisFrame(ctx, pad, w, h, cssH, 0, 1, function (v) {
      return Math.round(v * 100) + '\u00a0%';
    });

    var thrLikely = (state.data && state.data.call_threshold) || 0.90;
    var thrCall = (state.data && state.data.hard_call_threshold) || 0.999;
    ctx.setLineDash([4, 3]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#5b7cfa';
    ctx.beginPath();
    ctx.moveTo(pad.l, yP(thrLikely));
    ctx.lineTo(pad.l + w, yP(thrLikely));
    ctx.stroke();
    ctx.strokeStyle = '#2e7d32';
    ctx.beginPath();
    ctx.moveTo(pad.l, yP(thrCall));
    ctx.lineTo(pad.l + w, yP(thrCall));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = '11px system-ui,sans-serif';
    ctx.fillStyle = '#5b7cfa';
    ctx.fillText('wahrsch. ' + fmtNum(thrLikely * 100, 0) + '\u00a0%', pad.l + 4, yP(thrLikely) - 4);
    ctx.fillStyle = '#2e7d32';
    ctx.fillText('Call ' + fmtNum(thrCall * 100, 1) + '\u00a0%', pad.l + 4, yP(thrCall) + 12);

    // shade: wahrscheinlich (blau) ab P≥thr, hart gecallt (grün) ab erster WK-Meldung
    var likelyStart = null;
    var callStart = null;
    regions.forEach(function (r, i) {
      if (callTier(r) !== 'open' && likelyStart == null) likelyStart = i;
      if (r.called && callStart == null) callStart = i;
    });
    if (likelyStart != null) {
      ctx.fillStyle = 'rgba(35,80,143,0.07)';
      ctx.fillRect(xAt(likelyStart), pad.t, xAt(n - 1) - xAt(likelyStart), h);
    }
    if (callStart != null) {
      ctx.fillStyle = 'rgba(27,94,32,0.10)';
      ctx.fillRect(xAt(callStart), pad.t, xAt(n - 1) - xAt(callStart), h);
    }

    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    regions.forEach(function (r, i) {
      var pLead = r.p_lead != null ? r.p_lead : 0;
      var x = xAt(i), y = yP(pLead);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.strokeStyle = '#5b7cfa';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(xAt(ci), pad.t);
    ctx.lineTo(xAt(ci), pad.t + h);
    ctx.stroke();
    ctx.setLineDash([]);
    var pNow = regions[ci].p_lead != null ? regions[ci].p_lead : 0;
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(xAt(ci), yP(pNow), 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '12px system-ui,sans-serif';
    ctx.fillText(fmtProb(pNow), Math.min(xAt(ci) + 8, pad.l + w - 60), yP(pNow) - 6);
    stampLogo(ctx, cssW, cssH);
  }

  function renderWkrRace() {
    var el = $('wb-wkr-race');
    if (!el) return;
    if (state.scope !== 'wkr' || !state.unit) {
      el.hidden = true;
      el.innerHTML = '';
      return;
    }
    el.hidden = false;
    var st = steps();
    if (!st.length) { el.innerHTML = ''; return; }
    var staticW = (((state.data.geo_static || {}).wkr) || {})[state.unit] || {};
    var truthParty = staticW.erst_winner || null;
    var cur = st[Math.min(state.step, st.length - 1)];
    var region = (cur.by_wkr && cur.by_wkr[state.unit]) || {};
    var predParty = region.direct_pred || region.leader_pred || null;
    var predCand = predParty ? candidateFor(state.unit, predParty) : null;
    var call = wkrCalls()[state.unit] || {};
    var doneNow = isCompleteNow(region, call, cur);
    var uncNow = region.uncertainty || {};
    var leadShare = predParty && region.nowcast ? region.nowcast[predParty] : null;
    var leadU = predParty ? uncNow[predParty] : null;
    var runP = region.runner_up;
    var runShare = runP && region.nowcast ? region.nowcast[runP] : null;
    var runU = runP ? uncNow[runP] : null;
    var mU = marginUnc(region);

    var topParties = PARTIES_ORDER.filter(function (p) { return p !== 'others'; })
      .sort(function (a, b) {
        return ((region.nowcast && region.nowcast[b]) || 0) -
          ((region.nowcast && region.nowcast[a]) || 0);
      })
      .slice(0, 4);

    var chips = topParties.map(function (p) {
      var sh = region.nowcast ? region.nowcast[p] : null;
      var u = uncNow[p];
      var c = candidateFor(state.unit, p);
      var win = (doneNow && p === truthParty)
        ? ' · <span class="wb-ok">Endstand</span>' : '';
      var lead = p === predParty ? ' · führt' : '';
      return '<span class="wb-wkr-chip" style="border-left:3px solid ' +
        (PARTY_COLORS[p] || '#888') + ';">' +
        '<strong>' + partyShort(p) + '</strong> ' + nameHtml(c) +
        (sh != null
          ? ' · <strong>' + fmtNum(sh, 1) + '%</strong>' +
            (u != null ? ' <span class="wb-range">±\u00a0' + fmtNum(u, 1) + '</span>' : '')
          : '') +
        lead + win + '</span>';
    }).join('');

    var tier = callTier(region);
    var callInfo;
    if (tier === 'called') {
      callInfo = '<span class="wb-ok">gecallt</span>' +
        (callWhen(call) ? ' seit <strong>' + callWhen(call) + '</strong>' : '');
    } else if (tier === 'likely') {
      callInfo = '<span style="color:#23508f;font-weight:600;">wahrscheinlich</span>' +
        (likelyWhen(call) ? ' seit <strong>' + likelyWhen(call) + '</strong>' : '');
    } else {
      callInfo = '<span class="wb-art">noch offen</span>';
    }
    var doneInfo = doneNow
      ? ('<span class="wb-ok">dieser WK vollständig</span>' +
        (completeWhen(call) ? ' seit <strong>' + completeWhen(call) + '</strong>' : ''))
      : ('<strong>' + Math.round((region.frac_reported || 0) * 100) +
        '\u00a0%</strong> in diesem WK · ' +
        (region.n_reported || 0) + ' WB');

    el.innerHTML =
      '<h3>Direktmandat · Erststimmen-Nowcast</h3>' +
      '<div class="wb-wkr-hero">' +
        '<div class="wb-wkr-lead">' +
          (predParty ? partyShort(predParty) : '—') + ' — ' + nameHtml(predCand) +
        '</div>' +
        '<div class="wb-wkr-sub">' +
          (leadShare != null
            ? fmtNum(leadShare, 1) + '\u00a0%' +
              (leadU != null ? ' ±\u00a0' + fmtNum(leadU, 1) : '') +
              (runP && runShare != null
                ? ' vor ' + partyShort(runP) + ' ' + fmtNum(runShare, 1) + '\u00a0%' +
                  (runU != null ? ' ±\u00a0' + fmtNum(runU, 1) : '')
                : '')
            : '') +
          (region.margin != null
            ? ' · Marge ' + fmtNum(region.margin, 1) +
              (mU != null ? ' ±\u00a0' + fmtNum(mU, 1) : '') + '\u00a0PP'
            : '') +
        '</div>' +
        '<div class="wb-wkr-chips">' + chips + '</div>' +
        '<div class="wb-wkr-meta">' +
          '<div class="wb-wkr-plead">' +
            '<span class="wb-wkr-plead-k">P(Führung hält)</span>' +
            '<span class="wb-wkr-plead-v">' + fmtProb(region.p_lead) + '</span>' +
          '</div>' +
          '<dl>' +
          '<dt>Call</dt><dd>' + callInfo + '</dd>' +
          '<dt>Stand Land</dt><dd>' + stepWhen(cur, 'land') + '</dd>' +
          '<dt>Auszählung WK</dt><dd>' + doneInfo + '</dd>' +
        '</dl></div>' +
      '</div>' +
      '<p class="wb-chart-label">Erststimmen-Rennen über die Nacht</p>' +
      '<div class="wb-legend" id="wb-race-legend"></div>' +
      '<canvas id="wb-chart-race" class="wb-chart wb-chart-race" width="900" height="260"></canvas>' +
      '<p class="wb-chart-label">P(Führung hält) · Wahrscheinlich / Call</p>' +
      '<canvas id="wb-chart-prob" class="wb-chart wb-chart-prob" width="900" height="160"></canvas>' +
      '<p class="wb-meta" style="margin:0.25rem 0 0;">' +
        'Blau = Partei wahrscheinlich (auch ohne WK-Meldung); Grün = harter Call. ' +
        'Slider oben bewegt den Zeitpunkt (blaue Linie).' +
      '</p>';

    // Draw after layout so clientWidth is correct
    requestAnimationFrame(function () {
      drawWkrRaceCharts();
    });
  }


  function renderCallBanner() {
    var el = $('wb-call-banner');
    if (!el) return;
    if (state.scope !== 'wkr' || !state.unit) {
      el.innerHTML = '';
      return;
    }
    var st = steps();
    if (!st.length) { el.innerHTML = ''; return; }
    var s = st[Math.min(state.step, st.length - 1)];
    var r = (s.by_wkr && s.by_wkr[state.unit]) || {};
    var call = wkrCalls()[state.unit] || {};
    var p = r.direct_pred || r.leader_pred;
    var cand = p ? candidateFor(state.unit, p) : null;
    var thrLikelyPct = fmtNum(((state.data && state.data.call_threshold) || 0.90) * 100, 0);
    var thrCallPct = fmtNum(((state.data && state.data.hard_call_threshold) || 0.999) * 100, 1);
    var doneBit = '';
    if (isCompleteNow(r, call, s)) {
      var cwhen = completeWhen(call);
      doneBit = ' · <span class="wb-ok">dieser WK voll ausgezählt</span>' +
        (cwhen ? ' seit <strong>' + cwhen + '</strong>' : '');
    }
    var tier = callTier(r);
    if (tier === 'called') {
      var since = '';
      var when = callWhen(call);
      if (when && call.called_at != null && call.called_at <= s.frac_reported + 1e-9) {
        since = ' seit <strong>' + when + '</strong>';
      }
      var verdict = '';
      if (isCompleteNow(r, call, s) && call.truth_erst) {
        if (p === call.truth_erst) {
          verdict = ' · Endstand bestätigt (<strong>' + partyShort(call.truth_erst) + '</strong>)';
        } else {
          verdict = ' · <span class="wb-bad">FEHL-CALL — Endstand ' +
            partyShort(call.truth_erst) + '</span>';
        }
      }
      el.innerHTML =
        '<div class="wb-call-banner wb-called">✔ <strong>Gecallt für ' +
        partyShort(p) + '</strong> — ' + nameHtml(cand) + since +
        ' · P(Führung hält) ' + fmtProb(r.p_lead) + doneBit + verdict + '</div>';
    } else if (tier === 'likely') {
      var lsince = '';
      var lwhen = likelyWhen(call);
      if (lwhen && call.likely_at != null && call.likely_at <= s.frac_reported + 1e-9) {
        lsince = ' seit <strong>' + lwhen + '</strong>';
      }
      var localNote = (r.frac_reported || 0) <= 0
        ? ' <span class="wb-art">(noch keine Meldung im WK — aus Prior/Landestrend)</span>'
        : '';
      el.innerHTML =
        '<div class="wb-call-banner wb-likely">◐ <strong>Partei wahrscheinlich: ' +
        partyShort(p) + '</strong> — ' + nameHtml(cand) + lsince +
        ' · P(Führung hält) ' + fmtProb(r.p_lead) + doneBit + localNote +
        ' <span class="wb-art">(Call ab ' + thrCallPct +
        '\u00a0% und wenn Rest die Marge nicht mehr kippen kann)</span></div>';
    } else {
      el.innerHTML =
        '<div class="wb-call-banner wb-open">Noch offen — <strong>' +
        (p ? partyShort(p) : '—') + '</strong> führt mit ' +
        (r.margin != null ? fmtNum(r.margin, 1) + '\u00a0PP' : '—') +
        ' · P(Führung hält) ' + fmtProb(r.p_lead) + doneBit +
        ' <span class="wb-art">(Wahrscheinlich ab ' + thrLikelyPct +
        '\u00a0%; Call ab ' + thrCallPct + '\u00a0%)</span></div>';
    }
  }

  function renderWkrWhy() {
    var el = $('wb-wkr-why');
    if (!el) return;
    if (state.scope !== 'wkr' || !state.unit) {
      el.innerHTML = '';
      return;
    }
    var st = steps();
    if (!st.length) { el.innerHTML = ''; return; }
    var s = st[Math.min(state.step, st.length - 1)];
    var r = (s.by_wkr && s.by_wkr[state.unit]) || {};
    var reported = reportedSet(s);
    var plist = (state.data.precincts || []).filter(function (p) {
      return p.wkr === state.unit;
    });
    var stats = { W: { n: 0, rep: 0 }, B: { n: 0, rep: 0 } };
    plist.forEach(function (p) {
      var k = p.art === 'B' ? 'B' : 'W';
      stats[k].n++;
      if (reported[p.id]) stats[k].rep++;
    });
    var nc = r.nowcast || {};
    var nv = r.naive || {};
    var diffs = PARTIES_ORDER.filter(function (p) { return p !== 'others'; })
      .map(function (p) {
        return { p: p, d: (nc[p] || 0) - (nv[p] || 0) };
      })
      .filter(function (x) { return Math.abs(x.d) >= 0.8; })
      .sort(function (a, b) { return Math.abs(b.d) - Math.abs(a.d); });
    var nRep = stats.W.rep + stats.B.rep;
    var html;
    if (!nRep) {
      html = 'Im Wahlkreis ist noch nichts gemeldet — die Anzeige ist die ' +
        '<strong>Ausgangslage</strong> (2016-Lean + Swing auf das Vorwahl-Ziel), ' +
        'korrigiert nur um das, was andere Gebiete bereits über den Landestrend verraten.';
    } else if (nRep >= plist.length) {
      var cwhenWhy = completeWhen(wkrCalls()[state.unit] || {});
      html = 'Alle ' + plist.length + ' Wahlbezirke in diesem WK sind ausgezählt' +
        (cwhenWhy ? ' <strong>seit ' + cwhenWhy + '</strong>' : '') +
        ' — Nowcast = Endstand im Wahlkreis.';
    } else {
      html = 'Gemeldet: <strong>' + nRep + '/' + plist.length + '</strong> Wahlbezirke ' +
        '(Urne ' + stats.W.rep + '/' + stats.W.n + ', Brief ' + stats.B.rep + '/' + stats.B.n + '). ' +
        'Der Nowcast überschreibt die offenen Wahlbezirke <em>nicht</em> mit dem bisherigen ' +
        'Rohstand, sondern lässt ihnen ihr Lean (2016 + Swing) plus die gelernte Korrektur. ';
      if (diffs.length) {
        html += 'Größte Abweichungen zum Rohstand: ' + diffs.slice(0, 3).map(function (x) {
          return partyShort(x.p) + ' <strong>' + fmtPp(x.d) + '</strong>';
        }).join(', ') + '.';
        if (stats.B.rep === 0 && stats.B.n > 0) {
          html += ' Briefwahl (' + stats.B.n + ' WB) fehlt noch komplett — die zählt oft anders als die Urne.';
        }
      } else {
        html += 'Nowcast und Rohstand liegen hier derzeit nah beieinander.';
      }
    }
    el.innerHTML = '<div class="wb-why"><strong>Warum weicht der Nowcast vom bisherigen Rohstand ab?</strong><br>' + html + '</div>';
  }

  function openWkr(uid) {
    state.scope = 'wkr';
    state.unit = String(uid);
    renderScopeButtons();
    renderStep();
    var root = $('wahlabend-root');
    if (root) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function collectWkrRaces(s) {
    var byW = (s && s.by_wkr) || {};
    var units = ((state.data.geo_units || {}).wkr) || [];
    var calls = wkrCalls();
    return units.map(function (u) {
      var r = byW[u.id] || {};
      var call = calls[u.id] || {};
      var p = r.direct_pred || r.leader_pred;
      var truthP = call.truth_erst;
      var calledNow = !!r.called;
      var likelyNow = callTier(r) === 'likely' || calledNow;
      var hitNow = !!(p && truthP && p === truthP);
      var pLead = r.p_lead != null ? r.p_lead : 1;
      var margin = r.margin != null ? r.margin : 99;
      return {
        id: u.id,
        label: u.label,
        bezirk: u.bezirk || '',
        party: p,
        cand: p ? candidateFor(u.id, p) : null,
        r: r,
        call: call,
        called: calledNow,
        likely: likelyNow,
        truthP: truthP,
        hitNow: hitNow,
        pLead: pLead,
        margin: margin,
        mu: marginUnc(r)
      };
    });
  }

  function bindWkrLinks(root) {
    if (!root) return;
    root.querySelectorAll('[data-wkr-link]').forEach(function (el) {
      el.addEventListener('click', function () {
        openWkr(el.getAttribute('data-wkr-link'));
      });
    });
  }

  function hexToRgb(hex) {
    var h = String(hex || '').replace('#', '');
    if (h.length === 3) {
      h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    }
    if (h.length !== 6) return { r: 136, g: 136, b: 136 };
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16)
    };
  }

  function partyRgba(party, alpha) {
    var rgb = hexToRgb(PARTY_COLORS[party] || '#888888');
    return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + alpha + ')';
  }

  /** Dunkler Text auf hellen Parteifarben (FDP). */
  function partyOnColor(party) {
    return party === 'fdp' ? '#1a1a1a' : '#ffffff';
  }

  function shortWkrLabel(label, id) {
    var s = String(label || '');
    var m = s.match(/WK\s*(\d+)/i);
    var num = m ? m[1] : String(id);
    var rest = s.replace(/^WK\s*\d+\s*[·.•\-–]?\s*/i, '').trim();
    if (rest.length > 22) rest = rest.slice(0, 20) + '…';
    return { num: num, rest: rest };
  }

  function wkrTileHtml(x) {
    var tier = x.called ? 'called' : (x.likely ? 'likely' : 'open');
    var parts = shortWkrLabel(x.label, x.id);
    var style = '';
    if (tier === 'called' && x.party) {
      style = 'background:' + (PARTY_COLORS[x.party] || '#888') +
        ';border-color:' + (PARTY_COLORS[x.party] || '#888') +
        ';color:' + partyOnColor(x.party) + ';';
    } else if (tier === 'likely' && x.party) {
      style = 'background:' + partyRgba(x.party, 0.22) +
        ';border-color:' + (PARTY_COLORS[x.party] || '#888') + ';';
    }
    var tip = escapeHtml(x.label) +
      (x.party ? ' · ' + partyShort(x.party) : '') +
      (tier === 'called' ? ' · Call' : (tier === 'likely' ? ' · wahrscheinlich' : ' · offen'));
    var active = state.scope === 'wkr' && String(state.unit) === String(x.id);
    return '<button type="button" class="wb-wkr-tile wb-wkr-tile-' + tier +
      (active ? ' is-active' : '') +
      '" data-wkr-link="' + x.id + '" data-search="' + escapeHtml(wkrSearchHaystack(x)) +
      '" style="' + style + '" title="' + tip + '">' +
      '<span class="wb-wkr-tile-num">' + escapeHtml(parts.num) + '</span>' +
      '</button>';
  }

  function drawSizeChart() {
    var canvas = $('wb-chart-size');
    if (!canvas || state.scope !== 'lage') return;
    var st = steps();
    if (!st.length) return;
    var ci = Math.min(state.step, st.length - 1);
    // Kurve nur bis jetzt; X-Achse = volle Nacht (leerer Rest = „kommt noch“)
    var qs = st.map(function (s, i) {
      if (i > ci) return null;
      return (s.entry_mc && s.entry_mc.size) || null;
    });
    if (!qs.some(function (q) { return q; })) return;
    var showTruth = isLandComplete(st[ci]);
    var inst = institutionsOf(st[ci].eval);
    var sizeTruth = showTruth && inst && inst.parliament ? inst.parliament.size_truth : null;
    var lastEl = lastElectionRef();
    var lastSize = lastEl && lastEl.parliament_size != null ? lastEl.parliament_size : null;

    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var cssW = canvas.clientWidth || 900;
    var cssH = canvas.clientHeight || 220;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    var nFull = st.length;
    var pad = { l: 40, r: 12, t: 16, b: 24 };
    var w = cssW - pad.l - pad.r;
    var h = cssH - pad.t - pad.b;
    var vals = [];
    qs.forEach(function (q) { if (q) { vals.push(q[0], q[2]); } });
    if (sizeTruth != null) vals.push(sizeTruth);
    if (lastSize != null) vals.push(lastSize);
    var yMin = Math.min.apply(null, vals) - 4;
    var yMax = Math.max.apply(null, vals) + 4;

    function xAt(i) { return pad.l + (i / Math.max(1, nFull - 1)) * w; }
    function yAt(v) { return pad.t + (1 - (v - yMin) / (yMax - yMin)) * h; }

    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t);
    ctx.lineTo(pad.l, pad.t + h);
    ctx.lineTo(pad.l + w, pad.t + h);
    ctx.stroke();

    // Noch ausstehende Nacht rechts andeuten
    if (ci < nFull - 1) {
      ctx.fillStyle = 'rgba(0,0,0,0.035)';
      ctx.fillRect(xAt(ci), pad.t, pad.l + w - xAt(ci), h);
    }

    ctx.fillStyle = '#888';
    ctx.font = '11px system-ui,sans-serif';
    var x0 = clockOnly(st[0].clock, st[0].clock_source) ||
      (Math.round((st[0].frac_reported || 0) * 100) + '\u00a0%');
    var xEnd = clockOnly(st[nFull - 1].clock, st[nFull - 1].clock_source) ||
      (Math.round((st[nFull - 1].frac_reported || 1) * 100) + '\u00a0%');
    ctx.fillText(x0, pad.l, cssH - 6);
    var xEndW = ctx.measureText(xEnd).width;
    ctx.fillText(xEnd, pad.l + w - xEndW, cssH - 6);
    ctx.fillText(String(Math.round(yMax)), 6, pad.t + 10);
    ctx.fillText(String(Math.round(yMin)), 6, pad.t + h);

    // p10–p90 band (nur bis jetzt)
    ctx.fillStyle = 'rgba(91,124,250,0.16)';
    ctx.beginPath();
    var started = false;
    for (var i = 0; i <= ci; i++) {
      if (!qs[i]) continue;
      var x = xAt(i), y = yAt(qs[i][2]);
      if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
    }
    for (var j = ci; j >= 0; j--) {
      if (!qs[j]) continue;
      ctx.lineTo(xAt(j), yAt(qs[j][0]));
    }
    if (started) {
      ctx.closePath();
      ctx.fill();
    }

    if (sizeTruth != null) {
      ctx.strokeStyle = '#888';
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(pad.l, yAt(sizeTruth));
      ctx.lineTo(pad.l + w, yAt(sizeTruth));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#666';
      ctx.fillText('Wahr ' + sizeTruth, pad.l + 6, yAt(sizeTruth) - 4);
    }
    if (lastSize != null) {
      drawHRef(
        ctx, pad, w, yAt, lastSize,
        lastElectionShort(lastEl) + ': ' + lastSize,
        '#8a6d3b'
      );
    }

    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    var started2 = false;
    for (var k = 0; k <= ci; k++) {
      if (!qs[k]) continue;
      var xk = xAt(k), yk = yAt(qs[k][1]);
      if (!started2) { ctx.moveTo(xk, yk); started2 = true; } else ctx.lineTo(xk, yk);
    }
    ctx.stroke();

    // Aktueller Stand (nicht am rechten Achsenrand, solange Nacht offen)
    if (qs[ci]) {
      var xc = xAt(ci);
      ctx.strokeStyle = 'rgba(0,0,0,0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(xc, pad.t);
      ctx.lineTo(xc, pad.t + h);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.arc(xc, yAt(qs[ci][1]), 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '12px system-ui,sans-serif';
      var label = qs[ci][1] + ' (p10 ' + qs[ci][0] + ' – p90 ' + qs[ci][2] + ')';
      var lw = ctx.measureText(label).width;
      ctx.fillText(
        label,
        Math.max(pad.l, Math.min(xc + 6, pad.l + w - lw)),
        yAt(qs[ci][1]) - 8
      );
    }
    stampLogo(ctx, cssW, cssH);
  }

  function drawTurnoutChart() {
    var canvas = $('wb-chart-turnout');
    if (!canvas || state.scope !== 'lage') return;
    var st = steps();
    if (!st.length) return;
    var ci = Math.min(state.step, st.length - 1);
    var showTruth = isLandComplete(st[ci]);
    var series = st.map(function (s, i) {
      if (i > ci) return null;
      return s.turnout || null;
    });
    if (!series.some(function (t) { return t && t.nowcast != null; })) return;

    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var cssW = canvas.clientWidth || 900;
    var cssH = canvas.clientHeight || 220;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    var nFull = st.length;
    var pad = { l: 40, r: 12, t: 16, b: 24 };
    var w = cssW - pad.l - pad.r;
    var h = cssH - pad.t - pad.b;
    var vals = [];
    series.forEach(function (t) {
      if (!t || t.nowcast == null) return;
      var u = t.uncertainty != null ? t.uncertainty : 0;
      vals.push(t.nowcast - u, t.nowcast + u);
      if (showTruth && t.truth != null) vals.push(t.truth);
    });
    var truth = showTruth && st[ci].turnout ? st[ci].turnout.truth : null;
    if (truth != null) vals.push(truth);
    var lastEl = lastElectionRef();
    var lastTo = lastEl && lastEl.turnout != null ? lastEl.turnout : null;
    if (lastTo != null) vals.push(lastTo);
    var yMin = Math.min.apply(null, vals) - 1;
    var yMax = Math.max.apply(null, vals) + 1;
    if (!(yMax > yMin)) { yMin = 50; yMax = 80; }

    function xAt(i) { return pad.l + (i / Math.max(1, nFull - 1)) * w; }
    function yAt(v) { return pad.t + (1 - (v - yMin) / (yMax - yMin)) * h; }

    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t);
    ctx.lineTo(pad.l, pad.t + h);
    ctx.lineTo(pad.l + w, pad.t + h);
    ctx.stroke();

    if (ci < nFull - 1) {
      ctx.fillStyle = 'rgba(0,0,0,0.035)';
      ctx.fillRect(xAt(ci), pad.t, pad.l + w - xAt(ci), h);
    }

    ctx.fillStyle = '#888';
    ctx.font = '11px system-ui,sans-serif';
    var x0 = clockOnly(st[0].clock, st[0].clock_source) ||
      (Math.round((st[0].frac_reported || 0) * 100) + '\u00a0%');
    var xEnd = clockOnly(st[nFull - 1].clock, st[nFull - 1].clock_source) ||
      (Math.round((st[nFull - 1].frac_reported || 1) * 100) + '\u00a0%');
    ctx.fillText(x0, pad.l, cssH - 6);
    ctx.fillText(xEnd, pad.l + w - ctx.measureText(xEnd).width, cssH - 6);
    ctx.fillText(fmtNum(yMax, 0) + '\u00a0%', 4, pad.t + 10);
    ctx.fillText(fmtNum(yMin, 0) + '\u00a0%', 4, pad.t + h);

    // ± band
    ctx.fillStyle = 'rgba(91,124,250,0.16)';
    ctx.beginPath();
    var started = false;
    for (var i = 0; i <= ci; i++) {
      var t = series[i];
      if (!t || t.nowcast == null) continue;
      var uHi = t.nowcast + (t.uncertainty != null ? t.uncertainty : 0);
      var x = xAt(i), y = yAt(uHi);
      if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
    }
    for (var j = ci; j >= 0; j--) {
      var tLo = series[j];
      if (!tLo || tLo.nowcast == null) continue;
      var uLo = tLo.nowcast - (tLo.uncertainty != null ? tLo.uncertainty : 0);
      ctx.lineTo(xAt(j), yAt(uLo));
    }
    if (started) { ctx.closePath(); ctx.fill(); }

    if (truth != null) {
      ctx.strokeStyle = '#888';
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(pad.l, yAt(truth));
      ctx.lineTo(pad.l + w, yAt(truth));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#666';
      ctx.fillText('Wahr ' + fmtNum(truth, 1) + '\u00a0%', pad.l + 6, yAt(truth) - 4);
    }
    if (lastTo != null) {
      drawHRef(
        ctx, pad, w, yAt, lastTo,
        lastElectionShort(lastEl) + ': ' + fmtNum(lastTo, 1) + '\u00a0%',
        '#8a6d3b'
      );
    }

    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    var started2 = false;
    for (var k = 0; k <= ci; k++) {
      var tk = series[k];
      if (!tk || tk.nowcast == null) continue;
      var xk = xAt(k), yk = yAt(tk.nowcast);
      if (!started2) { ctx.moveTo(xk, yk); started2 = true; } else ctx.lineTo(xk, yk);
    }
    ctx.stroke();

    var cur = series[ci];
    if (cur && cur.nowcast != null) {
      var xc = xAt(ci);
      ctx.strokeStyle = 'rgba(0,0,0,0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(xc, pad.t);
      ctx.lineTo(xc, pad.t + h);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.arc(xc, yAt(cur.nowcast), 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '12px system-ui,sans-serif';
      var label = fmtNum(cur.nowcast, 1) + '\u00a0%' +
        (cur.uncertainty != null && cur.uncertainty > 0
          ? ' ±\u00a0' + fmtNum(cur.uncertainty, 1)
          : '');
      var lw = ctx.measureText(label).width;
      ctx.fillText(
        label,
        Math.max(pad.l, Math.min(xc + 6, pad.l + w - lw)),
        yAt(cur.nowcast) - 8
      );
    }
    stampLogo(ctx, cssW, cssH);
  }

  function entryStatusHtml(rank, q) {
    if (q && rank <= q[0]) return '<span class="wb-entry-status wb-in">sicher</span>';
    if (q && rank <= q[2]) return '<span class="wb-entry-status wb-maybe">Wackelplatz</span>';
    return '<span class="wb-entry-status wb-out">draußen</span>';
  }

  function entryListTable(entries, q, wonWkrs) {
    if (!entries || !entries.length) return '<p class="wb-meta">Keine Listendaten.</p>';
    var hi = q ? q[2] : 0;
    var rank = 0;
    var shown = 0;
    var hidden = 0;
    var rows = [];
    entries.forEach(function (e) {
      var direct = e.wkr != null && wonWkrs['' + e.wkr];
      var cell;
      if (direct) {
        cell = '<span class="wb-entry-status wb-direct-tag">Direkt WK ' + e.wkr + '</span>';
      } else {
        rank++;
        cell = entryStatusHtml(rank, q);
      }
      var isVisible = direct ? (shown <= hi + 3) : (rank <= hi + 3);
      if (!isVisible) { hidden++; return; }
      shown++;
      // AGH2023-Replay: keine Personennamen (2026-CSV wäre anachronistisch)
      rows.push('<tr><td>' + e.pos + '</td><td>' +
        nameHtml({ name: 'Listenplatz ' + e.pos, is_placeholder: true }) +
        '</td><td>' + cell + '</td></tr>');
    });
    var more = hidden ? '<p class="wb-art" style="margin:0.25rem 0 0;">… ' + hidden + ' weitere Plätze (draußen)</p>' : '';
    return '<table class="wb-cov-table"><thead><tr>' +
      '<th>Platz</th><th>Name</th><th>Status</th></tr></thead><tbody>' +
      rows.join('') + '</tbody></table>' + more;
  }

  function placeholderListEntries(n, party) {
    var out = [];
    for (var i = 1; i <= n; i++) {
      out.push({ pos: i, name: partyShort(party) + ' · Listenplatz ' + i, ph: true });
    }
    return out;
  }

  function renderEntry() {
    var el = $('wb-entry');
    if (!el) return;
    if (state.scope !== 'land') {
      el.innerHTML = '';
      return;
    }
    if (!hasListenEinzug()) {
      el.innerHTML = '';
      return;
    }
    var st = steps();
    if (!st.length) { el.innerHTML = ''; return; }
    var s = st[Math.min(state.step, st.length - 1)];
    var mc = s.entry_mc;
    var roster = (state.data && state.data.listen_roster_2026) || {};
    if (!mc || !Object.keys(roster).length) {
      el.innerHTML = '<p class="wb-meta">Listen-Einzug für dieses Land ist noch nicht verfügbar.</p>';
      return;
    }
    var wonByParty = {};
    Object.keys(s.by_wkr || {}).forEach(function (uid) {
      var r = s.by_wkr[uid];
      var p = r.direct_pred || r.leader_pred;
      if (!p) return;
      if (!wonByParty[p]) wonByParty[p] = {};
      wonByParty[p][uid] = true;
    });
    var order = ['cdu', 'spd', 'gruene', 'linke', 'afd', 'fdp'];
    if (state.partyFocus && order.indexOf(state.partyFocus) >= 0) {
      order = [state.partyFocus];
    }
    var html = order.map(function (p) {
      var slot = roster[p];
      var seatsQ = (mc.seats || {})[p] || [0, 0, 0];
      var dCount = (mc.directs || {})[p] || 0;
      var listQ = (mc.list_seats || {})[p];
      var wonWkrs = wonByParty[p] || {};
      // Party-total Listensitze: use MC list quantiles when Landesliste;
      // else seats − Direkt (Direkt fixed across draws ⇒ quantile(s−d)=quantile(s)−d).
      var listLo;
      var listMid;
      var listHi;
      if (Array.isArray(listQ) && listQ.length >= 3) {
        listLo = listQ[0];
        listMid = listQ[1];
        listHi = listQ[2];
      } else {
        listLo = Math.max(0, seatsQ[0] - dCount);
        listMid = Math.max(0, seatsQ[1] - dCount);
        listHi = Math.max(0, seatsQ[2] - dCount);
      }
      var head = partyShort(p) + ' — Sitze ' + seatsQ[1] +
        ' <span class="wb-art">(p10 ' + seatsQ[0] + ' – p90 ' + seatsQ[2] +
        ') · Direkt ' + dCount +
        ' · Liste ' + listMid + ' (p10 ' + listLo + ' – p90 ' + listHi + ')</span>';
      var openAttr = state.partyFocus === p ? ' open' : '';
      if (seatsQ[1] === 0 && seatsQ[2] === 0) {
        return '<details class="wb-entry-party"' + openAttr + '><summary>' + head +
          ' <span class="wb-entry-status wb-out">kein Einzug</span></summary>' +
          '<p class="wb-meta">Unter 5\u00a0% und keine Direktmandate im aktuellen Nowcast.</p></details>';
      }
      var bodyHtml;
      if (!slot) {
        bodyHtml = '<p class="wb-meta">Keine Listendaten für ' + partyShort(p) + '.</p>';
      } else if (Array.isArray(listQ)) {
        bodyHtml = entryListTable(slot.landes, listQ, wonWkrs);
      } else if (listQ && typeof listQ === 'object' && hasBezirkslisten()) {
        var bezIds = Object.keys(slot.bezirk || {}).sort();
        bodyHtml = bezIds.map(function (bid) {
          var q = listQ[bid] || [0, 0, 0];
          return '<details class="wb-cov-nest"><summary>' +
            escapeHtml(unitLabel('bezirk', bid)) +
            ' — Listensitze ' + q[1] + ' <span class="wb-art">(p10 ' + q[0] +
            ' – p90 ' + q[2] + ')</span></summary>' +
            entryListTable(slot.bezirk[bid], q, wonWkrs) + '</details>';
        }).join('');
        bodyHtml = '<p class="wb-coverage-meta">Bezirkslisten (keine Landesliste): Sitze ' +
          'per Hare/Niemeyer auf die Bezirke (vereinfachte Suballokation). ' +
          'Aufklappen für Listenplätze je Bezirk.</p>' + bodyHtml;
      } else {
        bodyHtml = '<p class="wb-meta">Keine Listensitz-Quantile.</p>';
      }
      return '<details class="wb-entry-party"' + openAttr + '><summary>' + head +
        '</summary>' + bodyHtml + '</details>';
    }).join('');
    el.innerHTML = html +
      '<p class="wb-meta" style="margin:0.5rem 0 0;">' +
      escapeHtml(state.data.listen_roster_note || '') +
      ' Direktgewinner (aktueller Nowcast-Führer je WK) werden in der Liste übersprungen.' +
      (hasBezirkslisten()
        ? ''
        : ' Nur Landeslisten — keine Bezirkslisten wie in Berlin.') +
      '</p>';
  }

  function yesNo(ok) {
    return ok
      ? '<span class="wb-ok">richtig</span>'
      : '<span class="wb-bad">falsch</span>';
  }

  function hurdleHits(ln) {
    var ok = ln.hurdle_ok || {};
    var keys = Object.keys(ok);
    var n = 0;
    keys.forEach(function (p) { if (ok[p]) n++; });
    return { n: n, total: keys.length || 6 };
  }

  function scenarioIds() {
    return Object.keys((state.data && state.data.scenarios) || {});
  }

  /** Step in a scenario closest to the given statewide frac_reported. */
  function stepNearFrac(scSteps, frac) {
    if (!scSteps || !scSteps.length) return null;
    var bestI = 0;
    var bestD = 1e9;
    for (var i = 0; i < scSteps.length; i++) {
      var d = Math.abs((scSteps[i].frac_reported || 0) - frac);
      if (d < bestD) { bestD = d; bestI = i; }
    }
    return scSteps[bestI];
  }

  /**
   * Across all Melde-Szenarien at ~same Auszählungsstand: how many get
   * Hürde / Größe / Einzug / alle Direktmandate richtig?
   */
  function crossScenarioAt(frac) {
    var ids = scenarioIds();
    var out = {
      n: ids.length,
      hurdle: 0,
      size: 0,
      entry: 0,
      direkt: 0,
      details: []
    };
    ids.forEach(function (id) {
      var b = (state.data.scenarios || {})[id];
      var s = stepNearFrac((b && b.steps) || [], frac);
      if (!s || !s.eval || !s.eval.list) return;
      var ln = s.eval.list.nowcast;
      var inst = institutionsOf(s.eval);
      var hh = hurdleHits(ln);
      var hurdleOk = hh.total > 0 && hh.n === hh.total;
      var sizeOk = !!(inst && inst.parliament &&
        inst.parliament.size_pred === inst.parliament.size_truth);
      var entryOk = !!(inst && inst.entry &&
        inst.entry.n_ok === inst.entry.n_total);
      var direktOk = !!(inst && inst.direkt &&
        inst.direkt.n_hit === inst.direkt.n_total);
      if (hurdleOk) out.hurdle++;
      if (sizeOk) out.size++;
      if (entryOk) out.entry++;
      if (direktOk) out.direkt++;
      out.details.push({
        id: id,
        hurdleOk: hurdleOk,
        sizeOk: sizeOk,
        entryOk: entryOk,
        direktOk: direktOk,
        direktHit: inst && inst.direkt ? inst.direkt.n_hit : null,
        direktTot: inst && inst.direkt ? inst.direkt.n_total : null,
        sizePred: inst && inst.parliament ? inst.parliament.size_pred : null,
        sizeTruth: inst && inst.parliament ? inst.parliament.size_truth : null
      });
    });
    return out;
  }

  function fmtScen(k, n) {
    if (!n) return '—';
    var cls = k === n ? 'wb-ok' : (k === 0 ? 'wb-bad' : '');
    var html = k + '\u00a0/\u00a0' + n;
    return cls ? '<span class="' + cls + '">' + html + '</span>' : html;
  }

  function seatHits(ln) {
    var pred = ln.seats_pred || {};
    var truth = ln.seats_truth || {};
    var parties = Object.keys(truth).length ? Object.keys(truth) : Object.keys(pred);
    var exact = 0;
    var overlap = 0;
    var totalSeats = 0;
    parties.forEach(function (p) {
      var a = pred[p] || 0;
      var b = truth[p] || 0;
      if (a === b) exact++;
      overlap += Math.min(a, b);
      totalSeats += b;
    });
    return {
      exact: exact,
      nParties: parties.length,
      overlap: overlap,
      totalSeats: totalSeats || 130
    };
  }

  function institutionsOf(ev) {
    return (ev && ev.institutions && ev.institutions.nowcast) || null;
  }

  function meanBezirkMae(s, key) {
    var by = (s && s.by_bezirk) || {};
    var staticBez = ((state.data && state.data.geo_static) || {}).bezirk || {};
    var ids = Object.keys(by);
    if (!ids.length) return null;
    var predKey = key === 'mae_naive' ? 'naive' : 'nowcast';
    var sum = 0;
    var n = 0;
    ids.forEach(function (id) {
      var pred = by[id][predKey];
      var truth = (staticBez[id] && staticBez[id].truth) || null;
      if (!pred || !truth) return;
      var partySum = 0;
      BEZIRKSLISTE_PARTIES.forEach(function (p) {
        partySum += Math.abs((pred[p] || 0) - (truth[p] || 0));
      });
      sum += partySum / BEZIRKSLISTE_PARTIES.length;
      n++;
    });
    return n ? sum / n : null;
  }

  function directsFmt(d) {
    if (!d) return '—';
    return Object.keys(d).filter(function (p) { return d[p] > 0; })
      .map(function (p) { return partyShort(p) + '\u00a0' + d[p]; })
      .join(', ') || 'keine';
  }

  function scenarioProbsOf(s) {
    return (s && s.scenario_probs) || null;
  }

  /** Soft lean from P≥50% — not a hard "Call". */
  function scenarioLeanTxt(it) {
    return it.call ? 'tritt eher ein' : 'tritt eher nicht ein';
  }

  function scenarioLeanCls(it) {
    return it.call ? 'wb-lean-yes' : 'wb-lean-no';
  }

  function scenarioRowHtml(it) {
    var leanCls = scenarioLeanCls(it);
    var pStart = it.p_start != null ? it.p_start : it.p_prior;
    var line2 = '<span class="' + leanCls + '">' + scenarioLeanTxt(it) + '</span>';
    if (pStart != null) {
      line2 += ' · vor Auszählung ' + fmtNum(pStart, 0) + '\u00a0%';
    }
    return '<div class="wb-scen-item">' +
      '<div class="wb-scen-main">' +
        '<div class="wb-scen-label">' + escapeHtml(it.label_de) + '</div>' +
        '<div class="wb-scen-meta">' + line2 + '</div>' +
      '</div>' +
      '<div class="wb-scen-pct ' + leanCls + '">' + fmtNum(it.p, 0) + '\u00a0%</div>' +
      '</div>';
  }

  function isZeroScenario(it) {
    return Math.round(Number(it && it.p) || 0) === 0;
  }

  function renderScenarioProbs() {
    var el = $('wb-scenarios');
    if (!el) return;
    if (state.scope !== 'lage') {
      el.innerHTML = '';
      return;
    }
    var st = steps();
    if (!st.length) { el.innerHTML = ''; return; }
    var s = st[Math.min(state.step, st.length - 1)];
    var sp = scenarioProbsOf(s);
    if (!sp || !sp.items || !sp.items.length) {
      el.innerHTML = '<p class="wb-meta">Szenario-Wahrscheinlichkeiten fehlen (JSON neu generieren).</p>';
      return;
    }
    var nonzero = [];
    var zero = [];
    sp.items.forEach(function (it) {
      if (isZeroScenario(it)) zero.push(it);
      else nonzero.push(it);
    });
    var showZero = state.showZeroScenarios;
    var rows = nonzero.map(scenarioRowHtml).join('');
    if (showZero) rows += zero.map(scenarioRowHtml).join('');
    if (!nonzero.length && !showZero) {
      rows = '<p class="wb-meta">Keine Szenarien mit P&nbsp;&gt;&nbsp;0&nbsp;% am aktuellen Stand.</p>';
    }
    if (zero.length) {
      rows += '<button type="button" class="wb-scen-more" id="wb-scen-more">' +
        (showZero
          ? '0\u00a0%-Szenarien ausblenden'
          : zero.length + ' mit 0\u00a0% · mehr anzeigen') +
        '</button>';
    }
    el.innerHTML = rows;
    var more = $('wb-scen-more');
    if (more) {
      more.addEventListener('click', function () {
        state.showZeroScenarios = !state.showZeroScenarios;
        renderScenarioProbs();
      });
    }
    renderScenarioProbsEval(sp);
  }

  function renderScenarioProbsEval(sp) {
    var el = $('wb-scenarios-eval-body');
    if (!el) return;
    if (state.scope === 'wkr' || !sp || !sp.items) {
      el.innerHTML = '';
      return;
    }
    var rows = sp.items.map(function (it) {
      var leanCls = scenarioLeanCls(it);
      var verdict = it.correct
        ? '<span class="wb-ok">richtig</span>'
        : '<span class="wb-bad">falsch</span>';
      var truthTxt = it.truth ? 'tritt ein' : 'tritt nicht ein';
      var pStart = it.p_start != null ? it.p_start : it.p_prior;
      var line2 = '<span class="' + leanCls + '">' + scenarioLeanTxt(it) + '</span>' +
        ' · Wahr: ' + truthTxt;
      if (pStart != null) {
        line2 += ' · vor ' + fmtNum(pStart, 0) + '\u00a0%';
      }
      return '<div class="wb-scen-item">' +
        '<div class="wb-scen-main">' +
          '<div class="wb-scen-label">' + escapeHtml(it.label_de) + '</div>' +
          '<div class="wb-scen-meta">' + line2 + '</div>' +
        '</div>' +
        '<div class="wb-scen-pct ' + leanCls + '">' + fmtNum(it.p, 0) + '\u00a0%</div>' +
        '<div class="wb-scen-verdict">' + verdict + '</div>' +
        '</div>';
    }).join('');
    el.innerHTML =
      '<p class="wb-scen-score">Richtung richtig: <strong>' +
        sp.n_ok + '\u00a0/\u00a0' + sp.n_total +
        '</strong> <span class="wb-art">(P\u00a0≥\u00a050\u00a0%\u00a0=\u00a0eher ein)</span></p>' +
      rows;
  }

  function renderHitsStrip() {
    var el = $('wb-hits');
    if (!el) return;
    if (state.scope !== 'zweit') {
      el.innerHTML = '';
      return;
    }
    var st = steps();
    if (!st.length) { el.innerHTML = ''; return; }
    var s = st[Math.min(state.step, st.length - 1)];
    var ev = s.eval;
    if (!ev || !ev.list) { el.innerHTML = ''; return; }
    var ln = ev.list.nowcast;
    var inst = institutionsOf(ev);
    var parl = inst && inst.parliament;
    var dir = inst && inst.direkt;
    var ent = inst && inst.entry;
    var bzMae = meanBezirkMae(s, 'mae_nowcast');
    var hh = hurdleHits(ln);
    var sp = scenarioProbsOf(s);
    var sizeHtml = parl
      ? (parl.size_pred + ' <span class="wb-art">(Wahr ' + parl.size_truth +
          (parl.size_err ? ', Δ' + (parl.size_err > 0 ? '+' : '') + parl.size_err : '') +
          ')</span>')
      : '—';
    el.innerHTML =
      '<div class="wb-hit-card">' +
        '<span class="wb-hit-k">Szenarien</span>' +
        '<div class="wb-hit-v">' +
          (sp ? (sp.n_ok + '\u00a0/\u00a0' + sp.n_total) : '—') + '</div>' +
        '<div class="wb-hit-s">eher ein/nicht vs. Wahrheit</div>' +
      '</div>' +
      '<div class="wb-hit-card">' +
        '<span class="wb-hit-k">5-%-Hürde richtig</span>' +
        '<div class="wb-hit-v">' + hh.n + '\u00a0/\u00a0' + hh.total + '</div>' +
        '<div class="wb-hit-s">Parteien ≥5\u00a0% ja/nein</div>' +
      '</div>' +
      '<div class="wb-hit-card">' +
        '<span class="wb-hit-k">Parlamentsgröße</span>' +
        '<div class="wb-hit-v">' + sizeHtml + '</div>' +
        '<div class="wb-hit-s">BE-Formel aus Nowcast</div>' +
      '</div>' +
      '<div class="wb-hit-card">' +
        '<span class="wb-hit-k">Direktmandate</span>' +
        '<div class="wb-hit-v">' +
          (dir ? (dir.n_hit + '\u00a0/\u00a0' + dir.n_total) : '—') + '</div>' +
        '<div class="wb-hit-s">Erststimmen-Nowcast</div>' +
      '</div>' +
      '<div class="wb-hit-card">' +
        '<span class="wb-hit-k">Einzug richtig</span>' +
        '<div class="wb-hit-v">' +
          (ent ? (ent.n_ok + '\u00a0/\u00a0' + ent.n_total) : '—') + '</div>' +
        '<div class="wb-hit-s">5\u00a0% oder Grundmandat</div>' +
      '</div>' +
      (hasBezirkslisten()
        ? ('<div class="wb-hit-card">' +
          '<span class="wb-hit-k">Bezirkslisten (' + BEZIRKSLISTE_LABEL + ')</span>' +
          '<div class="wb-hit-v">' +
            (bzMae != null ? fmtNum(bzMae, 2) + '\u00a0PP' : '—') + '</div>' +
          '<div class="wb-hit-s">mittlerer Anteilsfehler · 12 Bezirke</div>' +
        '</div>')
        : '');
  }

  function renderHitsTimeline() {
    var body = $('wb-hits-timeline-body');
    if (!body) return;
    if (state.scope === 'wkr') {
      body.innerHTML = '';
      return;
    }
    var st = steps();
    if (!st.length) { body.innerHTML = ''; return; }
    var rows = st.map(function (s, i) {
      var ev = s.eval;
      if (!ev || !ev.list) return '';
      var ln = ev.list.nowcast;
      var lv = ev.list.naive;
      var hh = hurdleHits(ln);
      var hhn = hurdleHits(lv);
      var inst = institutionsOf(ev);
      var parl = inst && inst.parliament;
      var dir = inst && inst.direkt;
      var ent = inst && inst.entry;
      var sp = scenarioProbsOf(s);
      var sizeCell = parl
        ? (parl.size_pred +
          (parl.size_pred === parl.size_truth
            ? ' <span class="wb-ok">=</span>'
            : ' <span class="wb-bad">≠' + parl.size_truth + '</span>'))
        : '—';
      var dirCell = dir ? (dir.n_hit + '/' + dir.n_total) : '—';
      var entCell = ent ? (ent.n_ok + '/' + ent.n_total) : '—';
      var scenCell = sp
        ? ('<span class="' + (sp.n_ok === sp.n_total ? 'wb-ok' : '') + '">' +
            sp.n_ok + '/' + sp.n_total + '</span>')
        : '—';
      var bzMae = meanBezirkMae(s, 'mae_nowcast');
      var bzMaeN = meanBezirkMae(s, 'mae_naive');
      var active = i === state.step ? ' class="wb-row-active"' : '';
      return '<tr' + active + ' data-step="' + i + '" style="cursor:pointer;">' +
        '<td>' + stepWhen(s) + '</td>' +
        '<td>' + scenCell + '</td>' +
        '<td>' + hh.n + '/' + hh.total +
          ' <span class="wb-art">naiv ' + hhn.n + '/' + hhn.total + '</span></td>' +
        '<td>' + sizeCell + '</td>' +
        '<td>' + dirCell + '</td>' +
        '<td>' + entCell + '</td>' +
        (hasBezirkslisten()
          ? ('<td>' + (bzMae != null ? fmtNum(bzMae, 2) : '—') +
            ' <span class="wb-art">naiv ' +
            (bzMaeN != null ? fmtNum(bzMaeN, 2) : '—') + '</span></td>')
          : '') +
        '</tr>';
    }).join('');
    body.innerHTML =
      '<table class="wb-cov-table"><thead><tr>' +
      '<th>Zeit / Auszählung</th>' +
      '<th>Szenarien</th>' +
      '<th>Hürde</th>' +
      '<th>Größe</th>' +
      '<th>Direkt</th>' +
      '<th>Einzug</th>' +
      (hasBezirkslisten() ? '<th>Bezirk-MAE*</th>' : '') +
      '</tr></thead><tbody>' + rows + '</tbody></table>' +
      (hasBezirkslisten()
        ? ('<p class="wb-coverage-meta">* Nur ' + BEZIRKSLISTE_LABEL +
          ' (Bezirkslisten). Szenarien = politische Ereignisse ' +
          '(Mehrheit / stärkste Kraft / Hürde): P\u00a0≥\u00a050\u00a0%\u00a0=\u00a0eher ein ' +
          'vs. Wahrheit.</p>')
        : ('<p class="wb-coverage-meta">Szenarien = politische Ereignisse ' +
          '(Mehrheit / stärkste Kraft / Hürde): P\u00a0≥\u00a050\u00a0%\u00a0=\u00a0eher ein ' +
          'vs. Wahrheit.</p>'));
    body.querySelectorAll('tr[data-step]').forEach(function (tr) {
      tr.addEventListener('click', function () {
        var i = Number(tr.getAttribute('data-step'));
        state.step = i;
        var slider = $('wb-slider');
        if (slider) slider.value = String(i);
        renderStep();
      });
    });
  }

  function syncScopePanels() {
    var isWkr = state.scope === 'wkr';
    var isLand = state.scope === 'land';
    var isZweit = state.scope === 'zweit';
    var isLage = state.scope === 'lage';
    document.querySelectorAll('[data-hide-wkr]').forEach(function (el) {
      el.hidden = isWkr;
    });
    document.querySelectorAll('[data-zweit-only]').forEach(function (el) {
      el.hidden = !isZweit;
    });
    document.querySelectorAll('[data-lage-only]').forEach(function (el) {
      el.hidden = !isLage;
    });
    document.querySelectorAll('[data-land-only]').forEach(function (el) {
      el.hidden = !isLand;
    });
    document.querySelectorAll('[data-bezirk-only]').forEach(function (el) {
      el.hidden = true;
    });
  }

  function renderEval() {
    var el = $('wb-eval');
    if (!el) return;
    if (state.scope !== 'zweit') {
      el.innerHTML = '';
      return;
    }
    var st = steps();
    if (!st.length) return;
    var s = st[Math.min(state.step, st.length - 1)];
    var ev = s.eval;
    if (!ev || !ev.list) {
      el.innerHTML = '';
      return;
    }
    var ln = ev.list.nowcast;
    var lv = ev.list.naive;
    var inst = institutionsOf(ev);
    var parl = inst && inst.parliament;
    var dir = inst && inst.direkt;
    var ent = inst && inst.entry;
    var sh = parl
      ? seatHits({ seats_pred: parl.seats_pred, seats_truth: parl.seats_truth })
      : seatHits(ln);
    var bzMae = meanBezirkMae(s, 'mae_nowcast');
    var bzMaeN = meanBezirkMae(s, 'mae_naive');
    var hh = hurdleHits(ln);
    var scenProbs = scenarioProbsOf(s);

    var unitNote = '';
    if (state.scope === 'bezirk' && s.by_bezirk && s.by_bezirk[state.unit]) {
      var ub = s.by_bezirk[state.unit];
      unitNote = '<p class="wb-meta" style="margin:0.5rem 0 0;">Dieser Bezirk: Anteilsfehler Nowcast <strong>' +
        fmtNum(ub.mae_nowcast, 2) + '\u00a0PP</strong> (alle Parteien). ' +
        'Für Listenplätze zählen die Bezirksanteile nur bei <strong>' +
        BEZIRKSLISTE_LABEL + '</strong>; Grüne/AfD/FDP haben eine Landesliste.</p>';
    } else if (state.scope === 'wkr' && s.by_wkr && s.by_wkr[state.unit]) {
      var uw = s.by_wkr[state.unit];
      unitNote = '<p class="wb-meta" style="margin:0.5rem 0 0;">Dieser Wahlkreis: stärkste Partei Nowcast <strong>' +
        partyShort(uw.leader_pred) + '</strong> gegenüber Wahr <strong>' +
        partyShort(uw.leader_truth) + '</strong> — ' + yesNo(uw.leader_ok) + '</p>';
    }

    var seatSrc = parl || ln;
    var hurdleRows = Object.keys(ln.hurdle_ok || {}).map(function (p) {
      var ok = ln.hurdle_ok[p];
      var pred = ln.above5_pred[p] ? '≥5%' : '<5%';
      var truth = ln.above5_truth[p] ? '≥5%' : '<5%';
      var sp = (seatSrc.seats_pred && seatSrc.seats_pred[p] != null) ? seatSrc.seats_pred[p] : '—';
      var stSeats = (seatSrc.seats_truth && seatSrc.seats_truth[p] != null) ? seatSrc.seats_truth[p] : '—';
      var seatOk = sp === stSeats;
      var dPred = dir && dir.directs_pred ? (dir.directs_pred[p] || 0) : '—';
      var dTruth = dir && dir.directs_truth ? (dir.directs_truth[p] || 0) : '—';
      var ePred = ent && ent.pred ? (ent.pred[p] ? 'ja' : 'nein') : '—';
      var eTruth = ent && ent.truth ? (ent.truth[p] ? 'ja' : 'nein') : '—';
      var eOk = ent && ent.pred && ent.truth ? yesNo(ent.pred[p] === ent.truth[p]) : '—';
      return '<tr><td>' + partyShort(p) + '</td><td>' + pred + '</td><td>' + truth +
        '</td><td>' + yesNo(ok) + '</td><td>' + dPred + '</td><td>' + dTruth +
        '</td><td>' + ePred + '/' + eTruth + ' ' + eOk +
        '</td><td>' + sp + '</td><td>' + stSeats +
        '</td><td>' + yesNo(seatOk) + '</td></tr>';
    }).join('');

    var instBlock = '';
    if (inst) {
      instBlock =
        '<h3 style="margin-top:1rem;">Direkt · Einzug · Parlamentsgröße</h3>' +
        '<div class="wb-eval-grid">' +
          '<div><dl>' +
            '<dt>Direktmandate</dt><dd><strong>' +
              dir.n_hit + '/' + dir.n_total + '</strong> WK richtig' +
              '<div class="wb-art">Erststimmen-Nowcast vs. Erst-Sieger</div>' +
              '<div>Nowcast: ' + directsFmt(dir.directs_pred) +
              ' · Wahr: ' + directsFmt(dir.directs_truth) + '</div></dd>' +
            '<dt>Einzug</dt><dd><strong>' + ent.n_ok + '/' + ent.n_total +
              '</strong> Parteien · ' + (ent.note || '') + '</dd>' +
          '</dl></div>' +
          '<div><dl>' +
            '<dt>Parlamentsgröße</dt><dd><strong>' + parl.size_pred +
              '</strong> Sitze (Wahr ' + parl.size_truth +
              ', Δ' + (parl.size_err > 0 ? '+' : '') + parl.size_err + ')</dd>' +
            '<dt>Sitze exakt</dt><dd><strong>' + sh.exact + '/' + sh.nParties +
              '</strong> Parteien · MAE ' + fmtNum(parl.seat_mae, 1) + '</dd>' +
            '<dt>Überhang (gesamt)</dt><dd>Nowcast ' + parl.total_oh_pred +
              ' · Wahr ' + parl.total_oh_truth + '</dd>' +
          '</dl></div>' +
        '</div>';
    }

    el.innerHTML =
      '<div class="wb-eval-grid">' +
        '<div><dl>' +
          '<dt>5-%-Hürde</dt><dd><strong>' + hh.n + '/' + hh.total + '</strong> richtig' +
            ' <span class="wb-art">naiv ' + hurdleHits(lv).n + '/' + hurdleHits(lv).total + '</span></dd>' +
          '<dt>Szenarien</dt><dd><strong>' +
            (scenProbs ? (scenProbs.n_ok + '/' + scenProbs.n_total) : '—') +
            '</strong> Richtung richtig' +
            '<div class="wb-art">P\u00a0≥\u00a050\u00a0%\u00a0=\u00a0eher ein vs. Wahrheit</div></dd>' +
        '</dl></div>' +
        '<div><dl>' +
          '<dt>Direktmandate</dt><dd><strong>' +
            (dir ? (dir.n_hit + '/' + dir.n_total) : '—') +
            '</strong> richtig' +
            ' <span class="wb-art">Erststimmen-Nowcast</span></dd>' +
          (hasBezirkslisten()
            ? ('<dt>Bezirkslisten (' + BEZIRKSLISTE_LABEL + ')</dt><dd>mittlerer Fehler <strong>' +
              (bzMae != null ? fmtNum(bzMae, 2) + '\u00a0PP' : '—') + '</strong>' +
              ' <span class="wb-art">naiv ' +
              (bzMaeN != null ? fmtNum(bzMaeN, 2) + '\u00a0PP' : '—') +
              '</span><div class="wb-art">Nur Parteien mit Bezirkslisten; ' +
              'Grüne/AfD/FDP: Landesliste</div></dd>')
            : '') +
        '</dl></div>' +
      '</div>' +
      instBlock +
      '<table class="wb-cov-table" style="margin-top:0.65rem;"><thead><tr>' +
        '<th>Partei</th><th>NC-Hürde</th><th>Wahr</th><th>Hürde</th>' +
        '<th>Dir NC</th><th>Dir Wahr</th><th>Einzug</th>' +
        '<th>Sitze NC</th><th>Sitze Wahr</th><th>Sitze</th></tr></thead><tbody>' +
        hurdleRows + '</tbody></table>' +
      '<p class="wb-meta" style="margin:0.5rem 0 0;">' + (ev.note || '') +
      (state.scenario === 'random'
        ? ' Bei diesem Meldefluss kann Naiv nah am Nowcast liegen — erwartbar, weil kaum Selektionsbias bleibt.'
        : '') +
      '</p>' +
      unitNote;
  }

  function statusPill(nRep, nTot, scopeLabel) {
    if (!nTot) return '<span class="wb-pill wb-pill-none">—</span>';
    if (nRep <= 0) return '<span class="wb-pill wb-pill-none">offen</span>';
    if (nRep >= nTot) {
      var done = scopeLabel ? (scopeLabel + ' ausgezählt') : 'ausgezählt';
      return '<span class="wb-pill wb-pill-done">' + done + '</span>';
    }
    return '<span class="wb-pill wb-pill-part">teilweise</span>';
  }

  function progressBar(nRep, nTot) {
    var pct = nTot ? Math.round(100 * nRep / nTot) : 0;
    return '<span class="wb-bar" title="' + pct + '%"><i style="width:' + pct + '%"></i></span>';
  }

  function reportedSet(s) {
    var b = scenarioBundle();
    var order = (b && b.reporting_order) || (state.data && state.data.reporting_order) || [];
    var n = s.n_reported || 0;
    var set = {};
    for (var i = 0; i < n && i < order.length; i++) set[order[i]] = true;
    return set;
  }

  function precinctsFiltered() {
    var list = (state.data && state.data.precincts) || [];
    if (state.scope === 'bezirk') {
      return list.filter(function (p) { return p.bezirk === state.unit; });
    }
    if (state.scope === 'wkr') {
      return list.filter(function (p) { return p.wkr === state.unit; });
    }
    return list;
  }

  function groupTree(list) {
    var byBez = {};
    list.forEach(function (p) {
      if (!byBez[p.bezirk]) byBez[p.bezirk] = { wkr: {} };
      if (!byBez[p.bezirk].wkr[p.wkr]) byBez[p.bezirk].wkr[p.wkr] = [];
      byBez[p.bezirk].wkr[p.wkr].push(p);
    });
    return byBez;
  }

  function countReported(plist, reported) {
    var n = 0;
    for (var i = 0; i < plist.length; i++) if (reported[plist[i].id]) n++;
    return n;
  }

  function precinctMap() {
    if (!state._precinctMap) {
      state._precinctMap = {};
      (state.data && state.data.precincts || []).forEach(function (p) {
        state._precinctMap[p.id] = p;
      });
    }
    return state._precinctMap;
  }

  function hasPrecinctCounts() {
    var list = (state.data && state.data.precincts) || [];
    return list.length > 0 && list[0].counts != null;
  }

  /** ballot: 'zweit' | 'erst' — sums only reported precincts in plist. */
  function aggregateActual(plist, reported, ballot) {
    ballot = ballot || 'zweit';
    var counts = {};
    PARTIES_ORDER.forEach(function (p) { counts[p] = 0; });
    var gueltig = 0;
    var gueltigTotal = 0;
    var waehler = 0;
    var wber = 0;
    plist.forEach(function (meta) {
      var p = precinctMap()[meta.id] || meta;
      var gTot = ballot === 'erst' && p.gueltig_erst != null ? p.gueltig_erst : (p.gueltig || 0);
      gueltigTotal += gTot;
      wber += p.wber || 0;
      if (!reported[meta.id]) return;
      waehler += p.waehler || 0;
      gueltig += gTot;
      var csrc = ballot === 'erst' && p.counts_erst ? p.counts_erst : (p.counts || {});
      PARTIES_ORDER.forEach(function (party) {
        counts[party] += csrc[party] || 0;
      });
    });
    return {
      gueltig: gueltig,
      gueltig_total: gueltigTotal,
      waehler: waehler,
      wber: wber,
      turnout: wber > 0 ? (100 * waehler / wber) : null,
      counts: counts,
      n_reported: countReported(plist, reported),
      n_total: plist.length
    };
  }

  function leaderFromCounts(counts, gueltig) {
    var best = null;
    var bestV = -1;
    PARTIES_ORDER.filter(function (p) { return p !== 'others'; }).forEach(function (p) {
      var v = counts[p] || 0;
      if (v > bestV) { bestV = v; best = p; }
    });
    if (best == null || bestV <= 0) return null;
    var pct = gueltig > 0 ? (100 * bestV / gueltig) : null;
    return { party: best, votes: bestV, pct: pct };
  }

  function actualSummaryCards(act, label) {
    var wbTxt = act.n_reported + '/' + act.n_total + ' WB';
    var gueltigTxt = fmtInt(act.gueltig);
    if (act.gueltig_total > act.gueltig) {
      gueltigTxt += ' <span class="wb-art">von ' + fmtInt(act.gueltig_total) + '</span>';
    }
    return '<div class="wb-hits" style="margin:0.5rem 0 0.75rem;">' +
      '<div class="wb-hit-card">' +
        '<span class="wb-hit-k">' + escapeHtml(label) + ' · WB</span>' +
        '<div class="wb-hit-v">' + wbTxt + '</div>' +
        '<div class="wb-hit-s">gemeldet</div>' +
      '</div>' +
      '<div class="wb-hit-card">' +
        '<span class="wb-hit-k">Gültige Stimmen</span>' +
        '<div class="wb-hit-v">' + gueltigTxt + '</div>' +
        '<div class="wb-hit-s">nur gemeldete Bezirke</div>' +
      '</div>' +
      '<div class="wb-hit-card">' +
        '<span class="wb-hit-k">Wählerinnen/Wähler</span>' +
        '<div class="wb-hit-v">' + fmtInt(act.waehler) + '</div>' +
        '<div class="wb-hit-s">von ' + fmtInt(act.wber) + ' Wahlberechtigten</div>' +
      '</div>' +
      '<div class="wb-hit-card">' +
        '<span class="wb-hit-k">Wahlbeteiligung</span>' +
        '<div class="wb-hit-v">' +
          (act.turnout != null ? fmtNum(act.turnout, 1) + '\u00a0%' : '—') +
        '</div>' +
        '<div class="wb-hit-s">gemeldete WB / alle WB im Gebiet</div>' +
      '</div>' +
    '</div>';
  }

  function actualPartyTable(act, ballotLabel) {
    if (!act.gueltig) {
      return '<p class="wb-meta">Noch keine Stimmen gemeldet.</p>';
    }
    var parties = PARTIES_ORDER.filter(function (p) { return p !== 'others'; })
      .map(function (p) {
        return { p: p, v: act.counts[p] || 0 };
      })
      .filter(function (x) { return x.v > 0; })
      .sort(function (a, b) { return b.v - a.v; });
    if (!parties.length) return '<p class="wb-meta">Keine Parteistimmen.</p>';
    var rows = parties.map(function (x) {
      var pct = act.gueltig > 0 ? (100 * x.v / act.gueltig) : 0;
      return '<tr><td>' + partyShort(x.p) + '</td>' +
        '<td style="text-align:right;">' + fmtInt(x.v) + '</td>' +
        '<td style="text-align:right;">' + fmtNum(pct, 1) + '\u00a0%</td></tr>';
    }).join('');
    return '<p class="wb-chart-label" style="margin-top:0.75rem;">' +
      escapeHtml(ballotLabel) + ' — absolute Stimmen (gemeldet)</p>' +
      '<div style="overflow-x:auto;"><table class="wb-cov-table">' +
      '<thead><tr><th>Partei</th><th style="text-align:right;">Stimmen</th>' +
      '<th style="text-align:right;">Anteil</th></tr></thead><tbody>' +
      rows + '</tbody></table></div>';
  }

  function renderActual() {
    var el = $('wb-actual');
    if (!el || !state.data) return;
    var st = steps();
    if (!st.length) { el.innerHTML = ''; return; }
    var s = st[Math.min(state.step, st.length - 1)];
    var reported = reportedSet(s);
    if (!hasPrecinctCounts()) {
      el.innerHTML =
        '<p class="wb-meta">Absolute Stimmen fehlen im JSON — Replay neu generieren ' +
        '(<code>python3 code/wahlabend_nowcast.py</code> bzw. LTW-Skript).</p>';
      return;
    }

    var all = state.data.precincts || [];
    var landAct = aggregateActual(all, reported, 'zweit');
    var html = actualSummaryCards(landAct, 'Land');

    if (state.scope === 'wkr' && state.unit) {
      var wkrList = all.filter(function (p) { return String(p.wkr) === String(state.unit); });
      var ballot = state.land === 'be' ? 'erst' : 'zweit';
      var wkrAct = aggregateActual(wkrList, reported, ballot);
      var wkrLabel = unitLabel('wkr', state.unit);
      html += actualSummaryCards(wkrAct, wkrLabel);
      html += actualPartyTable(
        wkrAct,
        state.land === 'be' ? 'Erststimmen' : 'Zweitstimmen (WK-Proxy)'
      );
    } else if (state.scope === 'bezirk' && state.unit) {
      var bezList = all.filter(function (p) { return p.bezirk === state.unit; });
      var bezAct = aggregateActual(bezList, reported, 'zweit');
      html += actualSummaryCards(bezAct, unitLabel('bezirk', state.unit));
      html += actualPartyTable(bezAct, 'Zweitstimmen');
    } else {
      html += actualPartyTable(landAct, 'Zweitstimmen (Land)');
    }

    var units = ((state.data.geo_units || {}).wkr) || [];
    if (units.length) {
      var ballotWk = state.land === 'be' ? 'erst' : 'zweit';
      var wkrRows = units.map(function (u) {
        var pl = all.filter(function (p) { return String(p.wkr) === String(u.id); });
        var act = aggregateActual(pl, reported, ballotWk);
        var lead = leaderFromCounts(act.counts, act.gueltig);
        var leadTxt = lead
          ? (partyShort(lead.party) + ' ' + fmtInt(lead.votes) +
            (lead.pct != null ? ' (' + fmtNum(lead.pct, 1) + '\u00a0%)' : ''))
          : '—';
        var active = state.unit && String(state.unit) === String(u.id)
          ? ' class="wb-row-active"' : '';
        return '<tr' + active + ' data-wkr-link="' + u.id + '" style="cursor:pointer;">' +
          '<td>WK\u00a0' + escapeHtml(String(u.id).padStart(2, '0')) + '</td>' +
          '<td>' + act.n_reported + '/' + act.n_total + '</td>' +
          '<td style="text-align:right;">' + fmtInt(act.gueltig) + '</td>' +
          '<td style="text-align:right;">' +
            (act.turnout != null ? fmtNum(act.turnout, 1) + '\u00a0%' : '—') + '</td>' +
          '<td>' + leadTxt + '</td></tr>';
      }).join('');
      html +=
        '<p class="wb-chart-label" style="margin-top:1rem;">Wahlkreise — Rohstand</p>' +
        '<div style="overflow-x:auto;"><table class="wb-cov-table" id="wb-actual-wkr-table">' +
        '<thead><tr><th>WK</th><th>WB</th><th style="text-align:right;">Gültige Stimmen</th>' +
        '<th style="text-align:right;">Wahlbeteiligung</th><th>Führend (gemeldet)</th>' +
        '</tr></thead><tbody>' + wkrRows + '</tbody></table></div>' +
        '<p class="wb-meta" style="margin:0.35rem 0 0;">Zeile antippen öffnet den Wahlkreis.</p>';
    }

    el.innerHTML = html;
    bindWkrLinks(el);
  }

  function renderCoverage() {
    var body = $('wb-coverage-body');
    var meta = $('wb-coverage-meta');
    if (!body || !state.data) return;
    var st = steps();
    if (!st.length) return;
    var s = st[Math.min(state.step, st.length - 1)];
    var reported = reportedSet(s);
    var list = precinctsFiltered();
    var tree = groupTree(list);
    var nRep = countReported(list, reported);
    meta.textContent =
      nRep + ' von ' + list.length + ' Wahlbezirken im gewählten Gebiet gemeldet' +
      ' (Land: ' + s.n_reported + '/' + s.n_total + '). Urne = W, Brief = B. ' +
      'Wahlkreise und Wahlbezirke erst nach Aufklappen.';

    if (!list.length) {
      body.innerHTML = '<p class="wb-meta">Keine Wahlbezirksdaten geladen.</p>';
      return;
    }

    if (state.scope === 'wkr') {
      body.innerHTML = precinctTable(list, reported);
      return;
    }

    var bezirkIds = Object.keys(tree).sort();
    var html = '<div class="wb-cov-list">';
    bezirkIds.forEach(function (bid) {
      var wkrs = tree[bid].wkr;
      var flat = [];
      Object.keys(wkrs).forEach(function (w) {
        flat = flat.concat(wkrs[w]);
      });
      var nr = countReported(flat, reported);
      var open = state.openBezirk[bid] ? ' open' : '';
      var wkrIds = Object.keys(wkrs).sort(function (a, b) {
        return Number(a) - Number(b);
      });
      html +=
        '<details class="wb-cov-nest" data-bez="' + bid + '"' + open + '>' +
        '<summary><strong>' + escapeHtml(unitLabel('bezirk', bid)) + '</strong> ' +
        statusPill(nr, flat.length, 'Bezirk') + ' ' + progressBar(nr, flat.length) +
        ' <span class="wb-art">' + nr + '/' + flat.length + '</span></summary>' +
        '<div class="wb-cov-wkr" data-bez-body="' + bid + '">';
      wkrIds.forEach(function (wid) {
        var pl = wkrs[wid];
        var wr = countReported(pl, reported);
        var wopen = state.openWkr[wid] ? ' open' : '';
        var call = wkrCalls()[wid] || {};
        var doneHint = '';
        if (wr >= pl.length && completeWhen(call)) {
          doneHint = ' <span class="wb-art">seit ' + completeWhen(call) + '</span>';
        }
        html +=
          '<details class="wb-cov-nest" data-wkr="' + wid + '" data-bez-parent="' + bid + '"' +
          wopen + '>' +
          '<summary>' + escapeHtml(unitLabel('wkr', wid)) + ' ' +
          statusPill(wr, pl.length, 'WK') + ' ' + progressBar(wr, pl.length) +
          ' <span class="wb-art">' + wr + '/' + pl.length + '</span>' + doneHint +
          '</summary>' +
          '<div class="wb-cov-wb" data-wkr-body="' + wid + '"></div>' +
          '</details>';
      });
      html += '</div></details>';
    });
    html += '</div>';
    body.innerHTML = html;

    // Restore previously open WK precinct tables lazily
    body.querySelectorAll('details[data-wkr]').forEach(function (el) {
      if (el.open) fillWkrPrecincts(el, reported, tree);
      el.addEventListener('toggle', function () {
        var wid = el.getAttribute('data-wkr');
        state.openWkr[wid] = el.open;
        if (el.open) fillWkrPrecincts(el, reported, tree);
      });
    });
    body.querySelectorAll('details[data-bez]').forEach(function (el) {
      el.addEventListener('toggle', function () {
        state.openBezirk[el.getAttribute('data-bez')] = el.open;
      });
    });
  }

  function fillWkrPrecincts(el, reported, tree) {
    var wid = el.getAttribute('data-wkr');
    var bid = el.getAttribute('data-bez-parent');
    var slot = el.querySelector('[data-wkr-body="' + wid + '"]');
    if (!slot || slot.getAttribute('data-filled') === '1') return;
    var pl = (((tree[bid] || {}).wkr) || {})[wid] || [];
    // If tree was from a previous filter, fall back to full list
    if (!pl.length) {
      pl = ((state.data && state.data.precincts) || []).filter(function (p) {
        return p.wkr === wid && (!bid || p.bezirk === bid);
      });
    }
    slot.innerHTML = precinctTable(pl, reported);
    slot.setAttribute('data-filled', '1');
  }

  function precinctTable(plist, reported) {
    var rows = plist.slice().sort(function (a, b) {
      if (a.art !== b.art) return a.art < b.art ? 1 : -1; // W before B? W < B so W first with >
      return a.id < b.id ? -1 : 1;
    }).map(function (p) {
      var done = !!reported[p.id];
      return '<tr>' +
        '<td>' + escapeHtml(p.id) +
        ' <span class="wb-art">' + (p.art === 'B' ? 'Brief' : 'Urne') + '</span></td>' +
        '<td>' + statusPill(done ? 1 : 0, 1) + '</td></tr>';
    }).join('');
    return '<table class="wb-cov-table"><thead><tr>' +
      '<th>Wahlbezirk</th><th>Status</th></tr></thead><tbody>' +
      rows + '</tbody></table>';
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderStep() {
    var st = steps();
    if (!st.length) return;
    var i = Math.min(state.step, st.length - 1);
    var s = st[i];
    var v = viewForStep(s);
    if (!v) return;

    syncScopePanels();
    renderScopeButtons();
    renderSubnav();

    var note = $('wb-scenario-note');
    if (note) {
      note.textContent = state.land === 'be'
        ? 'Meldefluss: AfS-Zeiten'
        : (state.land === 'st'
          ? 'Meldefluss: simuliert (StaLA Live-CSV ab Wahlabend 2026)'
          : 'Meldefluss: simuliert (LAIV Live-CSV ab ~19 Uhr 2026)');
    }

    var landLabel = (state.data && state.data.state_label)
      || ({ be: 'Berlin', st: 'Sachsen-Anhalt', mv: 'Mecklenburg-Vorpommern' }[state.land] || state.land);
    var scopeTxt;
    if (state.scope === 'zweit') {
      scopeTxt = landLabel + ' · Zweitstimme';
    } else if (state.scope === 'lage') {
      scopeTxt = 'Szenarien & Parlamentsgröße';
    } else if (state.scope === 'land') {
      scopeTxt = 'Listen — wer kommt rein?';
    } else if (state.scope === 'wkr' && !state.unit) {
      scopeTxt = 'Wahlkreise — Übersicht';
    } else {
      scopeTxt = unitLabel(state.scope, state.unit);
    }
    if ((state.scope === 'zweit' || state.scope === 'land') && state.partyFocus) {
      scopeTxt += ' · ' + partyShort(state.partyFocus);
    }
    $('wb-scope-label').textContent = scopeTxt;
    if (state.scope === 'wkr' && !state.unit) {
      $('wb-frac-label').textContent =
        stepWhen(s) + ' · ' + s.n_reported + '/' + s.n_total + ' WB (Land)';
    } else {
      $('wb-frac-label').textContent =
        stepWhen(s) +
        (state.scope === 'wkr'
          ? ' · Gebiet ' + Math.round(v.frac_reported * 100) + '\u00a0% · ' +
            v.n_reported + '/' + v.n_total + ' WB'
          : ' · ' + v.n_reported + '/' + v.n_total + ' WB');
    }

    if (state.scope === 'wkr') {
      if (!state.unit) {
        $('wb-stat').innerHTML =
          '<div>Wahlkreis oben antippen.</div>';
      } else {
        var lead = null;
        var stCur = steps()[Math.min(state.step, steps().length - 1)];
        var reg = stCur && stCur.by_wkr && stCur.by_wkr[state.unit];
        if (reg) lead = reg.direct_pred || reg.leader_pred;
        var uLead = (lead && v.uncertainty) ? v.uncertainty[lead] : null;
        $('wb-stat').innerHTML =
          '<div>Anteilsfehler in diesem WK: <strong>' + fmtNum(v.mae_nowcast, 2) + '\u00a0PP</strong>' +
            ' <span class="wb-art">naiv ' + fmtNum(v.mae_naive, 2) + '\u00a0PP</span></div>' +
          (lead
            ? '<div>Führung <strong>' + partyShort(lead) + '</strong>: ' +
              fmtPct(v.nowcast[lead]) +
              (uLead != null ? ' ±\u00a0' + fmtNum(uLead, 1) + '\u00a0PP' : '') +
              (reg && reg.margin != null
                ? ' · Marge ' + fmtNum(reg.margin, 1) +
                  (marginUnc(reg) != null ? ' ±\u00a0' + fmtNum(marginUnc(reg), 1) : '') +
                  '\u00a0PP'
                : '') +
              '</div>'
            : '');
      }
    } else if (state.scope === 'land') {
      $('wb-stat').innerHTML =
        '<div>Fokus: <strong>Listenplätze</strong> — ' + listenModeLabel() + '</div>' +
        (hasBezirkslisten()
          ? ('<div>Entweder/oder: CDU/SPD/Linke = Bezirkslisten; ' +
            'Grüne/AfD/FDP/BSW = Landesliste.</div>')
          : '<div>Nur Landeslisten (keine Bezirkslisten wie in Berlin).</div>');
    } else if (state.scope === 'lage') {
      var size = s.entry_mc && s.entry_mc.size;
      var to = s.turnout || {};
      var landDone = isLandComplete(s);
      var lastEl = lastElectionRef();
      var lastToTxt = (lastEl && lastEl.turnout != null)
        ? ' <span class="wb-art">· ' + lastElectionShort(lastEl) + ': ' +
          fmtNum(lastEl.turnout, 1) + '\u00a0%</span>'
        : '';
      var lastSizeTxt = (lastEl && lastEl.parliament_size != null)
        ? ' <span class="wb-art">· ' + lastElectionShort(lastEl) + ': ' +
          lastEl.parliament_size + '</span>'
        : '';
      $('wb-stat').innerHTML =
        '<div>Wahlbeteiligung, Szenarien und <strong>Parlamentsgröße</strong></div>' +
        (to.nowcast != null
          ? '<div>Wahlbeteiligung: <strong>' + fmtNum(to.nowcast, 1) + '\u00a0%</strong>' +
            (to.uncertainty != null && to.uncertainty > 0
              ? ' ±\u00a0' + fmtNum(to.uncertainty, 1) + '\u00a0PP'
              : '') +
            (landDone && to.truth != null
              ? ' <span class="wb-art">· Endstand ' + fmtNum(to.truth, 1) + '\u00a0%</span>'
              : '') +
            lastToTxt +
            '</div>'
          : (lastToTxt
            ? '<div>Wahlbeteiligung letzte Wahl (' + lastElectionShort(lastEl) +
              '): <strong>' + fmtNum(lastEl.turnout, 1) + '\u00a0%</strong></div>'
            : '')) +
        (size
          ? '<div>Größe jetzt: <strong>' + size[1] + '</strong> Sitze ' +
            '<span class="wb-art">(p10 ' + size[0] + ' – p90 ' + size[2] + ')</span>' +
            lastSizeTxt + '</div>'
          : (lastEl && lastEl.parliament_size != null
            ? '<div>Parlamentsgröße letzte Wahl (' + lastElectionShort(lastEl) +
              '): <strong>' + lastEl.parliament_size + '</strong> Sitze</div>'
            : ''));
    } else {
      var top = PARTIES_ORDER.filter(function (p) { return p !== 'others'; })
        .slice()
        .sort(function (a, b) {
          return (v.nowcast[b] || 0) - (v.nowcast[a] || 0);
        })
        .slice(0, 3)
        .map(function (p) {
          var u = (v.uncertainty || {})[p];
          return partyShort(p) + '\u00a0' + fmtNum(v.nowcast[p], 1) +
            (u != null ? '±' + fmtNum(u, 1) : '');
        })
        .join(' · ');
      $('wb-stat').innerHTML =
        '<div><strong>Zweitstimme-Nowcast</strong> ' + top + '</div>' +
        '<div>Lerngewicht <strong>' +
          (s.learn_weight != null ? fmtNum(s.learn_weight, 2) : '—') +
          '</strong> · Repräsentativität <strong>' +
          (s.representativeness != null ? fmtNum(s.representativeness, 2) : '—') +
          '</strong>' +
          ' <span class="wb-art">· MAE/Treffer unter Eval</span></div>';
    }

    var labels = state.data.party_labels || {};
    var unc = v.uncertainty || {};
    var mainTable = $('wb-table');
    var mainHead = mainTable && mainTable.querySelector('thead');
    var mainBody = mainTable && mainTable.querySelector('tbody');
    if (mainHead && mainBody) {
      mainHead.innerHTML = '<tr><th></th>' + PARTIES_ORDER.map(function (p) {
        var col = PARTY_COLORS[p] || '#888';
        return '<th style="border-top:3px solid ' + col + ';">' +
          escapeHtml(labels[p] || p) + '</th>';
      }).join('') + '</tr>';
      var ncCells = PARTIES_ORDER.map(function (p) {
        var nc = v.nowcast[p];
        var u = unc[p];
        var range = (u != null && isFinite(u) && nc != null)
          ? ('<span class="wb-h-band">[' + fmtNum(nc - u, 1) + '–' +
            fmtNum(nc + u, 1) + ']</span>')
          : '';
        return '<td class="wb-h-nc">' + fmtPct(nc) + range + '</td>';
      }).join('');
      var pmCells = PARTIES_ORDER.map(function (p) {
        var u = unc[p];
        var band = (u != null && isFinite(u)) ? ('±\u00a0' + fmtNum(u, 1)) : '—';
        return '<td class="wb-h-pm">' + band + '</td>';
      }).join('');
      mainBody.innerHTML =
        '<tr><td>Nowcast</td>' + ncCells + '</tr>' +
        '<tr><td>±</td>' + pmCells + '</tr>';
    }

    $('wb-foot').textContent =
      ((state.data.model && state.data.model.description) || '') +
      ' Ebene: ' + (SCOPE_LABELS[state.scope] || state.scope) + '.' +
      ' Generiert: ' + formatBerlin(state.data.generated_at) + '.';

    renderHitsStrip();
    renderScenarioProbs();
    renderHitsTimeline();
    renderCallBanner();
    renderWkrRace();
    renderWkrWhy();
    renderEntry();
    renderCoverage();
    renderActual();
    renderEval();
    drawShareChart();
    if (state.scope === 'wkr') drawWkrRaceCharts();
    if (state.scope === 'zweit') drawChart();
    if (state.scope === 'lage') {
      drawTurnoutChart();
      drawSizeChart();
    }
    // Re-draw once after layout so canvas width is correct (bands included)
    requestAnimationFrame(function () {
      drawShareChart();
      if (state.scope === 'wkr') drawWkrRaceCharts();
      if (state.scope === 'zweit') drawChart();
      if (state.scope === 'lage') {
      drawTurnoutChart();
      drawSizeChart();
    }
    });
  }

  function bind() {
    var tabs = $('wb-scope-tabs');
    if (tabs) {
      tabs.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-scope]');
        if (!btn || !tabs.contains(btn)) return;
        setScope(btn.getAttribute('data-scope'));
      });
    }
    var sub = $('wb-subnav');
    if (sub) {
      sub.addEventListener('input', function (e) {
        if (e.target.id === 'wb-wkr-search') {
          state.wkrSearch = e.target.value;
          applyWkrSearchFilter();
        }
      });
      sub.addEventListener('keydown', function (e) {
        if (e.target.id !== 'wb-wkr-search' || e.key !== 'Enter') return;
        e.preventDefault();
        var first = sub.querySelector('.wb-wkr-tile:not([hidden])');
        if (first) openWkr(first.getAttribute('data-wkr-link'));
      });
      sub.addEventListener('click', function (e) {
        var partyBtn = e.target.closest('[data-party]');
        if (partyBtn && sub.contains(partyBtn)) {
          var p = partyBtn.getAttribute('data-party') || '';
          state.partyFocus = p || null;
          renderStep();
          return;
        }
        var unitBtn = e.target.closest('[data-unit]');
        if (unitBtn && sub.contains(unitBtn)) {
          state.unit = unitBtn.getAttribute('data-unit') || '';
          renderStep();
        }
      });
    }
    var slider = $('wb-slider');
    if (slider) {
      slider.addEventListener('input', function (e) {
        state.step = Number(e.target.value);
        renderStep();
      });
    }
    window.addEventListener('resize', function () {
      drawShareChart();
      if (state.scope === 'wkr') drawWkrRaceCharts();
      if (state.scope === 'zweit') drawChart();
      if (state.scope === 'lage') {
      drawTurnoutChart();
      drawSizeChart();
    }
    });
    window.addEventListener('zweitstimme-logo-ready', function () {
      drawShareChart();
      if (state.scope === 'wkr') drawWkrRaceCharts();
      if (state.scope === 'zweit') drawChart();
      if (state.scope === 'lage') {
        drawTurnoutChart();
        drawSizeChart();
      }
    });
    var evalRoot = $('wb-eval-root');
    if (evalRoot) {
      evalRoot.addEventListener('toggle', function () {
        if (!evalRoot.open || state.scope !== 'zweit') return;
        requestAnimationFrame(function () {
          drawChart();
          renderDirektMilestones();
        });
      });
    }
  }

  function init() {
    if (!$('wahlabend-root')) return;
    state.land = landFromQuery();
    $('wb-stat').innerHTML = '<span class="wb-loading">Lade Auswertung …</span>';
    document.querySelectorAll('[data-wb-land]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-wb-land') === state.land);
      btn.addEventListener('click', function () {
        var next = btn.getAttribute('data-wb-land');
        if (!next || next === state.land) return;
        var url = new URL(window.location.href);
        url.searchParams.set('state', next);
        window.location.href = url.toString();
      });
    });
    fetch(dataUrl(replayFileForLand(state.land)))
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        state.data = data;
        state._precinctMap = null;
        var ids = Object.keys(data.scenarios || {});
        if (ids.indexOf('actual_times') >= 0) state.scenario = 'actual_times';
        else if (ids.indexOf('random') >= 0) state.scenario = 'random';
        else state.scenario = ids[0] || 'random';
        state.scope = 'zweit';
        state.unit = (data.geo_units && data.geo_units.land && data.geo_units.land[0])
          ? data.geo_units.land[0].id
          : (state.land === 'be' ? 'BE' : state.land.toUpperCase());
        state.partyFocus = null;
        var n = steps().length;
        var slider = $('wb-slider');
        if (slider) {
          slider.max = String(Math.max(0, n - 1));
          slider.value = String(Math.min(10, Math.max(0, n - 1)));
          state.step = Number(slider.value);
        }
        bind();
        renderStep();
      })
      .catch(function (err) {
        var stat = $('wb-stat');
        if (stat) {
          stat.innerHTML =
            '<span class="wb-err">Auswertung konnte nicht geladen werden: ' +
            String(err.message || err) + '</span>';
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
