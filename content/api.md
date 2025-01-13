---
title: "API-Dokumentation"
layout: "page"
url: "/api"
summary: "API Dokumentation"
---


Die zweitstimme.org API ermöglicht den Zugriff auf unsere Wahlprognosen und zugehörige Visualisierungen. Alle Endpunkte sind über https GET-Anfragen erreichbar.

## Basis-URL

`https://polsci.uni-wh.de`

## Endpunkte

### Letztes Update
**Endpunkt:** <a href="https://polsci.uni-wh.de/last_updated" target="_blank">`/last_updated`</a>  
**Methode:** GET  
**Beschreibung:** Gibt den Zeitstempel der letzten Aktualisierung zurück.

**Beispielantwort:**

```json
{
"last_updated": "2024-01-20T12:00:00Z"
}
```


### Aktuelle Zweitstimmen-Prognose
**Endpunkt:** <a href="https://polsci.uni-wh.de/forecast" target="_blank">`/forecast`</a>  
**Methode:** GET  
**Beschreibung:** Liefert die aktuellen Wahlprognosen inklusive der 83% Konfidenzintervalle.

**Beispielantwort:**

```json
json
[
  {
    "value": 30.2,
    "low": 24.6,
    "high": 35.8,
    "low95": 21.4,
    "high95": 39.9,
    "name": "CDU/CSU",
    "name_eng": "CDU/CSU",
    "color": "#000000",
    "y": 30.2,
    "x": 0,
    "_row": "cdu"
  },
...
]
```

### Prognosen für bestimmte Ereignisse
**Endpunkt:** <a href="https://polsci.uni-wh.de/pred_probabilities" target="_blank">`/pred_probabilities`</a>  
**Methode:** GET  
**Beschreibung:** Liefert Prognosen für Ereignisse, z.B. dass Partei X mehr als 5% der Stimmen erhält oder das es Mehrheiten für Koalitionen gibt. Hier wird auch die Grundmandatsklausel berücksichtigt.

**Beispielantwort:**

```json
[
  {
    "hurdle_lin": 0.0402,
    "hurdle_bsw": 0.6063,
    "hurdle_fdp": 0.1337,
    "hurdle_spd": 0.9998,
    "hurdle_cdu": 1,
    "hurdle_csu": 1,
    "hurdle_gru": 0.9989,
    "hurdle_afd": 1,
    "maj_cdu_csu_gru": 0.5761,
    "maj_cdu_csu_spd": 0.8499,
    "maj_cdu_csu_gru_spd": 0.9988,
    "maj_cdu_csu_afd": 0.9444,
    "prob_lin_largest": 0,
    "prob_bsw_largest": 0.0004,
    "prob_fdp_largest": 0,
    "prob_spd_largest": 0.0465,
    "prob_cdu_largest": 0.7907,
    "prob_csu_largest": 0,
    "prob_gru_largest": 0.008,
    "prob_afd_largest": 0.1544
  }
]
```

### Erststimmen-Prognosen
**Endpunkt:** <a href="https://polsci.uni-wh.de/forecast_districts" target="_blank">`/forecast_districts`</a>  
**Methode:** GET  
**Beschreibung:** Liefert Prognosen für alle 299 Bundestagswahlkreise inklusive der 83% Konfidenzintervalle. Außerdem analog Vorhersagen für die Zweitstimmen (zs) in den Wahlkreisen. Außerdem die Werte bei der vergangenen Wahl (l1). abandon_p_party ist die Wahrscheinlichkeit, dass ein Wahlkreis von dieser Partei nicht besetzt wird (für die Gesamtwahrscheinlichkeit müssen die Wahrscheinlichkeiten für alle Parteien addiert werden). 

**Beispielantwort:**

```json
[
  {
    "wkr": 1,
    "party": "afd",
    "wkr_name": "Flensburg – Schleswig",
    "land": "SH",
    "partei": "AfD",
    "winner": 0,
    "probability": 0,
    "value": 9.6,
    "low": 7.8,
    "high": 11.2,
    "value_l1": 5.5,
    "zs_value_l1": 5.8,
    "incumbent_party": 0,
    "zs_valid_l1": 178625,
    "valid_l1": 178575,
    "zs_value": 10.8,
    "zs_low": 9.2,
    "zs_high": 12.4,
    "abandon_p_party": 0
  },
  ...
]
```

### Prognosen für nicht besetzte Wahlkreise
**Endpunkt:** <a href="https://polsci.uni-wh.de/pred_vacant" target="_blank">`/pred_vacant`</a>  
**Methode:** GET  
**Beschreibung:** Liefert Prognosen für die Wahrscheinlichkeit, dass ein Wahlkreis unabhangig von der Partei nicht besetzt wird.

**Beispielantwort:**

```json
[
  {
    "land": "BW",
    "wkr": 259,
    "wkr_name": "Stuttgart II",
    "abandon_p": 0.93,
    "value_mean": 0.31
  },
  ...
]
```






### Prognose-Verteilung
**Endpunkt:** <a href="https://polsci.uni-wh.de/draws" target="_blank">`/draws`</a>  
**Methode:** GET  
**Beschreibung:** Liefert 10.000 Ziehungen aus der Prognoseverteilung für detaillierte statistische Analysen, je Partei ein Wert.

**Beispielantwort:**

```json
[
  {
    "cdu": 0.3209,
    "afd": 0.1443,
    "spd": 0.161,
    "gru": 0.1475,
    "oth": 0.0629,
    "bsw": 0.0892,
    "fdp": 0.05,
    "lin": 0.0243
  },
  ...
]
```

### Visualisierungen

#### Interaktive Zweitstimmen-Visualisierung
**Endpunkt:** <a href="https://polsci.uni-wh.de/interactive" target="_blank">`/interactive`</a>  
**Methode:** GET  
**Beschreibung:** Liefert eine interaktive HTML-Visualisierung der aktuellen Prognose.

#### Mobile Zweitstimmen-Visualisierung
**Endpunkt:** <a href="https://polsci.uni-wh.de/interactive_mobile" target="_blank">`/interactive_mobile`</a>  
**Methode:** GET  
**Beschreibung:** Optimierte Version der interaktiven Visualisierung für mobile Geräte.

#### Interaktive Erststimmen-Visualisierung
**Endpunkt:** <a href="https://polsci.uni-wh.de/interactive_districts_share" target="_blank">`/interactive_districts_share`</a>  
**Methode:** GET  
**Beschreibung:** Liefert eine interaktive Karte der aktuellen Prognose.

#### Interaktive Erststimmen-Gewinn-Visualisierung
**Endpunkt:** <a href="https://polsci.uni-wh.de/interactive_districts_probability" target="_blank">`/interactive_districts_probability`</a>  
**Methode:** GET  
**Beschreibung:** Liefert eine interaktive Karte der aktuellen Prognose.

#### Interaktive Visualisierung der Wahrscheinlichkeiten für nicht besetzte Wahlkreise
**Endpunkt:** <a href="https://polsci.uni-wh.de/interactive_vacant" target="_blank">`/interactive_vacant`</a>  
**Methode:** GET  
**Beschreibung:** Liefert eine interaktive Karte der Wahrscheinlichkeiten für nicht besetzte Wahlkreise.

### Statische Grafiken

#### Hauptprognose
**Endpunkt:** <a href="https://polsci.uni-wh.de/figure" target="_blank">`/figure`</a>  
**Methode:** GET  
**Format:** PNG  
**Beschreibung:** Statische Visualisierung der aktuellen Prognose.

#### PDF-Version der Hauptprognose
**Endpunkt:** <a href="https://polsci.uni-wh.de/pdf" target="_blank">`/pdf`</a>  
**Methode:** GET  
**Format:** PDF  
**Beschreibung:** PDF-Version der Prognose-Visualisierung.


## CORS
Die API unterstützt Cross-Origin Resource Sharing (CORS) und erlaubt Anfragen von allen Domains (*).

## Fehlermeldungen
Bei nicht verfügbaren Ressourcen wird ein 404-Status zurückgegeben mit einer entsprechenden Fehlermeldung im JSON-Format.

## Nutzungsbedingungen
Die API ist für nicht-kommerzielle Nutzung verfügbar. Bei Verwendung der Daten ist zweitstimme.org als Quelle anzugeben. Wir übernehmen keine Gewähr für die Verfügbarkeit und Richtigkeit der Daten.