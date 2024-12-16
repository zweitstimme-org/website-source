---
title: "Über die Prognosemodelle"
date: 2021-08-18T22:33:16+02:00
draft: false
bibFile: "data/bibliography.json"
---

Für uns als Wissenschaftler:innen ist es wichtig, dass unsere Prognosen transparent und nachvollziehbar sind. 

Seit 2017 haben wir zu unserem Modell mehrere (peer-reviewed) wissenschaftliche Artikel veröffentlicht. Mit den Veröffentlichungen stellen wir auch unseren Code öffentlich zur Verfügung.

Um sowohl längerfristige Parteineigungen als auch aktuelle politische Stimmungen abzubilden, besteht unser [Zweitstimmenmodell](#das-zweitstimmenmodell) aus zwei Komponenten – einer strukturellen Komponente und einer Umfragekomponente. Zusätzlich können wir mit unserem [Wahlkreismodell](#das-wahlkreismodell) berechnen, wie wahrscheinlich eine Kandidatin oder ein Kandidat jeder Partei einen Wahlkreis gewinnen kann.  

Eine detailliertere Beschreibung und Evaluation des Modells für die Bundestagswahl 2017 finden Sie [hier](http://2017.zweitstimme.org) und (mit Weiterentwicklungen) in diesen Veröffentlichungen: {{< cite "PVS2017" >}}, {{< cite "PA2019" >}} und {{< cite "PVS2020" >}}. Unsere Vorhersage für die Bundestagswahl 2021 wird noch vor der Wahl in [PS: Political Science & Politics](https://www.cambridge.org/core/journals/ps-political-science-and-politics) veröffentlicht. 

Den Code zu unseren Modellen finden Sie in {{< cite "codePA2019" >}}, {{< cite "codePS2021" >}} oder auf unserer [GitHub Seite](https://github.com/zweitstimme-org).


### Veröffentlichungen & Code:

{{< bibliography >}}

### Details zu den Modellen

#### Das Zweitstimmenmodell

Die strukturelle Komponente unseres Modells greift auf Faktoren zurück, die sich bereits in der Vergangenheit (seit 1949) als relevant für die Vorhersage von Wahlergebnissen erwiesen haben. Dazu gehören etwa das Abschneiden von Parteien bei vergangenen Wahlen, historische Umfragedaten und die Information darüber, ob eine Partei den Kanzler oder die Kanzlerin stellte. In anderen Worten lernt die strukturelle Komponente aus den Regelmäßigkeiten aller vergangenen Bundestagswahlen. Das frühzeitige Vorhandensein dieser Informationen (bereits 200 Tage vor der Wahl) erlaubt uns so eine frühe Vorhersage des Wahlausgangs.

Die strukturelle Komponente allein ist jedoch oft nicht ausreichend, um kurzfristige Neujustierungen im Parteiensystem oder Schwankungen in der politischen Stimmung abzubilden. Wir benutzen deshalb veröffentlichte Werte der sogenannten Sonntagsfrage, um der Dynamik einer Wahl Rechnung zu tragen. Vereinfacht gesagt mischen wir dabei für die eigentliche Prognose die Informationen über die Regelmäßigkeiten der vergangenen Wahlen mit dem was wir gerade in den Umfragen beobachten können. Während die strukturelle Komponente des Modells stabil bleibt, aktualisieren wir unsere Vorhersage mit jeder neu veröffentlichten Umfrage.

Je nachdem, wie weit der Wahlzeitpunkt in der Zukunft liegt, werden die beiden Komponenten unseres Modells unterschiedlich stark gewichtet. Liegt die Wahl beispielsweise noch sehr weit in der Zukunft, ist die allein auf Umfragen basierende Vorhersage sehr unsicher, da diese über Zeit sehr unbeständig sind. Dementsprechend wird zunächst der Vorhersage des strukturellen Modells mehr Gewicht beigemessen. Rückt der Wahltag näher, steigt das Vertrauen des Modells in die Umfragekomponente, da diese präziser wird. Unsere Prognose stellt damit meist einen Kompromiss dar zwischen dem, was man auf Basis der historischen Daten erwarten würde, und dem, was man aktuell in den Umfragen beobachtet. 

Unser Modell wird über einen sogenannten MCMC-Algorithmus geschätzt. Dabei wird – bildlich gesprochen – der Wahlausgang viele Male simuliert; zum Beispiel 100.000 mal. Aus diesen Simulationen lassen sich dann Wahrscheinlichkeiten für alle Ereignisse berechnen, die unmittelbar mit den vorhergesagten Parteianteilen in Verbindung stehen. Liegt beispielsweise in etwa 80.000 der Simulationen die CDU/CSU vor der SPD, entspricht dies einer geschätzten Wahrscheinlichkeit von 80%, dass die CDU/CSU bei der Wahl besser als die SPD abschneidet.


#### Das Wahlkreismodell

Vor Ort in den Wahlkreisen fokussiert sich der Wahlkampf häufig auf die Frage: Wer wird direkt in den nächsten Bundestag gewählt? Die Erststimme entscheidet zudem direkt über die personelle Zusammensetzung des Bundestags. Die 299 Wahlkreisgewinner:innen bekommen ihr Mandat im nächsten Bundestag – unabhängig davon, wie ihre Partei insgesamt abschneidet. Es ist also durchaus von Interesse, wer in welchem Wahlkreis gewinnt. Mindestens genauso spannend ist es, vor dem Wahlabend eine Einschätzung darüber zu haben, in welchen Wahlkreisen die Rennen besonders eng werden könnten. Anhand unseres Wahlkreismodells können wir berechnen, wie wahrscheinlich die Kandidatin oder der Kandidat jeder Partei den Wahlkreis gewinnen kann.

Unsere Wahlkreisprognose basiert auf mehreren Annahmen, die uns von unseren simulierten Zweitstimmenergebnissen zu den 299 potenziellen Wahlkreisgewinner:innen bringen.

Zunächst berechnen wir den bundesweiten proportionalen „Swing“ (also die Veränderung des Ergebnisses für eine Partei zwischen zwei Wahlen) zwischen dem Wahlergebnis von 2017 und jedem unserer Simulationsergebnisse. Die CDU/CSU hatte 2017 zum Beispiel 30,2% der Zweitstimmen für sich gewonnen. Hat die CDU/CSU in einem Simulationsergebnis unseres Modells nun 25%, dann sind das 5,2 Prozentpunkte weniger als 2017, oder proportional -17,2% (man beachte den Unterschied zwischen Prozent und Prozentpunkten).

Dann übertragen wir diesen proportionalen Swing auf die Wahlkreisergebnisse (umgerechnet auf die Wahlkreise für 2021) von 2017 und erhalten so simulierte Verteilungen von Zweitstimmen in jedem der 299 Wahlkreise. Hatte die CDU/CSU in einem Wahlkreis 2017 zum Beispiel 50% der Zweitstimmen, so sind es mit der Annahme des proportionalen Swings nun noch 41,4%. Hatte die CDU/CSU in einem anderen Wahlkreis 2017 nur 35% der Zweitstimmen, so sind es nun noch 28,9%. Diesen Swing berechnen wir für alle Parteien, alle Wahlkreise und alle Simulationsdurchläufe.

Um von den Zweitstimmen im Wahlkreis auf Erststimmen zu kommen, benötigen wir eine weitere Annahme: Wie verhalten sich Erst- und Zweitstimmen im Wahlkreis zueinander? Dafür nehmen wir zunächst an, dass das Verhältnis von Erst- zu Zweitstimmen im Wahlkreis genauso sein wird wie 2017. Dieses Verhältnis tauschen wir in Wahlkreisen, in denen bisherige Wahlkreisgewinner:innen nicht wieder antreten, durch einen durchschnittlichen Kandidierenden der gleichen Partei im selben Bundesland aus. Genauso gehen wir bei populären, nicht wieder antretenden Nicht-Gewinner:innen vor. Damit bekommen wir nun Simulationsverteilungen für alle Kandidierenden in jedem Wahlkreis. Für jede Simulation bekommen wir dann eine Person, die das Direktmandat im Wahlkreis gewinnt. Um daraus Wahrscheinlichkeiten zu berechnen, addieren wir die Wahlkreisgewinner:innen der Parteien über alle Simulationen und teilen die Summe durch die Anzahl unserer Simulationen.

Hier liegt auch der Unterschied zu anderen Wahlkreisprognosen. Wir können etwas dazu sagen, wie (un)sicher unsere Vorhersagen der Wahlkreisgewinner:innen sind. Das funktioniert, weil wir, wie oben beschrieben, für jeden der in einem Wahlkreis kandidierenden Personen eine Wahrscheinlichkeit berechnen, mit der sie ihren Wahlkreis gewinnen können.