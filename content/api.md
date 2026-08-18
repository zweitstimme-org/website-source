---
title: "Forecast API"
layout: "page"
url: "/docs/api"
summary: "Versionierte Forecast API: Bundestag, Landtage und Aktuelle Stimmung"
---

Öffentliche JSON-API für **Wahlprognosen**, **Posterior-Draws** und die **Aktuelle Stimmung**. Keine Authentifizierung. Nur `GET`.

Es gibt außerdem eine separate **Polling API** für Einzelumfragen unter [api.zweitstimme.org](https://api.zweitstimme.org/) (Docs: [api.zweitstimme.org/docs](https://api.zweitstimme.org/docs)). **Diese Seite** dokumentiert die **Forecast API** unter [`zweitstimme.org/api`](/api/index.json).

**Doku:** `/docs/api/`  
**Discovery:** [`/api/index.json`](/api/index.json)  
**Basis-URL:** `https://zweitstimme.org`  
**CORS:** `Access-Control-Allow-Origin: *`

---

## Quickstart

```bash
# API discovery
curl -s https://zweitstimme.org/api/index.json | jq .

# Active state forecasts in the current window
curl -s https://zweitstimme.org/api/v2/state/index.json | jq .states

# One state forecast
curl -s https://zweitstimme.org/api/v2/state/st.json | jq '.election, .data.metadata, .data.parties'

# Raw posterior draws for the same forecast
curl -s https://zweitstimme.org/api/v2/state/st/draws.json   | jq '{generated_at, last_update: .data.last_update, n_draws: .data.n_draws, draw0: .data.draws[0]}'

# Current federal Stimmung
curl -s https://zweitstimme.org/api/v2/stimmung/federal/current.json | jq '.election, .data.parties'
```

```js
const res = await fetch("https://zweitstimme.org/api/v2/state/st.json");
const { election, data } = await res.json();
console.log(election.name, data.metadata.last_poll_date, data.parties);
```

```python
import json, urllib.request
with urllib.request.urlopen("https://zweitstimme.org/api/v2/state/st/draws.json") as f:
    payload = json.load(f)
print(payload["election"]["name"], payload["data"]["n_draws"])
```

---

## Versioning

The current layout is **transitional**:

- **`v1`** contains the older federal forecast contract under `/api/v1/federal/...`
- **`v2`** contains the newer enveloped endpoints for state forecasts, draws, and Stimmung
- legacy root paths like `/forecast.json` and `/pred_probabilities.json` redirect or alias into `v1`

So today the version numbers are partly historical and partly structural. Future cleanup may make this more uniform.

## Migration Layout

A cleaner long-term layout would keep backward compatibility while making version numbers mean **contract generation**, not **scope**.

### Recommended semantics

- **unversioned root paths** = legacy aliases only
- **`v1`** = old / legacy contract
- **`v2`** = newer, consistent enveloped contract
- **scope** belongs in the path (`federal`, `state`, `stimmung`), not in the version number

### Backward-compatible path plan

| Role | Path pattern | Notes |
|---|---|---|
| Legacy aliases | `/forecast.json`, `/pred_probabilities.json`, `/forecast_districts.json` | Keep as redirects or content aliases for older clients |
| Legacy federal under versioned home | `/api/v1/federal/...` | Mirrors the older federal contract |
| New federal API | `/api/v2/federal/...` | Future home for a cleaner federal forecast contract |
| New state API | `/api/v2/state/...` | Already close to the desired structure |
| New state draws API | `/api/v2/state/{code}/draws.json` | Raw posterior simulations |
| New Stimmung API | `/api/v2/stimmung/...` | Already matches the desired shape |

### Suggested migration phases

1. **Keep current clients working**
   - Leave root aliases in place
   - Leave `/api/v1/federal/...` untouched
   - Leave current `/api/v2/state/...` and `/api/v2/stimmung/...` untouched

2. **Add a new federal `v2` surface**
   - Introduce `/api/v2/federal/index.json`
   - Add a consistent enveloped federal forecast payload
   - Optionally add `/api/v2/federal/draws.json` if federal draws are to be supported the same way

3. **Mark `v1` as legacy in docs**
   - Keep it stable
   - Avoid adding new concepts only to `v1`
   - Point new integrations to `v2` first

4. **Eventually simplify discovery**
   - `/api/index.json` should describe `v1` as legacy and `v2` as preferred
   - The docs can then say: use `v2` unless you specifically need the old federal contract

### Practical end state

In that end state, consumers can infer:

- **`v1`** = older compatibility layer
- **`v2`** = modern API contract
- **`federal` / `state` / `stimmung`** = resource namespace

That makes the API easier to explain, easier to document, and easier to extend without teaching users that version numbers also encode product scope.

---

---

## Which Endpoint Do I Need?

| Use case | Start here |
|---|---|
| Discover what exists | [`/api/index.json`](/api/index.json) |
| Legacy / older federal forecast contract | [`/api/v1/federal/index.json`](/api/v1/federal/index.json) |
| Active state forecasts | [`/api/v2/state/index.json`](/api/v2/state/index.json) |
| Raw state posterior draws | `/api/v2/state/{code}/draws.json` |
| Current federal Stimmung | [`/api/v2/stimmung/federal/current.json`](/api/v2/stimmung/federal/current.json) |
| Full federal Stimmung time series | [`/api/v2/stimmung/federal.json`](/api/v2/stimmung/federal.json) |
| State Stimmung catalog | [`/api/v2/stimmung/state/index.json`](/api/v2/stimmung/state/index.json) |

**Forecast vs. Stimmung**

- **Forecast** = model output for election day: point estimates, uncertainty intervals, scenario probabilities, and optionally posterior draws.
- **Stimmung** = smoothed latent support by calendar day. No seat scenarios.
- `election` always names the **next relevant election for that scope**; it is not itself the forecast timestamp.

---

## Common Response Envelope

Versioned endpoints use a common top-level structure:

```json
{
  "api_version": "v2",
  "generated_at": "2026-08-18T08:06:53Z",
  "election": {
    "id": "st_2026-09-06",
    "name": "Landtagswahl Sachsen-Anhalt",
    "date": "2026-09-06",
    "scope": "state",
    "state_code": "ST",
    "date_is_estimated": false
  },
  "data": {}
}
```

| Field | Type | Meaning |
|---|---|---|
| `api_version` | string | Contract generation, currently `"v1"` or `"v2"` |
| `generated_at` | string | API build time in ISO-8601 UTC |
| `election` | object | Which election this payload refers to |
| `data` | object or array | Endpoint-specific payload |
| `as_of` | string, optional | Used by Stimmung endpoints |
| `archived` | boolean, optional | Present on archive responses |

Always inspect `election`. The same path can refer to a different election in a later cycle.

---

## Try-It Checks

Use these to sanity-check clients quickly.

```bash
# Does the endpoint exist right now?
curl -i https://zweitstimme.org/api/v2/state/st.json

# Show the active state codes currently in the forecast window
curl -s https://zweitstimme.org/api/v2/state/index.json | jq -r '.states[].state_code'

# Check whether draws are available for each active state
curl -s https://zweitstimme.org/api/v2/state/index.json   | jq -r '.states[] | [.state_code, .path, (.draws // "-")] | @tsv'

# Extract one day's Stimmung from the full series
curl -s https://zweitstimme.org/api/v2/stimmung/federal.json   | jq '.data.by_date["2026-08-01"]'
```

---

## v1 Federal Forecast API

`v1` is the older federal forecast surface. Canonical entry point: [`/api/v1/federal/index.json`](/api/v1/federal/index.json).

### Endpoints

| Method | Path | `data` payload |
|---|---|---|
| GET | [`/api/v1/federal/index.json`](/api/v1/federal/index.json) | Endpoint catalog and legacy redirects |
| GET | [`/api/v1/federal/forecast.json`](/api/v1/federal/forecast.json) | Array of party forecast rows |
| GET | [`/api/v1/federal/pred_probabilities.json`](/api/v1/federal/pred_probabilities.json) | Hurdles, coalitions, largest party probabilities |
| GET | [`/api/v1/federal/forecast_districts.json`](/api/v1/federal/forecast_districts.json) | District-level first/second-vote forecast |
| GET | [`/api/v1/federal/archive/index.json`](/api/v1/federal/archive/index.json) | Archived run catalog |
| GET | `/api/v1/federal/archive/{YYYY-MM-DD}.json` | One archived federal forecast |

### Party rows in `forecast.json`

| Field | Unit | Meaning |
|---|---|---|
| `name`, `name_eng` | — | Party label |
| `_row` | — | Party code such as `cdu`, `afd` |
| `value`, `y` | percentage points | Point estimate |
| `low`, `high` | percentage points | Approx. 83% interval |
| `low95`, `high95` | percentage points | Approx. 95% interval |
| `color` | hex | UI color |

### `pred_probabilities.json`

Probabilities are stored as **shares from 0 to 1**, not percentages.

| Prefix | Example | Meaning |
|---|---|---|
| `hurdle_*` | `hurdle_fdp` | Party clears 5% threshold |
| `maj_*` | `maj_cdu_csu_spd` | Coalition wins seat majority |
| `prob_*_largest` | `prob_cdu_largest` | Party is largest |

### Legacy root aliases

| Legacy path | Canonical `v1` path |
|---|---|
| `/forecast.json` | `/api/v1/federal/forecast.json` |
| `/pred_probabilities.json` | `/api/v1/federal/pred_probabilities.json` |
| `/forecast_districts.json` | `/api/v1/federal/forecast_districts.json` |

For older clients, note that the root paths now resolve to an **enveloped** payload, not a bare array.

---

## v2 State Forecast API

Active only within roughly the **90-day forecast window** before election day. Outside the window, state forecast endpoints return `404`. After election day, the last forecast is moved to the archive.

### Endpoints

| Method | Path | Meaning |
|---|---|---|
| GET | [`/api/v2/state/index.json`](/api/v2/state/index.json) | Active states and archive link |
| GET | `/api/v2/state/{code}.json` | One active state forecast |
| GET | `/api/v2/state/{code}/draws.json` | Raw posterior draws for that forecast |
| GET | [`/api/v2/state/archive/index.json`](/api/v2/state/archive/index.json) | Archived state forecast catalog |
| GET | `/api/v2/state/archive/{code}_{YYYY-MM-DD}.json` | One archived state forecast |
| GET | `/api/v2/state/archive/{code}_{YYYY-MM-DD}/draws.json` | Draws for one archived state forecast |

`{code}` is lowercase state shorthand such as `st`, `be`, `mv`.

District, candidate, and preview-only Wahlabend assets are **not** part of this public API.

### Active state catalog

Example fields from [`/api/v2/state/index.json`](/api/v2/state/index.json):

```json
{
  "api_version": "v2",
  "generated_at": "2026-08-18T08:06:53Z",
  "forecast_window_days": 90,
  "states": [
    {
      "state_code": "ST",
      "path": "/api/v2/state/st.json",
      "draws": "/api/v2/state/st/draws.json",
      "active": true,
      "election": {
        "id": "st_2026-09-06",
        "name": "Landtagswahl Sachsen-Anhalt",
        "date": "2026-09-06"
      }
    }
  ]
}
```

Prefer the index over hardcoding active state codes.

### Forecast payload: `/api/v2/state/{code}.json`

```json
{
  "metadata": {
    "state_code": "ST",
    "election_id": "st_2026-09-06",
    "election_name": "Landtagswahl Sachsen-Anhalt",
    "election_date": "2026-09-06",
    "last_poll_date": "2026-08-16",
    "asof_date": "2026-08-16",
    "last_update": "2026-08-18T08:06:12Z",
    "lead_horizon_days": 19,
    "model": "state-models lr 19_polls ...",
    "n_draws": 4000,
    "draws_path": "/api/v2/state/st/draws.json"
  },
  "parties": [
    { "party": "CDU", "party_code": "cdu", "fit": 23, "low": 16, "high": 29 }
  ],
  "scenarios": {
    "items": [
      { "id": "largest_party_afd", "category": "largest_party", "probability": 97 }
    ]
  }
}
```

| Field | Unit | Meaning |
|---|---|---|
| `metadata.last_poll_date` | date | Newest poll included in the forecast |
| `metadata.asof_date` | date | Forecast input date anchor |
| `metadata.last_update` | timestamp | When this forecast was computed / exported |
| `metadata.lead_horizon_days` | integer | Days until election used in the model |
| `metadata.n_draws` | integer | Number of posterior draws behind summary and scenarios |
| `metadata.draws_path` | path | Link to draws endpoint |
| `parties[].fit` | percentage points | Point estimate |
| `parties[].low`, `parties[].high` | percentage points | Approx. 83% interval |
| `scenarios.items[].probability` | percent 0-100 | Scenario probability |

### Draws payload: `/api/v2/state/{code}/draws.json`

These are the same simulations that produce the summary forecast and scenario probabilities. They are regenerated whenever the state forecast is rerun.

```json
{
  "api_version": "v2",
  "generated_at": "2026-08-18T08:06:53Z",
  "election": {
    "id": "st_2026-09-06",
    "scope": "state",
    "state_code": "ST"
  },
  "data": {
    "n_draws": 4000,
    "unit": "share",
    "last_update": "2026-08-18T08:06:12Z",
    "asof_date": "2026-08-16",
    "last_poll_date": "2026-08-16",
    "parties": ["cdu", "spd", "gru", "fdp", "lin", "afd", "bsw", "oth"],
    "draws": [
      {
        "cdu": 0.23,
        "spd": 0.07,
        "gru": 0.05,
        "fdp": 0.03,
        "lin": 0.13,
        "afd": 0.41,
        "bsw": 0.04,
        "oth": 0.04
      }
    ]
  }
}
```

| Field | Meaning |
|---|---|
| `unit` | `"share"` means 0-1 vote shares, not percentages |
| `n_draws` | Number of simulations |
| `last_update` | Forecast-run timestamp in UTC |
| `asof_date`, `last_poll_date` | Timing metadata repeated for convenient downstream use |
| `parties` | Draw column order / available party codes |
| `draws[]` | One normalized simulation per row |
| envelope `generated_at` | API publish time, distinct from model run time |

### Useful test calls

```bash
# One-line metadata check
curl -s https://zweitstimme.org/api/v2/state/st.json   | jq '.data.metadata | {state_code, last_poll_date, last_update, n_draws, draws_path}'

# First draw and timestamps
curl -s https://zweitstimme.org/api/v2/state/st/draws.json   | jq '{generated_at, last_update: .data.last_update, draw0: .data.draws[0]}'

# Compare summary estimate with draw availability across active states
curl -s https://zweitstimme.org/api/v2/state/index.json   | jq -r '.states[] | [.state_code, .path, (.draws // "-")] | @tsv'
```

### Archive policy

- After election day, active files move to `/api/v2/state/archive/...`
- Archives begin when this API began publishing them; there is no historical backfill for older cycles
- Archive responses may include `"archived": true`
- Draws move with the forecast: `/api/v2/state/archive/{code}_{YYYY-MM-DD}/draws.json`

---

## v2 Stimmung API

Stimmung is a Kalman-smoothed daily latent support series. Days without a new poll are still present.

### Endpoints

| Method | Path | Meaning |
|---|---|---|
| GET | [`/api/v2/stimmung/federal/current.json`](/api/v2/stimmung/federal/current.json) | Federal current day |
| GET | [`/api/v2/stimmung/federal.json`](/api/v2/stimmung/federal.json) | Full federal history |
| GET | [`/api/v2/stimmung/state/index.json`](/api/v2/stimmung/state/index.json) | State catalog |
| GET | `/api/v2/stimmung/state/{code}/current.json` | One state, current day |
| GET | `/api/v2/stimmung/state/{code}.json` | One state, full history |

### Current payload example

```json
{
  "as_of": "2026-08-11",
  "parties": {
    "CDU/CSU": 21.0,
    "AfD": 27.9,
    "SPD": 12.1,
    "GRÜNE": 14.2,
    "LINKE": 11.5,
    "BSW": 2.9,
    "FDP": 4.6,
    "Sonstige": 5.8
  },
  "uncertainty_low": { "CDU/CSU": 20.2, "AfD": 27.1 },
  "uncertainty_high": { "CDU/CSU": 21.8, "AfD": 28.7 },
  "trends": { "CDU/CSU": -0.2, "AfD": 0.3 },
  "active_parties": ["CDU/CSU", "AfD", "SPD", "GRÜNE", "LINKE", "BSW", "FDP"]
}
```

| Field | Meaning |
|---|---|
| `as_of` | Calendar date represented by this payload |
| `parties` | Support in percentage points |
| `uncertainty_*` | Uncertainty band around the latent estimate |
| `trends` | Short-run movement in percentage points |
| `active_parties` | Parties currently treated as active in the model |

### Read a historical day

There is no `?date=` query parameter because the API is statically hosted. Load the series and index locally:

```js
const payload = await fetch(
  "https://zweitstimme.org/api/v2/stimmung/federal.json"
).then((r) => r.json());

const day = payload.data.by_date["2026-08-01"];
console.log(day.parties);
```

---

## Errors, caching, and availability

| Situation | Behavior |
|---|---|
| Unknown path | `404` |
| No active state forecast | `404` |
| State outside forecast window | state forecast missing, Stimmung still available |
| Deploy or maintenance | files may briefly lag or disappear |

There is no auth layer and no custom application rate limiting beyond normal CDN / hosting behavior. Cache responsibly using `ETag`, `Last-Modified`, or your own TTL.

---

## Internal `/data/` paths

The website UI also reads `/data/forecast_state_*.json`, `/data/stimmung_*.json`, and related assets. Those are **internal implementation paths**, not a stable public contract. Integrations should use `/api/...`.

---

## Usage terms

- Non-commercial use
- Source attribution: **zweitstimme.org**
- No guarantee of availability, completeness, or correctness
- Forecasts and Stimmung are model outputs, not official results
