---
title: "Forecast API"
layout: "page"
url: "/api"
summary: "Dokumentation der versionierten Forecast API (Bundestag, Landtage, Aktuelle Stimmung)"
---

Zweitstimme.org betreibt zwei APIs für Wahldaten und -prognosen. Auf dieser Seite dokumentieren wir die **Forecast API** — strukturierter Zugriff auf Modellergebnisse und die **Aktuelle Stimmung** (Kalman).

## Polling API (getrennt)

Die **Polling API** für Einzelumfragen und Rohdaten ist ein eigener Dienst (nicht Teil dieser Seite). Die Forecast API liefert **keine** Rohumfragen.

---

## Forecast API

Alle Endpunkte sind HTTPS-GET auf statische JSON-Dateien. Neue Clients sollten die **versionierten** Pfade unter `/api/v…` nutzen. Jede versionierte Antwort enthält ein `election`-Objekt (welche Wahl die Daten betreffen).

### Basis-URL

`https://zweitstimme.org`

### Discovery

**Endpunkt:** [`/api/index.json`](/api/index.json)

Listet verfügbare Versionen und Endpunkte.

### Antwort-Envelope (v1 / v2)

```json
{
  "api_version": "v2",
  "generated_at": "2026-08-11T15:35:11Z",
  "election": {
    "id": "st_2026-09-06",
    "name": "Landtagswahl Sachsen-Anhalt",
    "date": "2026-09-06",
    "scope": "state",
    "state_code": "ST"
  },
  "data": { }
}
```

| Feld | Bedeutung |
|------|-----------|
| `election.id` | Stabile ID, z. B. `bund_2025-02-23` oder `st_2026-09-06` |
| `election.name` | Anzeigename der Wahl |
| `election.date` | Wahltag (`YYYY-MM-DD`) |
| `election.scope` | `federal` oder `state` |
| `election.state_code` | Landeskürzel oder `null` (Bund) |

---

## v1 — Bundestag (federal)

BTW-Prognosen und Szenario-Wahrscheinlichkeiten. Index: [`/api/v1/federal/index.json`](/api/v1/federal/index.json)

| Endpunkt | Inhalt |
|----------|--------|
| `/api/v1/federal/forecast.json` | Zweitstimmen-Punktwerte + 83 %/95 %-Intervalle |
| `/api/v1/federal/pred_probabilities.json` | Hürden-, Mehrheits- und Stärkste-Kraft-Wahrscheinlichkeiten |
| `/api/v1/federal/forecast_districts.json` | Wahlkreis Erst-/Zweitstimme (wenn veröffentlicht) |

`data` entspricht dem bisherigen Root-Array/Objekt — zusätzlich mit `election`.

**Beispiel** `GET /api/v1/federal/forecast.json`:

```json
{
  "api_version": "v1",
  "generated_at": "2026-08-11T15:35:11Z",
  "election": {
    "id": "bund_2025-02-23",
    "name": "Bundestagswahl",
    "date": "2025-02-23",
    "scope": "federal",
    "state_code": null
  },
  "data": [
    {
      "value": 30.2,
      "low": 24.6,
      "high": 35.8,
      "low95": 21.4,
      "high95": 39.9,
      "name": "CDU/CSU",
      "_row": "cdu"
    }
  ]
}
```

### Legacy-Root → Redirects

Kanonisch ist `/api/v1/federal/…`. Die alten Root-Pfade leiten dorthin um:

| Alt | Neu |
|-----|-----|
| `/forecast.json` | `/api/v1/federal/forecast.json` |
| `/pred_probabilities.json` | `/api/v1/federal/pred_probabilities.json` |
| `/forecast_districts.json` | `/api/v1/federal/forecast_districts.json` |

Technisch: `_redirects` (301, Cloudflare/Netlify) und auf GitHub Pages dieselben **envelopten** JSON-Inhalte unter dem alten Pfad (Content-Alias). Clients, die dem Redirect folgen oder den Alias lesen, erhalten das Envelope mit `election` — nicht mehr das nackte Array.

Weitere Legacy-Dateien ohne Redirect: `/pred_vacant.json`, `/draws.json`, `/last_updated.json`, `/interactive_*.html`.

### Archiv (federal)

Nach dem Wahltag verschiebt die Pipeline aktive Federal-Prognosen nach `archive/`. Abfragbar unter:

- [`/api/v1/federal/archive/index.json`](/api/v1/federal/archive/index.json)
- `/api/v1/federal/archive/{YYYY-MM-DD}.json`

Nur Wahlen, die die Pipeline künftig archiviert — **kein Backfill** älterer BTW.

---

## v2 — Landtage (state forecasts)

Aktive Landesprognosen nur im **~90-Tage-Fenster** vor dem Wahltag. Index: [`/api/v2/state/index.json`](/api/v2/state/index.json)

| Endpunkt | Inhalt |
|----------|--------|
| `/api/v2/state/index.json` | Aktive Länder + Election-Metadaten |
| `/api/v2/state/{st\|be\|mv\|…}.json` | Parteien (fit/low/high) + Szenarien |
| `/api/v2/state/archive/index.json` | Archivierte Landtagswahlen (nach dem Wahltag) |
| `/api/v2/state/archive/{st}_{YYYY-MM-DD}.json` | Eingefrorene Prognose einer vergangenen Wahl |

**Beispiel** `GET /api/v2/state/st.json` — `data.parties` / `data.scenarios` wie bisher unter `/data/forecast_state_st.json`, plus äußeres `election` und `data.metadata.election_name`.

Archiv wird **ab jetzt** befüllt, wenn eine Wahl vorbei ist; frühere Landtage werden nicht nachträglich eingespielt.

Wahlkreis- und Kandidaten-JSON bleiben Preview-only und sind **nicht** Teil der öffentlichen v2-API.

---

## v2 — Aktuelle Stimmung

Kalman-Latentwerte **für jeden Kalendertag** im Zeitraum (auch ohne neue Umfrage an diesem Tag). Stimmung ist keine Wahlprognose; `election` benennt die **nächste** relevante Wahl für den Scope (nächste BTW bzw. Landtagswahl).

| Endpunkt | Inhalt |
|----------|--------|
| `/api/v2/stimmung/federal.json` | Volle Tagesreihe Bund + `by_date` |
| `/api/v2/stimmung/federal/current.json` | Letzter Tag |
| `/api/v2/stimmung/state/index.json` | Übersicht Länder |
| `/api/v2/stimmung/state/{st\|…}.json` | Volle Tagesreihe Land + `by_date` |
| `/api/v2/stimmung/state/{st\|…}/current.json` | Letzter Tag |

### Tageszugriff

Es gibt keine dynamische Query (`?date=`). Stattdessen:

1. **Ein Tag (aktuell):** `/api/v2/stimmung/federal/current.json` bzw. `…/state/st/current.json`
2. **Beliebiger Tag in der Reihe:** Serie laden und `data.by_date["YYYY-MM-DD"].parties` lesen (oder Index in `data.dates` / `data.series`)

Tage außerhalb der veröffentlichten Reihe fehlen in `by_date`. Fehlende Umfragen an einem Tag bedeuten **nicht**, dass der Tag fehlt — der Kalman-Filter liefert trotzdem einen Wert.

**Beispiel** `data` in `/api/v2/stimmung/federal/current.json`:

```json
{
  "as_of": "2026-08-11",
  "parties": { "CDU/CSU": 21.0, "AfD": 27.9, "SPD": 12.1 },
  "trends": { "CDU/CSU": -0.2, "AfD": 0.3 },
  "active_parties": ["CDU/CSU", "AfD", "SPD", "GRÜNE", "LINKE", "BSW", "FDP"],
  "note": "Kalman latent support for this calendar day (filled on days without a new poll)."
}
```

Die Website-UI liest weiterhin `/data/stimmung_*.json` und `/data/forecast_state_*.json`; `/api/*` ist der öffentliche Vertrag.

---

## Visualisierungen (Legacy)

Interaktive HTML-Karten unter Root-Pfaden (BTW-Zyklus), unverändert:

- `/interactive_mobile.html`
- `/interactive_districts_share.html`
- `/interactive_districts_probability.html`
- `/interactive_vacant.html`

---

## CORS

Die Forecast API erlaubt Cross-Origin-Anfragen von allen Domains (`*`).

## Fehler

Nicht vorhandene Ressourcen: HTTP 404.

## Nutzungsbedingungen

Nicht-kommerzielle Nutzung; Quelle **zweitstimme.org** angeben. Keine Gewähr für Verfügbarkeit oder Richtigkeit.
