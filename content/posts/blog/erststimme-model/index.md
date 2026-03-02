---
title: "Unser Erststimme-Modell 2025"
date: 2025-02-18T13:00:02+02:00
draft: false
---

## Unser Modell zur Vorhersage der Erststimme

Im deutschen Wahlsystem können Parteien, die weniger als 5% der Zweitstimmen erhalten, dennoch Sitze im Parlament gewinnen, wenn sie mindestens drei Direktmandate erringen. Die Verteilung der Erststimmen in jedem Wahlkreis bestimmt die Wahrscheinlichkeit, dass ein Kandidat ein Direktmandat gewinnt. Unser Modell zielt darauf ab, diese Wahrscheinlichkeiten vorherzusagen.

### Grundlage des Modells

Unser Ansatz basiert auf dem Zweitstimme-Modell, das wir erstmals für die Bundestagswahl 2017 entwickelt und 2021 erneut angewendet haben. Wir beginnen mit der Vorhersage der Stimmanteile auf Bundesebene und verwenden eine proportionale Veränderung, um die Parteistimmen auf Wahlkreisebene zu schätzen. Zum Beispiel, wenn die CDU/CSU national einen Anstieg von XX% erwartet, wird diese Veränderung proportional auf alle Wahlkreise angewendet.

### Vorhersage der Kandidatenstimmen

Zusätzlich zur proportionalen Veränderung verwenden wir ein Modell zur Vorhersage der Kandidatenstimmen in den Wahlkreisen. Hier nutzen wir zusätzlich zu den Informationen aus dem Zweitstimmen-Modell eine Reihe von Faktoren: 

#### Wahlkreis- und Parteiebene
- Vorhergesagter Zweitstimmenanteil (aus dem Zweitstimmenmodell)
- Erststimmenanteil bei der letzten Bundestagswahl
- Anzahl der Kandidierenden im Wahlkreis
- Indikator für ostdeutsche Wahlkreise
- Indikator ob ein:e Amtsinhaber:in im Wahlkreis antritt

#### Kandidat:innenebene
- Relativer Listenplatz (Listenplatz geteilt durch Gesamtanzahl der Listenplätze)
- Indikator ob Kandidierende:r auch auf der Landesliste steht
- Indikator ob Kandidierende:r bei der letzten Wahl angetreten ist
- Indikator für weibliche Kandidierende
- Indikator für Amtsinhaber:innen
- Indikator für akademischen Titel (Dr.)
- Indikator ob die Partei bei der letzten Wahl keine:n Kandidat:in aufgestellt hatte

(Update 18. Februar 2025: Wir haben die Modellannahmen zur proportionalen Veränderung von Die Linke und BSW angepasst. Hierdurch ergeben sich niedrigere Erststimmenanteile für diese Parteien. Diese Änderungen sind in das Modell integriert.)

(Update 17. Februar 2025: In einer vorherigen Version (vor dem 14. Februar 2025) hatten wir ein Modell mit weniger Informationen verwendet, da noch keine Informationen über die Kanididierenden vorlagen. Diese Informationen sind inzwischen verfügbar und wurden in das Modell integriert. Auf Basis der Re-Evaluation von vergangenen Wahlen haben wir außerdem die Unsicherheitsintervalle auf die Abdeckung bei diesen Wahlen angepasst.)

### Ergebnisse und Genauigkeit

Mit diesem vereinfachten Ansatz simulieren wir die Kandidatenstimmen für die kommende Wahl in allen 299 Wahlkreisen. Dies ermöglicht es uns, die Verteilung 
der Kandidatenstimmen und die Wahrscheinlichkeiten der Direktmandate für verschiedene Parteien vorherzusagen. In der Vergangenheit hat unser Modell etwa 90% 
der Wahlkreise korrekt vorhergesagt, wobei die Genauigkeit 2021 aufgrund unerwarteter Erfolge der AfD auf etwa 80% sank.

Diese Werte basieren auf der Validierung des Modells anhand der Bundestagswahl 2021. Die Genauigkeit der aktuellen Vorhersagen für 2025 hängt stark von der Stabilität der Umfragen und möglichen lokalen Entwicklungen ab.

### Einschränkungen
Die Vorhersagen sind mit erheblicher Unsicherheit behaftet. Das Modell kann:
- Lokale Besonderheiten und Kampagnen nur begrenzt, nämlich über die enthaltenen Faktoren, erfassen
- Neue politische Entwicklungen nur über das Zweitstimmenmodell berücksichtigen

### Berücksichtigung von Parteien

Sowohl unser Zweitstimmen- als auch unser darauf aufbauendes Erststimmen-Modell sind auf die Verfügbarkeit von Umfragedaten angewiesen, die wir derzeit von den großen Umfrage-Instituten über wahlrecht.de beziehen. Werden für eine Partei dort keine Werte (oder nicht kontinuierlich) ausgewiesen, ist es uns im Rahmen der Modelle leider nicht möglich, eine Partei zu berücksichtigen.


Für eine detaillierte Beschreibung des Modells verweisen wir auf die Anwendungen dieses Modells bei den Bundestagswahlen 2017 und 2021.

- [Ein Ansatz zur Vorhersage der Erststimmenanteile bei Bundestagswahlen](https://link.springer.com/article/10.1007/s11615-019-00216-3)