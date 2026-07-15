---
title: "Wie werden die Werte für Bundes- und Landesdiagramme berechnet?"
date: 2025-08-24T10:00:00+02:00
draft: false
---

## Die Berechnung der Umfragewerte bei Zweitstimme.org

Die Diagramme auf Zweitstimme.org zeigen nicht einfach nur einzelne Umfragen, sondern berechnete Werte, die mit einem mathematischen Verfahren namens **Kalman-Filter** ermittelt werden. In diesem Beitrag erklären wir, wie diese Werte für Bundes- und Landtagswahlen berechnet werden und warum diese Methode aussagekräftiger ist als einzelne Umfragen.

### Warum Kalman-Filter statt Einzelumfragen?

Einzelne Umfragen können durch verschiedene Faktoren verzerrt werden: unterschiedliche Befragungsmethoden, Stichprobengrößen, oder zeitliche Schwankungen in der Stimmung. Der Kalman-Filter kombiniert alle verfügbaren Umfragen zu einer stabilen und zuverlässigen Schätzung der aktuellen politischen Stimmung.

### Die Datenbasis

Unsere Berechnungen basieren auf Umfragedaten von verschiedenen renommierten Instituten, die wir über eine externe API beziehen. Die Daten umfassen:

- **Bundesumfragen**: Alle Umfragen zur Bundestagswahl
- **Landesumfragen**: Umfragen zu den 16 deutschen Landesparlamenten
- **Zeitraum**: Die letzten 10 Jahre für historische Trends
- **Parteien**: CDU/CSU, SPD, AfD, GRÜNE, LINKE, BSW, FDP und Sonstige

### Die Berechnungsmethode: Dynamische Lineare Modelle mit Kalman-Filterung

#### Was ist der Kalman-Filter?

Der Kalman-Filter ist ein mathematisches Verfahren, das ursprünglich für die Navigation von Raumfahrzeugen entwickelt wurde. Er kombiniert kontinuierlich neue Informationen (Umfragen) mit bisherigen Schätzungen und passt sich automatisch an die Qualität und Menge der verfügbaren Daten an.

#### Wie funktioniert die Berechnung?

1. **Datensammlung**: Wir sammeln alle verfügbaren Umfragen der letzten 10 Jahre
2. **Tägliche Schätzungen**: Für jeden Tag berechnen wir eine Schätzung der Parteienunterstützung
3. **Glättung**: Der Kalman-Filter glättet kurzfristige Schwankungen und füllt Lücken zwischen Umfragen
4. **Aktuelle Werte**: Die aktuell angezeigten Werte sind die neuesten Schätzungen des Kalman-Filters

#### Mathematische Grundlagen

Der Kalman-Filter verwendet ein **Dynamisches Lineares Modell (DLM)** mit folgenden Komponenten:

- **Zustandsgleichung**: Beschreibt, wie sich die Unterstützung von Tag zu Tag entwickelt
- **Beobachtungsgleichung**: Beschreibt, wie Umfragen die wahre Unterstützung messen
- **Rauschmodell**: Berücksichtigt Unsicherheiten in den Daten

#### Beispiel: CDU/CSU in Bundesumfragen

Angenommen, wir haben folgende Umfragen für die CDU/CSU:
- 15. August: 28% (Forsa, 1000 Befragte)
- 18. August: 30% (Infratest, 1200 Befragte)
- 20. August: 27% (Emnid, 800 Befragte)

Der Kalman-Filter:
1. **Kombiniert** alle drei Umfragen
2. **Gewichtet** sie nach Qualität und Aktualität
3. **Glättet** die Schwankungen
4. **Ergibt** eine stabile Schätzung von etwa 28,5%

### Vorteile der Kalman-Filterung

#### 1. Stabilität
- Kurzfristige Schwankungen werden herausgefiltert
- Ausreißer haben weniger Einfluss
- Stetige Entwicklung der Schätzungen

#### 2. Lückenfüllung
- Tage ohne Umfragen werden interpoliert
- Kontinuierliche Zeitreihen
- Keine abrupten Sprünge

#### 3. Unsicherheitsquantifizierung
- Je mehr Daten, desto sicherer die Schätzung
- Automatische Anpassung an Datenqualität
- Berücksichtigung von Messfehlern

#### 4. Adaptivität
- Passt sich an neue Daten an
- Berücksichtigt systematische Unterschiede zwischen Instituten
- Lernt aus historischen Mustern

### Historische Trends

Für die historischen Verläufe verwenden wir denselben Kalman-Filter über einen Zeitraum von 10 Jahren. Dies ermöglicht:

- **Langfristige Trends**: Entwicklung der Parteien über Jahre
- **Saisonale Muster**: Wiederkehrende Schwankungen
- **Strukturelle Brüche**: Erkennung von fundamentalen Änderungen

### Parteikonsolidierung

Nicht alle Umfrageinstitute verwenden dieselben Parteinamen. Wir konsolidieren die Daten in ein einheitliches Schema:

- **CDU/CSU**: Christlich Demokratische Union / Christlich-Soziale Union
- **SPD**: Sozialdemokratische Partei Deutschlands  
- **AfD**: Alternative für Deutschland
- **GRÜNE**: Bündnis 90/Die Grünen
- **LINKE**: Die Linke (inkl. historische PDS)
- **BSW**: Bündnis Sahra Wagenknecht
- **FDP**: Freie Demokratische Partei
- **Sonstige**: Alle anderen Parteien (als Rest berechnet)

### Qualitätskontrolle

Unsere Berechnungen unterliegen mehreren Qualitätskontrollen:

1. **Mindestanzahl Umfragen**: Wir zeigen nur Werte an, wenn ausreichend Daten verfügbar sind
2. **Plausibilitätsprüfung**: Werte werden auf realistische Bereiche überprüft
3. **Konsistenzprüfung**: Die Summe aller Parteien sollte etwa 100% ergeben
4. **Stabilitätsprüfung**: Abrupte Änderungen werden auf Plausibilität geprüft

### Aktualisierung der Daten

Die Berechnungen werden automatisch aktualisiert, sobald neue Umfragen verfügbar sind:

- **Täglich**: Überprüfung auf neue Umfragen
- **Bei neuen Daten**: Sofortige Neuberechnung mit Kalman-Filter
- **Wöchentlich**: Vollständige Neuberechnung der 10-Jahres-Trends

### Vergleich mit anderen Methoden

Unsere Kalman-Filter-Methode unterscheidet sich von anderen Aggregatoren:

- **Gewichtete Durchschnitte**: Berücksichtigen nur aktuelle Umfragen
- **Einfache Mittelwerte**: Ignorieren Datenqualität und zeitliche Entwicklung
- **Moving Averages**: Verwenden feste Zeitfenster

Der Kalman-Filter kombiniert die Vorteile aller Methoden und passt sich automatisch an die verfügbaren Daten an.

### Wissenschaftliche Grundlagen

Die verwendete Methode basiert auf etablierten statistischen Verfahren:

- **Bayesianische Statistik**: Kombination von Vorwissen und neuen Daten
- **Zeitreihenanalyse**: Berücksichtigung zeitlicher Abhängigkeiten
- **Optimalfilterung**: Minimierung des Schätzfehlers

### Fazit

Die Berechnung der Umfragewerte bei Zweitstimme.org verwendet den Kalman-Filter, ein hochentwickeltes mathematisches Verfahren, das alle verfügbaren Umfragen optimal kombiniert. Durch die Glättung von Schwankungen und die Berücksichtigung von Unsicherheiten erhalten wir stabilere und zuverlässigere Schätzungen der politischen Stimmung als einfache Durchschnitte oder einzelne Umfragen.

Die verwendeten Methoden basieren auf wissenschaftlichen Standards und werden kontinuierlich überprüft und verbessert. So können wir unseren Nutzern die bestmöglichen Einschätzungen der aktuellen politischen Lage bieten.

---

**Weitere Informationen zur Methodik finden Sie in unserem Beitrag [Wie ist die Berechnung?](/faq#wie-ist-die-berechnung).**
