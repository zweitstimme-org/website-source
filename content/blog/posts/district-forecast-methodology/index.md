---
title: "Wie funktioniert unsere Wahlkreis-Vorhersage?"
date: 2026-07-30T10:00:00+02:00
draft: false
---

<style>
.meth-fig {
  margin: 1.35rem 0 1.75rem;
  padding: 1rem 1.1rem 1.05rem;
  border: 1px solid var(--border, #e6e6e6);
  border-radius: 12px;
  background: #fff;
}
.meth-fig-title {
  margin: 0 0 0.15rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.01em;
}
.meth-fig-cap {
  margin: 0.85rem 0 0;
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--secondary, #666);
}
.meth-fig-cap strong { color: #444; font-weight: 600; }
.meth-pipeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.65rem;
}
.meth-pipeline-step {
  position: relative;
  padding: 0.85rem 0.75rem 0.8rem;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  background: #fafafa;
  min-width: 0;
}
.meth-pipeline-step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 1.35rem;
  right: -0.55rem;
  width: 0.45rem;
  height: 0.45rem;
  border-right: 2px solid #c5c9ce;
  border-top: 2px solid #c5c9ce;
  transform: rotate(45deg);
  z-index: 1;
}
.meth-pipeline-n {
  width: 1.45rem;
  height: 1.45rem;
  border-radius: 999px;
  background: #3a4654;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.45rem;
}
.meth-pipeline-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.2rem;
}
.meth-pipeline-text {
  font-size: 0.78rem;
  line-height: 1.35;
  color: #666;
}
.meth-formula {
  margin: 1rem 0;
  padding: 0.85rem 1rem;
  border-left: 3px solid #3a4654;
  background: #f7f8f9;
  border-radius: 0 8px 8px 0;
  font-size: 0.92rem;
  line-height: 1.45;
  color: #222;
}
.meth-formula code {
  font-size: 0.88em;
  background: transparent;
  padding: 0;
}
@media (max-width: 900px) {
  .meth-pipeline { grid-template-columns: 1fr 1fr; }
  .meth-pipeline-step:nth-child(2)::after,
  .meth-pipeline-step:nth-child(4)::after { display: none; }
}
@media (max-width: 480px) {
  .meth-pipeline { grid-template-columns: 1fr; }
  .meth-pipeline-step::after { display: none !important; }
}
</style>

## Die Wahlkreis-Vorhersage bei Zweitstimme.org

Neben der [landesweiten Stimmenprognose](/blog/posts/state-forecast-methodology/) zeigen wir für anstehende Landtagswahlen (und das Berliner Abgeordnetenhaus) eine Karte der **Direktmandate nach Wahlkreis**: Welche Partei gewinnt voraussichtlich wo das Direktmandat — und wie sicher ist das?

Dieser Artikel erklärt das Modell hinter der Karte. Kurz gesagt: Wir nehmen die **Landesprognose** und verteilen den landesweiten Stimmungswandel **gleichmäßig** auf alle Wahlkreise. Effekte der Kandidierenden fließen (noch) nicht in die Sitzprognose ein.

### Was die Karte beantwortet — und was nicht

| | **Landesprognose** | **Wahlkreis-Karte** |
|---|---|---|
| Frage | Wie fallen die **Zweitstimmen** landesweit aus? | Wer gewinnt das **Direktmandat** (Erststimme) im Wahlkreis? |
| Einheit | Prozentanteile + Szenarien | Karte + Siegchancen je Wahlkreis |
| Unsicherheit | 5/6-Unsicherheitsintervall der Landesanteile | **95 %-Unsicherheitsintervall** der Erststimmen (+ P(Sieg)) |
| Kandidierende | Spitzenkandidierende nur indirekt (über Umfragen) | Namen zur Orientierung; **ohne** Einfluss auf die Prognose |

Klare Favoriten (Siegchance ab etwa zwei Dritteln, Zweite höchstens ein Drittel) färbt die Karte **einfarbig** in der Parteifarbe — die Intensität folgt der Siegchance. Offene und tendenziell knappe Wahlkreise bekommen **Streifen** in den Farben aller Parteien mit mehr als 10 % Siegchance; die Streifenbreite folgt ungefähr diesen Anteilen. Klick öffnet Details: 95 %-Unsicherheitsintervall der Erststimme, Vergleich zur letzten Wahl und — soweit bekannt — den Namen der Direktkandidierenden.

### Die Idee: proportionaler Swing + geschätzte Erststimme

Direktmandats-Umfragen gibt es für die meisten Wahlkreise nicht. Was wir haben:

1. **Wahlergebnisse je Wahlkreis** aus der letzten und der vorletzten Wahl (Erst und Zweit), und
2. unsere aktuelle **landesweite Zweitstimmen-Prognose**.

Daraus bauen wir — analog zur [Bundestags-Wahlkreisvorhersage](https://doi.org/10.1016/j.electstud.2026.103104) — zwei Stufen: einen **proportionalen Zweitstimmen-Swing** und eine **geschätzte Erststimmen-Gleichung** mit Koeffizienten aus vergangenen Landtags-/AGH-Übergängen.

<div class="meth-fig" aria-label="Ablauf der Wahlkreis-Vorhersage">
  <p class="meth-fig-title">Von der letzten Wahl zum Direktmandat</p>
  <ol class="meth-pipeline">
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">1</div>
      <div class="meth-pipeline-title">Historische Wahlen</div>
      <div class="meth-pipeline-text">Erst/Zweit je Wahlkreis — letzte Wahl als Anker, vorletzte für die Schätzung</div>
    </li>
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">2</div>
      <div class="meth-pipeline-title">Landesprognose</div>
      <div class="meth-pipeline-text">Aktuelle Zweitstimmen-Anteile und Unsicherheit aus dem Landtagsmodell</div>
    </li>
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">3</div>
      <div class="meth-pipeline-title">Zweit-Swing</div>
      <div class="meth-pipeline-text">Proportionaler Swing: lokale Zweit × (1 + relativer Landestrend)</div>
    </li>
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">4</div>
      <div class="meth-pipeline-title">Erststimme</div>
      <div class="meth-pipeline-text">OLS: Erst ≈ β₁·Zweit + β₂·Erst<sub>letzte Wahl</sub> (+ Indikator ohne Kandidatur damals)</div>
    </li>
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">5</div>
      <div class="meth-pipeline-title">Simulation</div>
      <div class="meth-pipeline-text">4.000 Posterior-Züge der Landesprognose + Koeffizienten → Siegchance und Band</div>
    </li>
  </ol>
</div>

### Schritt für Schritt

**1. Trainingsdaten**  
Geschätzt wird über gestapelte Wahlkreis×Partei-Beobachtungen aus:

- **MV:** 2011→2016 und 2016→2021 (Absolutstimmen, gleiche 36er-Geographie)
- **ST:** 2016→2021 (2021 Absolutstimmen; 2016 als amtliche vergleichbare %-Anteile auf 2021er Kreise)
- **BE:** 2016→2023 (Absolutstimmen im Ergebnisbericht, auf 2023er Wahlkreise)

**2. Landesprognose als Ziel**  
Die aktuelle [Zweitstimmen-Vorhersage](/blog/posts/state-forecast-methodology/) liefert **4.000 Posterior-Züge**. Jede Wahlkreis-Simulation verwendet eines dieser landesweiten Ergebnisse — dieselben Züge wie Punktschätzung, 5/6-Intervall und Szenarien. Zusätzlich kommt die Unsicherheit der Erststimmen-Regression (Koeffizienten + Restfehler).

**3. Proportionaler Zweitstimmen-Swing**  
Wie in der Bundestags-Wahlkreislogik:

<div class="meth-formula">
  Zweit<sub>neu</sub> = Zweit<sub>letzte Wahl</sub> × (1 + (Land<sub>neu</sub> − Land<sub>letzte Wahl</sub>) / Land<sub>letzte Wahl</sub>)
</div>

Starke Wahlkreise bleiben relativ stark; der relative Landestrend wird proportional übertragen. Anschließend Normalisierung auf 100 %.

**4. Geschätzte Erststimme**  
Direktmandate hängen von der Erststimme ab. Die Gleichung wird nur mit **Vorwahl-Information** kalibriert — dieselbe Informationsmenge wie live: Zweit im Wahlkreis ist die **Swing-Projektion** aus der vorigen Wahl (nicht das spätere Ist-Zweit der Zielwahl); dazu Erst der vorigen Wahl. Geschätzt wird (gepoolt über die Übergänge oben):

<div class="meth-formula">
  Erst = β₀ + β₁·Zweit<sub>projiziert</sub> + β₂·Erst<sub>letzte Wahl</sub> + β₃·(keine Erststimme zuletzt)
</div>

Kandidierenden-Merkmale (Incumbency usw.) fehlen noch — anders als im vollen Bundestags-Modell. Neue Parteien (z. B. BSW) stecken vor allem über die Zweitstimme und den Restanteil.

**5. Simulation und Siegchance**  
4.000 Züge: jeweils der zugehörige Posterior-Zug der Landesprognose **und** ein Zug aus der Koeffizienten-Unsicherheit (+ Restfehler). Sieger im Wahlkreis = höchste Erststimme; P(Sieg) = Anteil der Siege.

### So liest man die Darstellung

- **Kartenfarbe** — einfarbig bei klarem Favoriten (P ≥ 66 %, Zweite ≤ 33 %); sonst Streifen für offen/tendenziell (alle Parteien &gt;10 %, Breite ≈ P).
- **P(Sieg)** — Anteil der Simulationen, in denen diese Partei das Direktmandat holt. 70 % heißt: in sieben von zehn Zügen gewinnt sie — nicht „sicher“.
- **95 %-Unsicherheitsintervall (Erststimme)** — Mittelwert ± 1,96·SD über die Simulationen (Normalnäherung), analog zum 5/6-Intervall der Landesprognose. Ohne separate Punktschätzung in der Liste. Breite Intervalle bedeuten: kleine Änderungen am Landestrend können den Wahlkreis kippen.
- **Vergleichswert der letzten Wahl** — Erststimmenanteil damals, als Orientierung.
- **Namen** — Direktkandidierende, soweit wir sie aus Partei- oder Amtsquellen haben. In **Sachsen-Anhalt** liegt das amtliche Bewerberverzeichnis vor: fehlt eine Partei in einem Wahlkreis, tritt sie dort **nicht** an — wir setzen ihren Erststimmenanteil auf 0 und normalisieren die übrigen auf 100 %. In MV und Berlin heißt ein fehlender Name dagegen oft noch „noch nicht veröffentlicht“, nicht „niemand kandidiert“. Namen und Incumbency ändern die berechneten Anteile ansonsten **nicht** (keine weiteren Kandidierenden-Kovariaten).

### Was das Modell bewusst weglässt

- **Keine Effekte der Kandidierenden.** Incumbency, Listenplatz, Bekanntheit usw. stecken noch nicht in der Erst-Gleichung (im Bundestags-Modell schon).
- **Kein eigenes Erststimmen-Umfragemodell.** Es gibt kaum flächendeckende Wahlkreisumfragen; Swing + Regression sind die Näherung.
- **Keine amtliche Sitzzuteilung in den Koalitionsszenarien.** Die landesweite Mehrheitsrechnung der [Landesprognose](/blog/posts/state-forecast-methodology/#szenarien) bleibt eine Näherung über Zweitstimmenanteile. Zusätzlich zeigen wir unter der Wahlkreis-Karte eine **indikative Größenverteilung** des Landtags bzw. Abgeordnetenhauses (siehe unten).
- **Grenzen und Umschlüsselung.** Wahlkreiszuschnitte ändern sich. Für Berlin nutzen wir die amtliche Umschlüsselung der Zweitstimmen von 2023 auf die Gebiete von 2026; Erststimmen nur dort, wo die lokale Nummer noch passt. In Sachsen-Anhalt stammen die 2016er Vergleichswerte auf 2021er Kreisen aus amtlichen %-Angaben (mit Briefwahl-Näherung).

### Von Direktmandaten zur Parlamentsgröße {#parlamentsgroesse}

Direktmandate allein bestimmen noch nicht die Sitzverteilung. Alle drei Länder nutzen Hare/Niemeyer auf Zweitstimmen — mit Überhang- und Ausgleichsmandaten, die das Parlament vergrößern können:

| Land | Mindestgröße | Letzte Wahl | Ausgleich |
| --- | --- | --- | --- |
| **MV** | 71 | 79 Sitze, 70,8 % (2021) | Ausgleich bis höchstens **2×** Überhang; bei gerader Zahl +1 |
| **ST** | 83 | 97 Sitze, 60,3 % (2021) | Sitzzahl wird wiederholt um **2×** verbleibende Überhänge erhöht |
| **Berlin** | 130 | 159 Sitze, 62,9 % (2023) | in der Regel **voller** Ausgleich (Formel über Direktmandate / Stimmenanteil); Grundmandatsklausel |

Unter der Wahlkreiskarte zeigen wir die simulierte Größenverteilung (Median, Punktschätzung, p90). Das ist **keine** amtliche Sitzzuteilung, sondern dieselbe Swing-Logik wie die Karte, kombiniert mit den landesspezifischen Regeln.

#### Mecklenburg-Vorpommern: unvollständiger Ausgleich

Nur in MV kann der Deckel dazu führen, dass Überhangmandate **nicht vollständig** ausgeglichen werden. Typischer Auslöser: eine Partei gewinnt sehr viele Direktmandate bei einem Zweitstimmenanteil deutlich unter etwa einem Drittel der Landtagsparteien. Historisch hat dieser Deckel bereits gegriffen — 2021 etwa bei der SPD mit drei Überhängen und fünf von sechs möglichen Ausgleichssitzen.

Nach dem aktuellen Forecast (Stand der Simulation):

- In rund **0,6 %** der Züge greift der Deckel (unvollständiger Ausgleich).
- Der verbleibende Vorteil ist dann praktisch immer **genau ein** Extra-Sitz.
- Überhangpartei in den Simulationen vor allem **SPD** oder **AfD**. Andere Parteien erhalten Ausgleichssitze — aber keinen unkompensierten Extra-Sitz zulasten des Proporzes.

**Auswirkung auf Mehrheits-Szenarien:** vernachlässigbar. Vergleicht man Zweitstimmen-Mehrheit, Sitzmehrheit mit vollem Ausgleich und Sitzmehrheit mit MV-Deckel, liegt der Deckel-Effekt bei **unter 0,5 pp**. Ob der Ausgleich vollständig oder gedeckelt ist, ändert die Wahrscheinlichkeit einer absoluten AfD-Mehrheit praktisch **nicht**. In der Swing-Simulation liegt sie unter 1 %; die [Landesprognose](/blog/posts/state-forecast-methodology/#szenarien) weist (gerundet) etwa 2 % aus — beide Werte sind klein, der Unterschied kommt vom Modell, nicht vom Deckel. Deshalb bleiben die Koalitionsszenarien der Landesprognose die Zweitstimmen-Näherung — ohne eigene Sitz-Korrektur für Überhang.

In Berlin gleichen unsere Simulationen den Überhang **vollständig** aus (unvollständiger Ausgleich: 0 %). In ST kann nach mehreren Ausgleichsrunden ein kleiner Restüberhang an der Fraktionsstärke-Grenze stehen bleiben (meist ein Sitz) — die Unsicherheit steckt aber vor allem in der **Parlamentsgröße**.

### Aktuell verfügbar

Die Wahlkreis-Karte erscheint zusammen mit der Landesvorhersage (ab 90 Tage vor dem Wahltermin), derzeit für:

- **Mecklenburg-Vorpommern** (Anker LTW 2021; Training inkl. 2011/2016)
- **Sachsen-Anhalt** (Anker LTW 2021; Training mit vergleichbaren Anteilen 2016)
- **Berlin** (Anker AGH 2023→2026; Training 2016→2023)

Die [landesweite Stimmenprognose](/blog/posts/state-forecast-methodology/) bleibt separat bayesianisch auf vielen Landtagswahlen trainiert; die Wahlkreis-Stufe kalibriert zusätzlich den Weg von Zweit- zu Erststimme.

### Fazit

Die Wahlkreis-Vorhersage ist ein **kalibriertes Swing-Modell** im Stil der Bundestags-Wahlkreise: proportionaler Zweit-Swing + geschätzte Erststimme aus historischen Übergängen — noch ohne Kandidierenden-Effekte. Sie sagt, welche Direktmandate beim aktuellen Landestrend plausibel sind — und wo das Rennen eng bleibt. Die Größenverteilung darunter übersetzt das in eine indikative Parlamentsgröße inkl. Überhang/Ausgleich. Für Stimmenanteile und Koalitionsszenarien bleibt die [Landtags-Vorhersage](/blog/posts/state-forecast-methodology/) maßgeblich.

---

**Weitere Informationen finden Sie in unserem [FAQ](/faq).**
