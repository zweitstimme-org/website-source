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
| Unsicherheit | 5/6-Intervall der Landesanteile | **Band** der Erststimmen (Spanne von niedrig bis hoch über die Simulationen) + P(Sieg) |
| Kandidierende | Spitzenkandidierende nur indirekt (über Umfragen) | Namen zur Orientierung; **ohne** Einfluss auf die Prognose |

Die Karte färbt jeden Wahlkreis nach der Partei mit der höchsten Siegchance. Klick öffnet Details: Erststimmen-Band, Vergleich zur letzten Wahl und — soweit bekannt — den Namen der Direktkandidierenden.

### Die Idee: uniformer Swing

Direktmandats-Umfragen gibt es für die meisten Wahlkreise nicht. Was wir haben:

1. das **Ergebnis der letzten Landtagswahl** (Erst- und Zweitstimme) je Wahlkreis, und
2. unsere aktuelle **landesweite Zweitstimmen-Prognose**.

Daraus bilden wir einen **uniformen Swing**: Jeder Wahlkreis bewegt sich um denselben landesweiten Veränderungsschritt — die lokalen Stärken und Schwächen der letzten Wahl bleiben relativ erhalten.

Das ist bewusst eine transparente Baseline. In einer [Vergleichsstudie in *Electoral Studies*](https://doi.org/10.1016/j.electstud.2026.103104) haben wir für **Bundestagswahlen** untersucht, wie unterschiedliche Swing-Annahmen (u. a. uniform vs. proportional) Sitzprognosen beeinflussen: Die Unterschiede sind oft moderat, die Wahl der Annahme prägt aber die Präzision. Landtagswahlen haben wir dort nicht separat ausgewertet — der Mechanismus (landesweiter Trend → Wahlkreise) ist aber derselbe, und ohne flächendeckende Erststimmen-Umfragen bleibt der uniforme Swing die nachvollziehbarste Umsetzung.

<div class="meth-fig" aria-label="Ablauf der Wahlkreis-Vorhersage">
  <p class="meth-fig-title">Von der letzten Wahl zum Direktmandat</p>
  <ol class="meth-pipeline">
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">1</div>
      <div class="meth-pipeline-title">Letzte Wahl</div>
      <div class="meth-pipeline-text">Erst- und Zweitstimmen je Wahlkreis sowie landesweiter Zweitanteil</div>
    </li>
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">2</div>
      <div class="meth-pipeline-title">Landesprognose</div>
      <div class="meth-pipeline-text">Aktuelle Zweitstimmen-Anteile und Unsicherheit aus dem Landtagsmodell</div>
    </li>
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">3</div>
      <div class="meth-pipeline-title">Zweit-Swing</div>
      <div class="meth-pipeline-text">Gleichmäßige Verschiebung aller Wahlkreise gegenüber der letzten Wahl</div>
    </li>
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">4</div>
      <div class="meth-pipeline-title">Erststimme</div>
      <div class="meth-pipeline-text">Zweit + Abstand Erst−Zweit der letzten Wahl im Wahlkreis</div>
    </li>
    <li class="meth-pipeline-step">
      <div class="meth-pipeline-n">5</div>
      <div class="meth-pipeline-title">Simulation</div>
      <div class="meth-pipeline-text">Tausende Züge → Siegchance und Unsicherheitsband</div>
    </li>
  </ol>
</div>

### Schritt für Schritt

**1. Ausgangspunkt: letzte Wahl**  
Für jeden Wahlkreis liegen die Erst- und Zweitstimmenanteile der letzten Landtagswahl (bzw. AGH-Wahl) vor. Daraus berechnen wir auch den landesweiten Zweitstimmenanteil von damals.

**2. Landesprognose als Ziel**  
Die aktuelle [Zweitstimmen-Vorhersage](/blog/posts/state-forecast-methodology/) liefert für jede Partei eine Punktschätzung und ein 5/6-Unsicherheitsintervall. Daraus ziehen wir in jeder Simulation ein plausibles landesweites Ergebnis.

**3. Uniformer Zweitstimmen-Swing**  
In jedem Wahlkreis gilt näherungsweise:

<div class="meth-formula">
  Zweit<sub>neu</sub> = Zweit<sub>letzte Wahl</sub> + (Land<sub>neu</sub> − Land<sub>letzte Wahl</sub>)
</div>

Dabei ist **Zweit** der Zweitstimmenanteil **im Wahlkreis** und **Land** der Zweitstimmenanteil **landesweit** (bei der letzten Wahl bzw. in der aktuellen Landesprognose). Der Term in Klammern ist also der landesweite Stimmungswandel — denselben Schritt addieren wir in jedem Wahlkreis auf das damalige lokale Zweitstimmenergebnis.

Anschließend werden negative Anteile auf null gesetzt und die Anteile wieder auf 100 % normalisiert. So bleibt z. B. ein traditionell starker Wahlkreis relativ stark — er bewegt sich aber mit dem Landestrend.

**4. Von Zweit- zu Erststimme**  
Direktmandate hängen von der **Erststimme** ab. Viele Wähler:innen geben Erst- und Zweitstimme derselben Partei; Abweichungen (Stimmensplitting, lokale Verankerung) zeigen sich schon in **einer** Wahl als Abstand Erst − Zweit je Partei im Wahlkreis. Wir brauchen dafür keine zweite Wahl — wir lesen Erst und Zweit der letzten Wahl und nehmen an, dass dieser Abstand näherungsweise stabil bleibt:

<div class="meth-formula">
  Erst<sub>neu</sub> = Zweit<sub>neu</sub> + (Erst<sub>letzte Wahl</sub> − Zweit<sub>letzte Wahl</sub>)
</div>

**5. Simulation und Siegchance**  
Diesen Ablauf wiederholen wir in **2.000 Simulationen**, jeweils mit einem anderen Zug aus der Landesunsicherheit. In jedem Zug gewinnt im Wahlkreis die Partei mit dem höchsten Erststimmenanteil. Der Anteil der Siege einer Partei ist ihre **Siegwahrscheinlichkeit** P(Sieg); die Karte färbt den Wahlkreis nach der Partei mit dem höchsten Wert.

### So liest man die Darstellung

- **Kartenfarbe** — vorausgesagte Siegerpartei (höchste Siegchance).
- **P(Sieg)** — Anteil der Simulationen, in denen diese Partei das Direktmandat holt. 70 % heißt: in sieben von zehn Zügen gewinnt sie — nicht „sicher“.
- **Erststimmen-Band** — die Spanne der simulierten Erststimmenanteile von niedrig bis hoch (gerundet), ohne separate Punktschätzung in der Liste. Ein **Band** ist also kein einzelner Wert, sondern der Unsicherheitsbereich über die Simulationen. Breite Bänder bedeuten: kleine Änderungen am Landestrend können den Wahlkreis kippen.
- **Vergleichswert der letzten Wahl** — Erststimmenanteil damals, als Orientierung.
- **Namen** — Direktkandidierende, soweit wir sie aus Partei- oder Amtsquellen haben. Fehlt ein Name, heißt das **nicht**, dass niemand kandidiert — oft sind die Wahlkreisvorschläge noch nicht vollständig veröffentlicht. Namen ändern die berechneten Anteile **nicht**.

### Was das Modell bewusst weglässt

- **Keine Effekte der Kandidierenden.** Beliebte oder unbekannte Direktkandidierende, lokale Kampagnen und Skandale stecken nicht im Modell — nur der Landestrend und die historische Struktur.
- **Kein eigenes Erststimmen-Umfragemodell.** Es gibt kaum flächendeckende Wahlkreisumfragen; der Swing ist die transparente Näherung.
- **Keine amtliche Sitzzuteilung in den Koalitionsszenarien.** Die landesweite Mehrheitsrechnung der [Landesprognose](/blog/posts/state-forecast-methodology/#szenarien) bleibt eine Näherung über Zweitstimmenanteile. Zusätzlich zeigen wir unter der Wahlkreis-Karte eine **indikative Größenverteilung** des Landtags bzw. Abgeordnetenhauses (siehe unten).
- **Neue Parteien / Grenzverschiebungen.** Wo bei der letzten Wahl keine Partei existierte (z. B. BSW) oder Wahlkreise neu zugeschnitten wurden, ist der Abstand Erst−Zweit der letzten Wahl unsicherer. In Berlin liefert das Amt für Statistik (AfS BBB) die **Zweitstimmen 2023 bereits auf die Wahlkreise 2026 umgerechnet** (`DL_BE_AGH2026_AGH2023`); wir rechnen nicht selbst um. **Erststimmen** gibt es nur auf den alten Grenzen — dort übernehmen wir sie, wo die lokale Wahlkreisnummer im Bezirk noch existiert; bei neu zugeschnittenen Kreisen setzen wir den Abstand Erst−Zweit auf null.

### Von Direktmandaten zur Parlamentsgröße {#parlamentsgroesse}

Direktmandate allein bestimmen noch nicht die Sitzverteilung. Alle drei Länder nutzen Hare/Niemeyer auf Zweitstimmen — mit Überhang- und Ausgleichsmandaten, die das Parlament vergrößern können:

| Land | Mindestgröße | Ausgleich |
| --- | --- | --- |
| **MV** | 71 | Ausgleich bis höchstens **2×** Überhang; bei gerader Zahl +1 |
| **ST** | 83 | Sitzzahl wird wiederholt um **2×** verbleibende Überhänge erhöht |
| **Berlin** | 130 | in der Regel **voller** Ausgleich (Formel über Direktmandate / Stimmenanteil); Grundmandatsklausel |

Unter der Wahlkreiskarte zeigen wir die simulierte Größenverteilung (Median, Punktschätzung, p90). Das ist **keine** amtliche Sitzzuteilung, sondern dieselbe Swing-Logik wie die Karte, kombiniert mit den landesspezifischen Regeln.

#### Mecklenburg-Vorpommern: unvollständiger Ausgleich

Nur in MV kann der Deckel dazu führen, dass Überhangmandate **nicht vollständig** ausgeglichen werden. Typischer Auslöser: eine Partei gewinnt sehr viele Direktmandate bei einem Zweitstimmenanteil deutlich unter etwa einem Drittel der Landtagsparteien. Historisch hat dieser Deckel bereits gegriffen — 2021 etwa bei der SPD mit drei Überhängen und fünf von sechs möglichen Ausgleichssitzen.

Nach dem aktuellen Forecast (Stand der Simulation):

- In rund **6 %** der Züge greift der Deckel (unvollständiger Ausgleich).
- Der verbleibende Vorteil beträgt fast immer **genau einen** Extra-Sitz (ca. 5 %); **zwei oder mehr** Extra-Sitze nur in ca. **0,6 %** der Simulationen.
- Praktisch betrifft das die **AfD** als Überhangpartei. Andere Parteien erhalten Ausgleichssitze — aber keinen unkompensierten Extra-Sitz zulasten des Proporzes.

**Auswirkung auf Mehrheits-Szenarien:** vernachlässigbar. Vergleicht man Zweitstimmen-Mehrheit, Sitzmehrheit mit vollem Ausgleich und Sitzmehrheit mit MV-Deckel, liegt der Deckel-Effekt bei **unter 0,5 pp**. Ob der Ausgleich vollständig oder gedeckelt ist, ändert die Wahrscheinlichkeit einer absoluten AfD-Mehrheit praktisch **nicht**. In der Swing-Simulation liegt sie unter 1 %; die [Landesprognose](/blog/posts/state-forecast-methodology/#szenarien) weist (gerundet) etwa 2 % aus — beide Werte sind klein, der Unterschied kommt vom Modell, nicht vom Deckel. Deshalb bleiben die Koalitionsszenarien der Landesprognose die Zweitstimmen-Näherung — ohne eigene Sitz-Korrektur für Überhang.

In Berlin gleichen unsere Simulationen den Überhang **vollständig** aus (unvollständiger Ausgleich: 0 %). In ST kann nach mehreren Ausgleichsrunden ein kleiner Restüberhang an der Fraktionsstärke-Grenze stehen bleiben (meist ein Sitz) — die Unsicherheit steckt aber vor allem in der **Parlamentsgröße**.

### Aktuell verfügbar

Die Wahlkreis-Karte erscheint zusammen mit der Landesvorhersage (ab 90 Tage vor dem Wahltermin), derzeit für:

- **Mecklenburg-Vorpommern** (letzte Wahl als Swing-Anker: LTW 2021)
- **Sachsen-Anhalt** (letzte Wahl als Swing-Anker: LTW 2021)
- **Berlin** (letzte Wahl als Swing-Anker: AGH 2023; Zweitstimmen laut AfS auf die Wahlkreise 2026)

Die Wahlkreis-Karte wird **nicht** auf diesen Einzelwahlen „trainiert“ — sie überträgt den aktuellen Landestrend per Swing. Trainiert (bayesianisch, auf vielen Landtagswahlen) ist nur die [landesweite Stimmenprognose](/blog/posts/state-forecast-methodology/).

### Fazit

Die Wahlkreis-Vorhersage ist ein **transparentes Swing-Modell**: letzte Wahl + Landesprognose + stabiler Erst−Zweit-Abstand, ohne Schätzung zu den Kandidierenden. Sie sagt, welche Direktmandate bei dem aktuellen Landestrend plausibel sind — und wo das Rennen eng bleibt. Die Größenverteilung darunter übersetzt das in eine indikative Parlamentsgröße inkl. Überhang/Ausgleich. Für Stimmenanteile und Koalitionsszenarien bleibt die [Landtags-Vorhersage](/blog/posts/state-forecast-methodology/) maßgeblich.

---

**Weitere Informationen finden Sie in unserem [FAQ](/faq).**
