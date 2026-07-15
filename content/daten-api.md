---
title: "Daten API"
date: 2025-01-20
draft: false
description: "JSON API für Umfragedaten und Wahlergebnisse"
---

# Daten API

Diese Seite dokumentiert die verfügbaren JSON-Daten-Endpunkte für Umfragen und Wahlergebnisse.

## Aktuelle Umfragen

### Bundesumfragen
- **URL**: `/data/current_latent_support_federal.json`
- **Beschreibung**: Aktuelle Umfrageergebnisse für Bundestagswahlen
- **Format**: JSON mit aktuellen Unterstützungswerten

### Landtagsumfragen
- **URL**: `/data/current_latent_support_states.json`
- **Beschreibung**: Aktuelle Umfrageergebnisse für alle Bundesländer
- **Format**: JSON mit Unterstützungswerten pro Bundesland

## Historische Trends

### Bundesumfragen (10 Jahre)
- **URL**: `/data/federal_latent_support_10y.json`
- **Beschreibung**: Tägliche Unterstützungswerte der letzten 10 Jahre
- **Format**: JSON mit Zeitreihendaten

### Landtagsumfragen (10 Jahre)
- **URL**: `/data/states_latent_support_10y.json`
- **Beschreibung**: Tägliche Unterstützungswerte für alle Bundesländer
- **Format**: JSON mit Zeitreihendaten pro Bundesland

## Wahlergebnisse

### Historische Ergebnisse
- **URL**: `/data/election_results_complete.json`
- **Beschreibung**: Alle historischen Bundestags- und Landtagswahlergebnisse
- **Format**: JSON mit Wahlergebnissen

### Nächste Wahlen
- **URL**: `/data/election_dates.json`
- **Beschreibung**: Termine für kommende Landtagswahlen
- **Format**: JSON mit Wahlterminen

## Rohdaten

### Alle Umfragen
- **URL**: `/data/all_polls.json`
- **Beschreibung**: Alle verfügbaren Umfragedaten
- **Format**: JSON mit detaillierten Umfrageinformationen

### Umfrage-Statistiken
- **URL**: `/data/polls_summary.json`
- **Beschreibung**: Zusammenfassung der verfügbaren Umfragen
- **Format**: JSON mit Statistiken

## Verwendung

### JavaScript Beispiel
```javascript
// Aktuelle Bundesumfragen laden
fetch('/data/current_latent_support_federal.json')
  .then(response => response.json())
  .then(data => {
    console.log('Aktuelle Unterstützung:', data.current_support);
  });

// Trends für ein Bundesland laden
fetch('/data/states_latent_support_10y.json')
  .then(response => response.json())
  .then(data => {
    const bayernData = data.BY;
    console.log('Bayern Trends:', bayernData);
  });
```

### CORS
Die API unterstützt CORS und kann von anderen Domains aus aufgerufen werden.

### Aktualisierung
Die Daten werden regelmäßig aktualisiert:
- Aktuelle Umfragen: Alle 6 Stunden
- Trends: Täglich
- Wahlergebnisse: Bei neuen Wahlen

---

*Letzte Aktualisierung: {{ "now" | date: "%d.%m.%Y %H:%M" }}*
