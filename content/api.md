---
title: "Forecast API"
layout: "page"
url: "/docs/api"
summary: "Versionierte Forecast API: Bundestag, Landtage und Aktuelle Stimmung"
---

Öffentliche, versionierte JSON-API für **Wahlprognosen** und die **Aktuelle Stimmung** (Kalman-Zeitreihe). Keine Authentifizierung. Nur `GET`.

Dies ist **nicht** die Polling API (Einzelumfragen) — die bleibt ein eigener Dienst.

**Diese Seite** (Doku) liegt unter `/docs/api/`. Die maschinenlesbare Discovery ist [`/api/index.json`](/api/index.json) (JSON-Katalog unter `/api/…`).

---

## Schnellstart

```bash
# Was ist verfügbar?
curl -s https://zweitstimme.org/api/index.json | jq .

# Landtag Sachsen-Anhalt — Prognose
curl -s https://zweitstimme.org/api/v2/state/st.json | jq '.election, .data.parties'

# Bund — Aktuelle Stimmung (heute)
curl -s https://zweitstimme.org/api/v2/stimmung/federal/current.json | jq '.election, .data.parties'
```

```js
const r = await fetch("https://zweitstimme.org/api/v2/state/st.json");
const { election, data } = await r.json();
console.log(election.name, data.parties);
```

```python
import urllib.request, json
with urllib.request.urlopen("https://zweitstimme.org/api/v2/state/st.json") as f:
    payload = json.load(f)
print(payload["election"]["name"], payload["data"]["parties"])
```

**Basis-URL:** `https://zweitstimme.org`  
**Discovery:** [`/api/index.json`](/api/index.json)  
**CORS:** `Access-Control-Allow-Origin: *`

---

## Welche API brauche ich?

| Ziel | Version | Einstieg |
|------|---------|----------|
| Bundestag-Prognose (Zweitstimme, Szenarien, Wahlkreise) | **v1** | [`/api/v1/federal/index.json`](/api/v1/federal/index.json) |
| Landtag-Prognose (ST, BE, MV, …) | **v2** | [`/api/v2/state/index.json`](/api/v2/state/index.json) |
| Tägliche „Aktuelle Stimmung“ (auch ohne neue Umfrage) | **v2** | [`/api/v2/stimmung/federal/current.json`](/api/v2/stimmung/federal/current.json) |
| Vergangene Prognose nach dem Wahltag | Archiv | `/api/v1/federal/archive/…`, `/api/v2/state/archive/…` |

**Prognose vs. Stimmung**

- **Prognose** = Modellergebnis für den Wahltag (Unsicherheitsintervalle, Szenario-Wahrscheinlichkeiten). Nur aktiv im Fenster von ca. **90 Tagen** vor der Wahl.
- **Stimmung** = geglättete Umfrageunterstützung **heute / an Tag D** (Kalman). Keine Sitzprognose. `election` nennt die *nächste* Wahl für den Scope, nicht „Prognose für den Wahltag“.

---

## Antwort-Envelope

Jede versionierte Antwort hat dieselbe Hülle:

```json
{
  "api_version": "v2",
  "generated_at": "2026-08-11T16:03:04Z",
  "election": {
    "id": "st_2026-09-06",
    "name": "Landtagswahl Sachsen-Anhalt",
    "date": "2026-09-06",
    "scope": "state",
    "state_code": "ST",
    "date_is_estimated": false
  },
  "data": { }
}
```

| Feld | Typ | Bedeutung |
|------|-----|-----------|
| `api_version` | string | `"v1"` oder `"v2"` |
| `generated_at` | string (ISO-8601 UTC) | Zeitpunkt der API-Erzeugung |
| `election.id` | string | Stabil, z. B. `bund_2025-02-23`, `st_2026-09-06` |
| `election.name` | string | Anzeigename |
| `election.date` | string | Wahltag `YYYY-MM-DD` |
| `election.scope` | string | `"federal"` \| `"state"` |
| `election.state_code` | string \| null | z. B. `"ST"`; bei Bund `null` |
| `election.date_is_estimated` | boolean | `true`, wenn der Termin geschätzt ist |
| `data` | object \| array | Eigentliche Nutzlast |
| `as_of` | string (optional) | Bei Stimmung: Stichtag der Werte |
| `archived` | boolean (optional) | `true` bei Archiv-Antworten |

**Immer** `election` auswerten — dieselbe URL kann über Wahlzyklen hinweg verschiedene Wahlen meinen (nach Archivierung / neuem Fenster).

---

## v1 — Bundestag

Kanonische Pfade unter `/api/v1/federal/`. Index: [`/api/v1/federal/index.json`](/api/v1/federal/index.json).

### Endpunkte

| Methode | Pfad | `data`-Inhalt |
|---------|------|----------------|
| GET | [`/api/v1/federal/forecast.json`](/api/v1/federal/forecast.json) | Array: Zweitstimmen je Partei |
| GET | [`/api/v1/federal/pred_probabilities.json`](/api/v1/federal/pred_probabilities.json) | Array/Objekt: Hürden, Mehrheiten, stärkste Kraft |
| GET | [`/api/v1/federal/forecast_districts.json`](/api/v1/federal/forecast_districts.json) | Array: 299 Wahlkreise (Erst- + Zweitstimme) |
| GET | [`/api/v1/federal/archive/index.json`](/api/v1/federal/archive/index.json) | Katalog archivierter BTW-Läufe |
| GET | `/api/v1/federal/archive/{YYYY-MM-DD}.json` | Eingefrorene Prognose einer BTW |

### `forecast.json` — Felder je Partei

| Feld | Einheit | Bedeutung |
|------|---------|-----------|
| `name` / `name_eng` | — | Anzeigename |
| `_row` | — | Kurzcode (`cdu`, `afd`, …) |
| `value` / `y` | %-Punkte | Punktschätzung |
| `low` / `high` | %-Punkte | ca. **83 %-**Intervall |
| `low95` / `high95` | %-Punkte | ca. **95 %-**Intervall |
| `color` | Hex | UI-Farbe |

Beispiel (gekürzt):

```json
{
  "api_version": "v1",
  "election": {
    "id": "bund_2025-02-23",
    "name": "Bundestagswahl",
    "date": "2025-02-23",
    "scope": "federal",
    "state_code": null
  },
  "data": [
    {
      "value": 29.3,
      "low": 24.2,
      "high": 34.5,
      "low95": 20.9,
      "high95": 38.5,
      "name": "CDU/CSU",
      "_row": "cdu"
    }
  ]
}
```

### `pred_probabilities.json`

Wahrscheinlichkeiten als **Anteil 0–1** (nicht Prozent). Typische Schlüssel:

| Präfix | Beispiel | Bedeutung |
|---------|----------|-----------|
| `hurdle_*` | `hurdle_fdp` | Partei schafft die 5 %-Hürde (inkl. Grundmandatslogik wo modelliert) |
| `maj_*` | `maj_cdu_csu_spd` | Koalition hat Sitzmehrheit |
| `prob_*_largest` | `prob_cdu_largest` | Partei ist stärkste Kraft |

### Legacy-Root (Migration)

Alte Root-URLs zeigen auf v1 (Redirect bzw. Content-Alias mit Envelope):

| Alt | Neu |
|-----|-----|
| `/forecast.json` | `/api/v1/federal/forecast.json` |
| `/pred_probabilities.json` | `/api/v1/federal/pred_probabilities.json` |
| `/forecast_districts.json` | `/api/v1/federal/forecast_districts.json` |

**Breaking für alte Clients:** Unter dem Root-Pfad steht nicht mehr das nackte Array, sondern `{ api_version, election, data }`. Entweder dem Redirect auf `/api/v1/…` folgen und `data` lesen, oder lokal `payload.data ?? payload` nutzen.

Weitere Legacy-Dateien (ohne Envelope): `/last_updated.json`, `/draws.json`, `/pred_vacant.json`, `/interactive_*.html`.

---

## v2 — Landtagsprognosen

Aktive Prognosen nur im **~90-Tage-Fenster** vor dem Wahltag. Außerhalb des Fensters fehlt der State-Endpunkt (404); nach dem Wahltag wandert die Datei ins Archiv.

### Endpunkte

| Methode | Pfad | Inhalt |
|---------|------|--------|
| GET | [`/api/v2/state/index.json`](/api/v2/state/index.json) | Aktive Länder, `forecast_window_days`, Link zum Archiv |
| GET | `/api/v2/state/{code}.json` | Prognose eines Landes (`st`, `be`, `mv`, …) |
| GET | `/api/v2/state/{code}/draws.json` | Posterior-Simulationen (eine Zeile je Draw, Anteile 0–1) |
| GET | [`/api/v2/state/archive/index.json`](/api/v2/state/archive/index.json) | Archiv-Katalog |
| GET | `/api/v2/state/archive/{code}_{YYYY-MM-DD}.json` | Eingefrorene Prognose |

`{code}` = kleines Landeskürzel (`st`, nicht `ST`).

Wahlkreis- und Kandidaten-JSON sind **Preview-only** und nicht Teil dieser öffentlichen API.

### `data` bei `/api/v2/state/{code}.json`

```json
{
  "metadata": {
    "state_code": "ST",
    "election_id": "st_2026-09-06",
    "election_name": "Landtagswahl Sachsen-Anhalt",
    "election_date": "2026-09-06",
    "last_poll_date": "2026-08-10",
    "asof_date": "2026-08-10",
    "lead_horizon_days": 27,
    "model": "state-models lr 27_polls …",
    "shares_normalized_to_100": true
  },
  "parties": [
    { "party": "CDU", "party_code": "cdu", "fit": 23, "low": 16, "high": 29 }
  ],
  "scenarios": {
    "min_probability_pct": 1,
    "hurdle_pct": 5,
    "items": [
      {
        "id": "largest_party_afd",
        "category": "largest_party",
        "label_de": "AfD stärkste Kraft",
        "probability": 97
      }
    ]
  }
}
```

| Feld | Einheit | Bedeutung |
|------|---------|-----------|
| `parties[].fit` | %-Punkte (ganze Zahlen) | Punktschätzung; Summe der Fits ≈ 100 |
| `parties[].low` / `high` | %-Punkte | ca. **83 %-**Intervall |
| `scenarios.items[].probability` | **Prozent 0–100** | Szenario-Wahrscheinlichkeit (anders als federal `pred_probabilities`!) |
| `scenarios.items[].category` | string | z. B. `largest_party`, `hurdle`, `coalition`, `majority_excluding` |
| `metadata.last_poll_date` | Datum | Neueste Umfrage, die in diese Prognose eingeflossen ist („Letzte Umfrage“) |
| `metadata.last_update` | Zeitstempel | Zeitpunkt der Modellrechnung / JSON-Erzeugung („Stand“) |
| `metadata.n_draws` | Ganzzahl | Anzahl Posterior-Simulationen (typisch 4000) |
| `metadata.draws_path` | Pfad | Link zu `/api/v2/state/{code}/draws.json` |

Aktive Länder immer über [`/api/v2/state/index.json`](/api/v2/state/index.json) ermitteln — nicht hart kodieren. Der Index kann ein Feld `draws` setzen, wenn Rohdraws verfügbar sind.

### `data` bei `/api/v2/state/{code}/draws.json`

Dieselben Simulationen, aus denen Punktschätzung, Intervalle und Szenario-Wahrscheinlichkeiten berechnet werden (`stan_glm` → `posterior_predict`, Anteile je Draw auf 1 normalisiert). Format analog zum älteren Federal-`/draws.json`. **Bei jedem State-Forecast-Lauf neu** (gleiche Draws wie Summary/Szenarien).

```json
{
  "api_version": "v2",
  "election": { "id": "st_2026-09-06", "scope": "state", "state_code": "ST" },
  "data": {
    "n_draws": 4000,
    "unit": "share",
    "last_update": "2026-08-17T07:45:12Z",
    "asof_date": "2026-08-16",
    "last_poll_date": "2026-08-16",
    "parties": ["cdu", "spd", "gru", "fdp", "lin", "afd", "bsw", "oth"],
    "draws": [
      { "cdu": 0.23, "spd": 0.07, "gru": 0.05, "fdp": 0.03, "lin": 0.13, "afd": 0.41, "bsw": 0.04, "oth": 0.04 }
    ]
  }
}
```

| Feld | Bedeutung |
|------|-----------|
| `unit` | `"share"` = Anteile 0–1 (nicht Prozent) |
| `draws[]` | Ein Objekt pro Simulation; Parteien summieren sich (nach Rundung) auf ≈ 1 |
| `n_draws` | Länge von `draws` |
| `last_update` | ISO-8601 UTC: Zeitpunkt dieses Forecast-Laufs (Draws werden bei jedem Lauf neu gezogen) |
| `asof_date` / `last_poll_date` | Modell-Stand / neueste einbezogene Umfrage (wie in der Summary) |
| Envelope `generated_at` | Zeitpunkt des API-Builds (Publish), nicht der Fit |

Beispiel:

```bash
curl -s https://zweitstimme.org/api/v2/state/st/draws.json \
  | jq '{generated_at, last_update: .data.last_update, n: .data.n_draws, draw0: .data.draws[0]}'
```

### Archiv-Politik

- Nach dem Wahltag: aktive Datei → Archiv.
- Archiv wird **ab Einführung dieser API** befüllt; ältere Landtage werden **nicht** nachträglich eingespielt.
- Archiv-Antworten können `"archived": true` setzen.
- Rohdraws wandern mit: `/api/v2/state/archive/{code}_{YYYY-MM-DD}/draws.json`.

---

## v2 — Aktuelle Stimmung

Kalman-geglättete Unterstützung **pro Kalendertag**. Tage ohne neue Umfrage sind trotzdem vorhanden (Latentwert), nicht „fehlend“.

### Endpunkte

| Methode | Pfad | Inhalt |
|---------|------|--------|
| GET | [`/api/v2/stimmung/federal/current.json`](/api/v2/stimmung/federal/current.json) | Bund, letzter Tag |
| GET | [`/api/v2/stimmung/federal.json`](/api/v2/stimmung/federal.json) | Bund, volle Reihe + `by_date` |
| GET | [`/api/v2/stimmung/state/index.json`](/api/v2/stimmung/state/index.json) | Liste der Länder |
| GET | `/api/v2/stimmung/state/{code}/current.json` | Land, letzter Tag |
| GET | `/api/v2/stimmung/state/{code}.json` | Land, volle Reihe + `by_date` |

`election` = **nächste** Bundestagswahl bzw. Landtagswahl für diesen Scope (Orientierung), nicht „Prognose für den Wahltag“.

### Current — Beispiel

`GET /api/v2/stimmung/federal/current.json` → `data`:

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
  "active_parties": ["CDU/CSU", "AfD", "SPD", "GRÜNE", "LINKE", "BSW", "FDP"],
  "note": "Kalman latent support for this calendar day (filled on days without a new poll)."
}
```

| Feld | Bedeutung |
|------|-----------|
| `parties` | Anteil in %-Punkten; `null` = Partei an dem Tag nicht aktiv / nicht geschätzt |
| `trends` | Kurzfristige Veränderung (%-Punkte) |
| `uncertainty_*` | Unsicherheitsband um den Latentwert |
| `active_parties` | Parteien, die aktuell als aktiv gelten |

### Beliebigen Tag lesen

Es gibt **kein** `?date=` (statisches Hosting). Zwei Wege:

1. **Nur heute:** `…/current.json`
2. **Historisch:** Serie laden und indexieren:

```js
const { data } = await fetch(
  "https://zweitstimme.org/api/v2/stimmung/federal.json"
).then((r) => r.json());

const day = data.by_date["2026-08-01"]; // { parties: { … } }
// Alternative: Index in data.dates → data.series[party][i]
```

Die Serien-Dateien sind größer (volle Historie); für Dashboards oft `current` genügt.

---

## Fehler und Verfügbarkeit

| Situation | Verhalten |
|-----------|-----------|
| Unbekannter Pfad / kein aktives Forecast | **HTTP 404** |
| Land außerhalb des 90-Tage-Fensters | State-Forecast-Endpunkt fehlt (404); Stimmung bleibt verfügbar |
| Wartung / Deploy | Kurzzeitig veraltete oder fehlende Dateien möglich |

Es gibt keine Rate-Limits jenseits normaler CDN-/Hosting-Grenzen. Bitte cachen (ETag / `Last-Modified` / eigenes TTL).

---

## Interne `/data/`-Pfade

Die Website-UI liest parallel `/data/forecast_state_*.json`, `/data/stimmung_*.json` usw. Das ist **kein** stabiler Public-Contract. Für Integrationen immer `/api/v…` verwenden.

---

## Nutzungsbedingungen

- Nicht-kommerzielle Nutzung.
- Quelle: **zweitstimme.org**.
- Keine Gewähr für Verfügbarkeit, Vollständigkeit oder Richtigkeit.
- Prognosen und Stimmung sind Modelloutputs, keine amtlichen Ergebnisse.
