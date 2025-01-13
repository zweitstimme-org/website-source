---
title: "Unser Zweitstimme-Modell 2025"
date: 2025-01-08T10:00:00+02:00
draft: false
---

## Unser Modell zur Vorhersage der Zweitstimme

Um die Stimmanteile auf Bundesebene für die kommende Wahl vorherzusagen, nutzen wir unser Zweitstimme-Modell. Dieses Modell kombiniert zwei wesentliche Komponenten: ein Fundamentaldaten-Modell und ein Umfragedaten-Modell.

### Fundamentaldaten-Modell

1. **Langfristige Parteibindung**: Ergebnisse der vorherigen Wahl.
2. **Kurzfristige Kampagnendynamik**: Durchschnittliche Wahlabsichten in Umfragen 230–200 Tage vor dem Wahltag.
3. **Unterstützung der amtierenden Regierung**: Ein Indikator für die Kanzler\*innenpartei.

### Umfragedaten-Modell

Um die aktuelle Stimmung miteinzubeziehen, fließen als zweite Komponente öffentliche Meinungsumfragen (Quelle: <a href="https://www.wahlrecht.de">wahlrecht.de</a>) in unser Modell ein.

### Kombination der Teile

Die beiden Modelle werden durch einen rückwärts gerichteten Zufallsprozess kombiniert. Die Vorhersagen des Fundamentaldaten-Modells dienen als Grundlage für das Umfragemodell am Wahltag. Beide Modelle werden gemeinsam mit Markov Chain Monte Carlo (MCMC) Methoden geschätzt. Wir ziehen 10.000 Stichproben aus der Verteilung, um die möglichen Wahlergebnisse zu simulieren.

Für eine detaillierte Beschreibung des Modells verweisen wir auf die Anwendungen dieses Modells bei den Bundestagswahlen 2017 und 2021 und die dazugehörigen Publikationen:

- [Forecasting Elections in Multiparty Systems: A Bayesian Approach Combining Polls and Fundamentals](https://www.cambridge.org/core/journals/political-analysis/article/forecasting-elections-in-multiparty-systems-a-bayesian-approach-combining-polls-and-fundamentals/CA929544F672A09A0E34C5529EBFA482)
- [Zweitstimme Model: A Dynamic Forecast of the 2021 German Federal Election](https://www.cambridge.org/core/journals/ps-political-science-and-politics/article/abs/zweitstimme-model-a-dynamic-forecast-of-the-2021-german-federal-election/3BF2DA3841C15602D7EA31B3872FD975)
- [Zweitstimme.org. Ein strukturell-dynamisches Vorhersagemodell für Bundestagswahlen](https://www.jstor.org/stable/26427772)