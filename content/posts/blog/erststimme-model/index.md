---
title: "Unser Erststimme-Modell 2025"
date: 2025-01-08T10:00:02+02:00
draft: false
---

## Unser Modell zur Vorhersage der Erststimme

Im deutschen Wahlsystem können Parteien, die weniger als 5% der Zweitstimmen erhalten, dennoch Sitze im Parlament gewinnen, wenn sie mindestens drei Direktmandate erringen. Die Verteilung der Erststimmen in jedem Wahlkreis bestimmt die Wahrscheinlichkeit, dass ein Kandidat ein Direktmandat gewinnt. Unser Modell zielt darauf ab, diese Wahrscheinlichkeiten vorherzusagen.

### Grundlage des Modells

Unser Ansatz basiert auf dem Zweitstimme-Modell, das wir erstmals für die Bundestagswahl 2017 entwickelt und 2021 erneut angewendet haben. Wir beginnen mit der Vorhersage der Stimmanteile auf Bundesebene und verwenden eine proportionale Veränderung, um die Parteistimmen auf Wahlkreisebene zu schätzen. Zum Beispiel, wenn die CDU/CSU national einen Anstieg von XX% erwartet, wird diese Veränderung proportional auf alle Wahlkreise angewendet.

### Vorhersage der Kandidatenstimmen

Zusätzlich zur proportionalen Veränderung verwenden wir ein Modell zur Vorhersage der Kandidatenstimmen in den Wahlkreisen. Ursprünglich nutzten wir eine Reihe von Faktoren wie die Parteistimmen im Wahlkreis, die Anzahl der Kandidaten und den Amtsinhaberstatus. Zwei Regressionsansätze, ein lineares Modell und ein neuronales Netz, wurden auf vergangene Wahldaten angewendet.

### Anpassungen für die Wahl 2025

Da wir noch nicht alle Kandidateninformationen für die Wahl 2025 haben, haben wir ein vereinfachtes Regressionsmodell entwickelt. Dieses Modell berücksichtigt vier Faktoren: die Parteistimmen im Wahlkreis, die Kandidatenstimmen der Partei bei der letzten Wahl, ob die Partei den Wahlkreis zuletzt gewonnen hat und ob die Partei zuvor im Wahlkreis angetreten ist.

### Ergebnisse und Genauigkeit

Mit diesem vereinfachten Ansatz simulieren wir die Kandidatenstimmen für die kommende Wahl in allen 299 Wahlkreisen. Dies ermöglicht es uns, die Verteilung der Kandidatenstimmen und die Wahrscheinlichkeiten der Direktmandate für verschiedene Parteien vorherzusagen. In der Vergangenheit hat unser Modell etwa 90% der Wahlkreise korrekt vorhergesagt, wobei die Genauigkeit 2021 aufgrund unerwarteter Erfolge der AfD auf etwa 80% sank.

Für eine detaillierte Beschreibung des Modells verweisen wir auf die Anwendungen dieses Modells bei den Bundestagswahlen 2017 und 2021.

- [Ein Ansatz zur Vorhersage der Erststimmenanteile bei Bundestagswahlen](https://link.springer.com/article/10.1007/s11615-019-00216-3)