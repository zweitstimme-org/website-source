---
title: "API-Dokumentation"
layout: "page"
url: "/api"
summary: "API Dokumentation"
---

*Seite in Bearbeitung*


# API-Dokumentation

Die zweitstimme.org API ermöglicht den Zugriff auf unsere Wahlprognosen und zugehörige Visualisierungen. Alle Endpunkte sind über HTTP GET-Anfragen erreichbar.

## Basis-URL

`http://polsci.uni-wh.de:8073`

## Endpunkte

### Aktuelle Prognose
**Endpunkt:** <a href="http://polsci.uni-wh.de:8073/forecast" target="_blank">`/forecast`</a>  
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

### Letztes Update
**Endpunkt:** <a href="http://polsci.uni-wh.de:8073/last_updated" target="_blank">`/last_updated`</a>  
**Methode:** GET  
**Beschreibung:** Gibt den Zeitstempel der letzten Aktualisierung zurück.

**Beispielantwort:**

```json
{
"last_updated": "2024-01-20T12:00:00Z"
}
```



### Prognose-Verteilung
**Endpunkt:** <a href="http://polsci.uni-wh.de:8073/draws" target="_blank">`/draws`</a>  
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

#### Interaktive Grafik
**Endpunkt:** <a href="http://polsci.uni-wh.de:8073/interactive" target="_blank">`/interactive`</a>  
**Methode:** GET  
**Beschreibung:** Liefert eine interaktive HTML-Visualisierung der aktuellen Prognose.

#### Mobile Visualisierung
**Endpunkt:** <a href="http://polsci.uni-wh.de:8073/interactive_mobile" target="_blank">`/interactive_mobile`</a>  
**Methode:** GET  
**Beschreibung:** Optimierte Version der interaktiven Visualisierung für mobile Geräte.

### Statische Grafiken

#### Hauptprognose
**Endpunkt:** <a href="http://polsci.uni-wh.de:8073/figure" target="_blank">`/figure`</a>  
**Methode:** GET  
**Format:** PNG  
**Beschreibung:** Statische Visualisierung der aktuellen Prognose.

#### PDF-Version
**Endpunkt:** <a href="http://polsci.uni-wh.de:8073/pdf" target="_blank">`/pdf`</a>  
**Methode:** GET  
**Format:** PDF  
**Beschreibung:** PDF-Version der Prognose-Visualisierung.

#### Spezielle Visualisierungen
- <a href="http://polsci.uni-wh.de:8073/hurdle" target="_blank">`/hurdle`</a> - Visualisierung der 5%-Hürde
- <a href="http://polsci.uni-wh.de:8073/majorities" target="_blank">`/majorities`</a> - Analyse möglicher Mehrheiten
- <a href="http://polsci.uni-wh.de:8073/winner" target="_blank">`/winner`</a> - Prognose des Wahlsiegers

## CORS
Die API unterstützt Cross-Origin Resource Sharing (CORS) und erlaubt Anfragen von allen Domains (*).

## Fehlermeldungen
Bei nicht verfügbaren Ressourcen wird ein 404-Status zurückgegeben mit einer entsprechenden Fehlermeldung im JSON-Format.

## Nutzungsbedingungen
Die API ist für nicht-kommerzielle Nutzung verfügbar. Bei Verwendung der Daten ist zweitstimme.org als Quelle anzugeben. Wir übernehmen keine Gewähr für die Verfügbarkeit und Richtigkeit der Daten.