/**
 * Poll mapping + simple aggregation helpers (browser-side).
 *
 * Designed to consume pollingapi-v2 `/v1/polls` items with `results[]` rows.
 * Exposes a single global: `window.pollsMapperAggregator`.
 */

(function () {
  const CORE_ORDER = ['CDU/CSU', 'AfD', 'SPD', 'GRÜNE', 'LINKE', 'BSW', 'FDP', 'FW', 'SSW', 'PIRATEN', 'REP', 'Sonstige'];

  // Normalize incoming party labels from API or website code into a consistent display set.
  const NORMALIZE = {
    'CDU': 'CDU/CSU',
    'CSU': 'CDU/CSU',
    'cdu': 'CDU/CSU',
    'csu': 'CDU/CSU',
    'Grüne': 'GRÜNE',
    'gruene': 'GRÜNE',
    'grüne': 'GRÜNE',
    'Linke': 'LINKE',
    'PDS': 'LINKE',
    'Linke.PDS': 'LINKE',
    'FW': 'FW',
    'Freie Wähler': 'FW',
    'BVB/FW': 'FW',
    'Piraten': 'PIRATEN',
    'BSW': 'BSW',
    'Sonstige': 'Sonstige',
    'REP': 'REP',
    'SSW': 'SSW',
  };

  function normalizePartyName(name) {
    if (!name) return name;
    return NORMALIZE[name] || NORMALIZE[String(name).trim()] || name;
  }

  function abbreviatePartyName(name) {
    if (!name) return name;
    const n = normalizePartyName(name);
    if (n === 'Freie Wähler') return 'FW';
    return n;
  }

  function resultsArrayToPartyMap(results) {
    const out = {};
    if (!Array.isArray(results)) return out;
    for (const r of results) {
      if (!r || typeof r !== 'object') continue;
      const partyNameRaw = r.party_short_name || r.party_name;
      const pct = r.percentage;
      if (!partyNameRaw) continue;
      if (pct === null || pct === undefined) continue;
      const party = normalizePartyName(partyNameRaw);
      const val = Number(pct);
      if (!Number.isFinite(val)) continue;
      out[party] = val;
    }
    return out;
  }

  // Consolidate to tracked parties; compute Sonstige residual if missing.
  function consolidatePartyMap(partyMap) {
    const out = {};
    let sum = 0;

    for (const p of CORE_ORDER) {
      if (p === 'Sonstige') continue;
      if (partyMap[p] === null || partyMap[p] === undefined) continue;
      const v = Number(partyMap[p]);
      if (!Number.isFinite(v)) continue;
      out[p] = v;
      sum += v;
    }

    // Sonstige: use explicit if provided, otherwise residual.
    const explicit = partyMap['Sonstige'];
    if (explicit !== null && explicit !== undefined && Number.isFinite(Number(explicit))) {
      out['Sonstige'] = Number(explicit);
    } else if (sum > 0) {
      out['Sonstige'] = Math.max(0, Math.round((100 - sum) * 10) / 10);
    }

    return out;
  }

  // Simple recency weight: exponential decay with half-life ~14 days.
  function recencyWeight(daysOld) {
    const halfLife = 14;
    return Math.pow(0.5, daysOld / halfLife);
  }

  // Aggregate polls into a weighted mean for each party.
  function aggregatePolls(polls, { now = new Date(), maxPolls = 400 } = {}) {
    const items = (Array.isArray(polls) ? polls : []).slice(0, maxPolls);
    const numerators = {};
    const denominators = {};

    for (const poll of items) {
      if (!poll || !poll.publish_date) continue;
      const d = new Date(poll.publish_date + 'T00:00:00Z');
      const daysOld = Math.max(0, Math.floor((now.getTime() - d.getTime()) / (1000 * 3600 * 24)));

      const wRec = recencyWeight(daysOld);
      const n = Number(poll.respondents);
      const wN = Number.isFinite(n) && n > 0 ? Math.sqrt(n / 1000) : 1;
      const w = wRec * wN;

      const mapped = consolidatePartyMap(resultsArrayToPartyMap(poll.results));
      for (const [party, value] of Object.entries(mapped)) {
        const v = Number(value);
        if (!Number.isFinite(v)) continue;
        numerators[party] = (numerators[party] || 0) + w * v;
        denominators[party] = (denominators[party] || 0) + w;
      }
    }

    const out = {};
    for (const party of Object.keys(numerators)) {
      const denom = denominators[party] || 0;
      if (denom <= 0) continue;
      out[party] = Math.round((numerators[party] / denom) * 10) / 10;
    }

    // Ensure Sonstige exists if others exist
    if (Object.keys(out).length) {
      const sum = Object.entries(out).reduce((acc, [k, v]) => (k === 'Sonstige' ? acc : acc + v), 0);
      if (!('Sonstige' in out)) out['Sonstige'] = Math.max(0, Math.round((100 - sum) * 10) / 10);
    }

    return out;
  }

  window.pollsMapperAggregator = {
    CORE_ORDER,
    normalizePartyName,
    abbreviatePartyName,
    resultsArrayToPartyMap,
    consolidatePartyMap,
    aggregatePolls,
  };
})();

