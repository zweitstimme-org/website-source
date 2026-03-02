---
title: "FAQ"
layout: "page"
summary: "Häufige Fragen"
url: "/faq"
---


# FAQ

## Wie funktionieren die Wahlkreisvorhersagen?

Unser Modell sagt die Wahrscheinlichkeiten für Direktmandate in den 299 Wahlkreisen voraus. Es basiert auf bundesweiten Zweitstimmenprognosen, die proportional auf Wahlkreise heruntergebrochen werden, sowie einem vereinfachten Regressionsmodell. Dieses berücksichtigt Parteistimmen, Ergebnisse der letzten Wahl und den Amtsinhaberstatus.

Für die Bundestagswahl 2025 simulieren wir die Erststimmenergebnisse, obwohl uns noch nicht alle Kandidateninformationen vorliegen. In der Vergangenheit lag die Genauigkeit unserer Vorhersagen bei 80–90%.

## Wie funktioniert die Gesamtvorhersage?

Unser Modell zur Vorhersage der Zweitstimme kombiniert zwei Komponenten: ein Fundamentaldaten-Modell und ein Umfragedaten-Modell.

Das Fundamentaldaten-Modell berücksichtigt langfristige Parteibindungen (z. B. Ergebnisse der letzten Wahl), frühe Umfragen (230–200 Tage vor der Wahl) und welche Partei aktuell die Regierung stellt. Das Umfragedaten-Modell integriert aktuelle Meinungsumfragen (Quelle: [wahlrecht.de](https://wahlrecht.de)).

## Welche Daten fließen in die Vorhersagen ein?

Die Modelle berücksichtigen Ergebnisse der letzten Wahl, frühe Umfragen (230–200 Tage vor der Wahl), die Unterstützung der amtierenden Regierung sowie aktuelle Meinungsumfragen (Quelle: [wahlrecht.de](https://wahlrecht.de)).

Für die Wahlkreisvorhersagen berücksichtigen wir außerdem lokale Faktoren wie Amtsinhaberstatus, vergangene Wahlergebnisse auf Wahlkreisebene sowie das Ergebnis unserer Zweitstimmenvorhersage.

## Wie werden die Wahrscheinlichkeiten berechnet?

Zur Berechnung der Wahrscheinlichkeiten ziehen wir 10.000 Stichproben aus der Vorhersageverteilung. Die Wahrscheinlichkeit für ein Ereignis ergibt sich dann aus dem Anteil der Stichproben, in denen das Ereignis eintritt, z.B. dass eine Partei die 5%-Hürde überschreitet oder eine Koalition eine Mehrheit erhält.

## Wann wird die Vorhersage aktualisiert?

Das Vorhersagemodell überprüft jeden Abend, ob eine neue Wahlumfrage veröffentlicht wurde. Ist dies der Fall, werden die Berechnungen über Nacht durchgeführt, spätestens am nächsten Morgen stehen dann die aktualisierten Vorhersagen online.

## Warum ist die Prognose so unsicher? Haben Umfragen nicht immer nur eine Fehlertoleranz von +/- 3 Prozentpunkten?

Grundsätzlich ist es richtig, dass Umfragen mit einer gewissen Unsicherheit behaftet sind. Das hat sowohl statistiche Gründe (es wird eben nur ein mehr oder weniger zufällig ausgewählter kleiner Teil der Bevölkerung befragt) als auch Ursachen, die in den Designentscheidungen der Umfrageinstitute zu finden sind. Das hat Medien dazu bewogen, Ihre Praxis zur [Berichterstattung über Umfragen anzupassen](https://www.zeit.de/politik/deutschland/umfragen-bundestagswahl-neuwahl-wahltrend). Die sogenannte Fehlertoleranz in Umfragen ist allerdings nur eine von vielen Quellen von Unsicherheit in unserer Vorhersage. Wir möchten mit unserem Modell nicht die hypothetische Frage beantworten, die in der Sonntagsfrage gestellt wird ("Wenn am nächsten Sonntag Bundestagswahl wäre..."). Stattdessen geht es darum, den tatsächlichen Wahlausgang vorherzusagen. Dafür gibt es kein Patentrezept. Unsere Unsicherheit ergibt sich letztlich daraus, wie zuverlässig das Modell die Ausgänge vergangener Wahlen vorhersagt. Da Umfragen bisweilen deutlich mehr danebenliegen als die suggerierten +/-3 Prozentpunkte, wäre es überraschend, wenn unsere Vorhersage, die auch noch Differenzen zwischen Umfragen und tatsächlichen Wahlergebnissen berücksichtigen muss, ebenso genau oder sogar noch genauer wäre.

## Weshalb die 5/6-Intervalle?

Unsere Vorhersagen enthalten Unsicherheiten, die wir durch Intervalle ausdrücken. Das 5/6-Intervall zeigt den Bereich, in dem wir das Wahlergebnis mit etwa 83% Wahrscheinlichkeit erwarten.

Im Vergleich zu einem klassischen 95%-Konfidenzintervall ist dieses etwas enger und hilft, die Unsicherheiten präziser darzustellen, ohne extreme Ausreißer zu stark zu gewichten. Es bietet also eine ausgewogene Einschätzung der Vorhersagegenauigkeit.

## Was unterscheidet die Prognosen von Wahlumfragen?

Aktuelle Umfragen stellen einen wichtigen Teil unserer Datengrundlage dar. Außerdem gilt: Je näher der Wahltag rückt, desto mehr Gewicht haben veröffentlichte Umfragen für unsere Vorhersagen. Allerdings hat sich bei vergangenen Bundestagswahlen gezeigt, dass Umfragen vor der Wahl manchmal danebenliegen können. Deshalb haben wir zusätzlich ein Modell entwickelt, dass unter anderem historische Zusammenhänge zwischen dem Wahlergebnis einerseits und längerfristigen Parteineigungen sowie über 200 Tage vor der Wahl veröffentlichten Umfragen erfasst und für eine eigene Prognose nutzt. Dieses Modell hilft also bei der Einschätzung, was man "unter normalen Umständen" erwarten würde. Diese Prognose wird dann mit der Information gemischt, die wir aus aktuellen Umfragen gewinnen. Deshalb stellt unsere eigentliche Prognose meist einen Kompromiss dar zwischen dem, was man auf Basis der historischen Daten erwarten würde, und dem, was man aktuell in den Umfragen beobachtet.

Darüber hinaus gibt es das Phänomen von sogenannten Institutseffekten. Das bedeutet, dass Institute ihre gesammelten Umfragedaten unterschiedlich gewichten und auswerten. Dabei kann es vorkommen, dass eine Partei von einem bestimmten Institut systematisch stärker eingeschätzt wird als von einem anderen Institut. Solche Verzerrungen versuchen wir in unserem Modell ebenfalls zu korrigieren.

## Wie gut waren die Prognosen in der Vergangenheit?

In der Vergangenheit lag die Genauigkeit unserer Wahlkreisvorhersagen bei ca. 80–90%. Die Zweitstimmenprognose lag 2017 beispielsweise um 1,4 Prozentpunkte entfernt vom tatsächlichen Ergebnis.

## Wird das Wahlrecht berücksichtigt?

Ja, unser Modell berücksichtigt das aktuelle deutsche Wahlsystem. Das bedeutet, dass wir die 5%-Hürde und nicht vergebene Direktmandate in unseren Vorhersagen berücksichtigen. Das ist vor allem wichtig für die Vorhersage von Wahrscheinlichkeiten für Mehrheiten oder den Eintritt ins Parlament.

## Können die Inhalte weiterverwendet werden?

Ja, die hier zur Verfügung gestellten Informationen können weiterverwendet werden. Die "CC BY-SA 4.0"-Lizenz (Creative Commons Attribution-ShareAlike 4.0) erlaubt es Ihnen, die Inhalte zu nutzen, zu verändern und weiterzugeben, solange Sie bestimmte Regeln einhalten. 

Was dürfen Sie tun?

  - Teilen: Sie dürfen den Inhalt kopieren und weiterverbreiten.
  - Bearbeiten: Sie dürfen den Inhalt verändern oder darauf aufbauen, auch für kommerzielle Zwecke.

Was müssen Sie beachten?

  - Namensnennung (BY): Sie müssen den ursprünglichen Urheber nennen. Das bedeutet:
    - Geben Sie den Namen des Urhebers oder die Quelle an.
    - Fügen Sie einen Hinweis auf die Lizenz hinzu (z. B. "CC BY-SA 4.0").
    - Geben Sie an, ob Sie Änderungen am Original vorgenommen haben.
  - Weitergabe unter gleichen Bedingungen (SA): Wenn Sie den Inhalt bearbeiten oder ein neues Werk daraus erstellen, müssen Sie das Ergebnis ebenfalls unter der gleichen Lizenz (CC BY-SA 4.0) veröffentlichen.

Bei der Verwendung der Inhalte ist zweitstimme.org als Quelle zu nennen, beispielsweise:

"Quelle: zweitstimme.org" oder "Daten: zweitstimme.org"

Wenn Sie weitere Fragen zur Verwendung der Materialien bzw. Informationen haben, treten Sie bitte einfach mit uns in Verbindung!

## Sind Code und Daten des Vorhersagemodells einsehbar?

Ja, der Code und die Daten des Vorhersagemodells sind auf GitHub verfügbar. Sie finden den Code und die Daten unter folgendem Link: [https://github.com/zweitstimme-org/prediction-2025](https://github.com/zweitstimme-org/prediction-2025)

## Was ist die Motivation hinter Zweitstimme.org?

In der jüngsten Vergangenheit gab es einige Ereignisse, die - zumindest in der Wahrnehmung der Öffentlichkeit - den Anschein erweckten, dass Demoskopen und Meinungsforscher immer häufiger mit ihren Prognosen daneben liegen (so etwa die letzte US-Präsidentschaftswahl oder die Brexit-Abstimmung). Dies lag jedoch nicht immer an ungenauen Vorhersagemodellen, sondern auch an der unzureichenden Kommunikation der Unsicherheit der Vorhersagen. Unsere Platform widmet sich genau diesen Punkten: mithilfe unseres statistischen Models wollen wir Journalisten, Experten und Bürgern Information an die Hand geben, die helfen können tatsächlich Parteiunterstützung einzuschätzen und letztlich besser informierte Wahlentscheidungen zu treffen.

## Wer steckt hinter dem Projekt?

Alle Projektbeteiligte sind an Universitäten als Politik- und Datenwissenschaftler tätig. Mit der Veröffentlichung dieser Vorhersage verfolgen wir zwei Ziele: (1) Die Machbarkeit einer dynamischen Wahlvorhersage in Deutschland zu überprüfen und (2) der Öffentlichkeit statistisch fundierte Vorhersagen zu präsentieren und diese so transparent wie möglich zu kommunizieren. Einige Projektbeteiligte sind Mitglieder in politischen Parteien, arbeiten aber weder entgeltlich noch unentgeltlich für diese.

## Wer finanziert das Projekt?

Bis zu dieser Bundestagswahl war Zweitstimme.org ein Hobbyprojekt neben unserer Arbeit als Lehrende und Wissenschaftler. Für die methodische Forschung zu Vorhersagen und zu Konsequenzen von Wahlvorhersagen haben wir im Jahr 2024 Förderung durch die Deutsche Forschungsgemeinschaft (DFG) erhalten. Das [Projekt "Wahlvorhersagen zur Bundestagswahl 2025" wird 2024-2026 gefördert](https://www.mzes.uni-mannheim.de/d7/de/projects/wahlvorhersagen-fuer-die-bundestagswahl-2025). 