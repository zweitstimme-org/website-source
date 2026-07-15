---
title: "Berechnung von Wahrscheinlichkeiten"
date: 2025-01-08T10:00:04+02:00
draft: false
---

Mit einem neuartigen Ansatz berechnen wir Wahrscheinlichkeiten für Koalitionsmehrheiten unter Berücksichtigung der Grundmandatsklausel, die Parteien mit mindestens drei gewonnenen Wahlkreisen von der 5%-Hürde befreit. Dies ist besonders relevant für die Linke, die drei Wahlkreise gewinnen, aber an der 5%-Hürde scheitern könnte – ein Szenario, das die Sitzverteilung im Parlament erheblich beeinflussen würde.

## Methodisches Vorgehen

Um das Wahlrecht möglichst genau zu modellieren, kombinieren wir die Vorhersagen für Wahlkreise und Listenstimmen:

1. Wir ziehen 10.000 Stichproben aus der Vorhersageverteilung
2. Für jede Stichprobe identifizieren wir:
   - Parteien, die mindestens drei Wahlkreise gewinnen
   - Parteien, die die 5%-Hürde überschreiten
3. Basierend auf diesen Parteien berechnen wir mögliche Koalitionsmehrheiten

Die Wahrscheinlichkeiten für verschiedene Koalitionsszenarien ergeben sich aus der Aggregation dieser Simulationen. Für jede mögliche Koalition zählen wir, in wie vielen der 10.000 Simulationen sie eine Mehrheit erreicht. Der Anteil der Simulationen mit Mehrheit entspricht dann der Wahrscheinlichkeit für diese Koalition.