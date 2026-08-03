---
title: "Wie funktioniert unsere Landtagswahl-Vorhersage?"
date: 2026-07-15T10:00:00+02:00
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

/* Bias */
.meth-bias-axis {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.5rem;
  font-size: 0.72rem;
  color: #888;
  margin-bottom: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.meth-bias-axis span:first-child { text-align: left; }
.meth-bias-axis span:nth-child(2) { text-align: center; text-transform: none; letter-spacing: 0; color: #666; }
.meth-bias-axis span:last-child { text-align: right; }
.meth-bias-row {
  display: grid;
  grid-template-columns: 5.2rem 1fr 3.2rem;
  align-items: center;
  gap: 0.55rem;
  margin: 0.28rem 0;
}
.meth-bias-party {
  font-size: 0.82rem;
  font-weight: 700;
  text-align: right;
}
.meth-bias-track {
  position: relative;
  height: 14px;
  background: #f3f3f3;
  border-radius: 3px;
  overflow: hidden;
}
.meth-bias-zero {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #bbb;
}
.meth-bias-bar {
  position: absolute;
  top: 2px;
  bottom: 2px;
  border-radius: 2px;
  transition: width 0.7s cubic-bezier(.2,.8,.2,1);
}
.meth-bias-bar--over { left: 50%; }
.meth-bias-bar--under { right: 50%; }
.meth-bias-val {
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}

/* MAE */
.meth-mae {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  align-items: end;
  min-height: 180px;
  padding: 0.25rem 0.25rem 0;
}
.meth-mae-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
}
.meth-mae-val {
  font-size: 1.35rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 0.45rem;
}
.meth-mae-bar-wrap {
  flex: 1;
  width: 100%;
  max-width: 72px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 90px;
}
.meth-mae-bar {
  width: 100%;
  border-radius: 6px 6px 2px 2px;
  background: linear-gradient(180deg, #3a4654 0%, #6b7785 100%);
  transform-origin: bottom;
  animation: meth-grow 0.75s cubic-bezier(.2,.8,.2,1) both;
}
@keyframes meth-grow {
  from { transform: scaleY(0.08); opacity: 0.4; }
  to { transform: scaleY(1); opacity: 1; }
}
.meth-mae-lead {
  margin-top: 0.55rem;
  font-size: 0.84rem;
  font-weight: 700;
  color: #222;
}
.meth-mae-unit {
  font-size: 0.72rem;
  color: #888;
  margin-top: 0.1rem;
}

/* Pipeline */
.meth-pipeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.65rem;
  counter-reset: none;
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

/* Anatomy */
.meth-anatomy-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 0.85rem;
  margin-bottom: 1.6rem;
}
.meth-anatomy-party {
  font-size: 1.05rem;
  font-weight: 700;
}
.meth-anatomy-sub {
  font-size: 0.8rem;
  color: #777;
}
.meth-anatomy-track {
  position: relative;
  height: 28px;
  margin: 2.6rem 0.5rem 2.8rem;
  background: #f0f1f2;
  border-radius: 6px;
}
.meth-anatomy-band {
  position: absolute;
  top: 0;
  bottom: 0;
  border: 1px solid;
  border-radius: 6px;
}
.meth-anatomy-point {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  margin-left: -6px;
  margin-top: -6px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.15);
  z-index: 2;
}
.meth-anatomy-callout {
  position: absolute;
  top: -2.35rem;
  transform: translateX(-50%);
  text-align: center;
  white-space: nowrap;
  font-size: 0.72rem;
  color: #666;
  line-height: 1.15;
}
.meth-anatomy-callout strong {
  display: block;
  font-size: 0.92rem;
  color: #111;
  font-variant-numeric: tabular-nums;
}
.meth-anatomy-callout--low { top: auto; bottom: -2.35rem; }
.meth-anatomy-callout--high { top: auto; bottom: -2.35rem; }
.meth-anatomy-legend {
  display: grid;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: #555;
  line-height: 1.4;
}
.meth-swatch {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.25rem;
}
.meth-swatch--band {
  width: 1.1rem;
  height: 0.7rem;
  border-radius: 2px;
}
.meth-swatch--dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
}

/* Forecast chart */
.meth-chart-wrap {
  position: relative;
  height: 280px;
  width: 100%;
}

/* Scenarios */
.meth-scenarios-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.75rem;
  margin-bottom: 0.85rem;
}
.meth-scenarios-head strong { font-size: 0.95rem; }
.meth-scenarios-head span { font-size: 0.8rem; color: #777; }
.meth-scenarios-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 1.1rem;
}
.meth-scenario-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
}
.meth-scenario-dots {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  gap: 1.5px 2.5px;
  width: 132px;
  flex-shrink: 0;
  padding: 3px 5px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background: #fafafa;
  box-sizing: content-box;
}
.meth-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #dde1e6;
}
.meth-dot.is-filled { background: #3a4654; }
.meth-scenario-pct {
  font-size: 1.15rem;
  font-weight: 700;
  color: #222;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.meth-scenario-label {
  font-size: 0.8rem;
  color: #444;
  line-height: 1.25;
  margin-top: 0.15rem;
}

@media (max-width: 720px) {
  .meth-pipeline {
    grid-template-columns: 1fr 1fr;
  }
  .meth-pipeline-step:nth-child(2)::after { display: none; }
  .meth-scenarios-grid { grid-template-columns: 1fr; }
  .meth-bias-row { grid-template-columns: 4.4rem 1fr 2.8rem; }
  .meth-anatomy-callout span { display: none; }
  .meth-chart-wrap { height: 240px; }
}
@media (max-width: 480px) {
  .meth-pipeline { grid-template-columns: 1fr; }
  .meth-pipeline-step::after { display: none !important; }
  .meth-mae { gap: 0.4rem; }
  .meth-mae-val { font-size: 1.1rem; }
  .meth-scenario-dots { width: 110px; }
}
@media (prefers-reduced-motion: reduce) {
  .meth-mae-bar, .meth-bias-bar { animation: none !important; transition: none !important; }
}
</style>

## Die Landtagswahl-Vorhersage bei Zweitstimme.org

Sobald eine Landtagswahl näher rückt, erscheint auf der Startseite der Bereich **Vorhersage**: eine Modellprognose des Wahlergebnisses mit Punktschätzung, Unsicherheitsintervall und Szenario-Wahrscheinlichkeiten. Dieser Artikel erklärt, wie diese Vorhersage berechnet wird — und was sie von der [Stimmung](/blog/posts/polling-calculation-methods/) (den Kalman-geglätteten Umfragewerten, aktualisiert wenn neue Umfragen vorliegen) unterscheidet.

### Wann erscheint eine Vorhersage?

Eine Vorhersage wird **90 Tage vor dem Wahltermin** freigeschaltet und bei neuen Umfragen neu berechnet — ohne neue Daten bleibt der Stand unverändert. Das angezeigte Datum („Stand“) bezieht sich auf die jüngste Umfrage, die in die Prognose eingeflossen ist. Davor zeigen wir für das jeweilige Bundesland nur die laufende Stimmung. Nach der Wahl wird die **letzte Modellprognose vor der Wahl** im Archiv eingefroren.

### Warum nicht einfach die letzten Umfragen nehmen?

Umfragen kurz vor der Wahl sind der stärkste einzelne Prädiktor — aber sie liegen systematisch mal daneben, und zwar nicht für alle Parteien gleich. Historisch werden manche Parteien in Landtagsumfragen tendenziell über-, andere unterschätzt, und Umfragen einige Wochen vor der Wahl verfehlen das Ergebnis im Schnitt um mehrere Prozentpunkte. Ein statistisches Modell kann aus vergangenen Wahlen **lernen**, wie stark Umfragen zu gewichten sind, welche weiteren Faktoren das Ergebnis mitbestimmen — und wie groß die verbleibende Unsicherheit realistischerweise ist.

<div class="meth-fig" aria-label="Historischer Umfragefehler nach Partei">
  <p class="meth-fig-title">Historischer Umfragefehler nach Partei</p>
  <div id="meth-viz-bias"></div>
  <p class="meth-fig-cap">Mittlere Abweichung der Landesumfragen vom Wahlergebnis in den letzten 14 Tagen vor der Wahl (Umfrage minus Ergebnis). Positive Werte: Partei wurde überschätzt. Quelle: Landtagswahlen mit Umfragedaten seit den 1990er Jahren.</p>
</div>

### Das Modell

Unsere Landtagswahl-Vorhersage beruht auf einem **bayesianischen Regressionsmodell**, das auf allen deutschen Landtagswahlen seit den 1990er Jahren trainiert wurde, für die Umfragedaten vorliegen (94 Wahlen von 1991 bis 2022). Modelliert wird der Stimmenanteil jeder Partei (auf der Logit-Skala, damit Anteile zwischen 0 und 100 % bleiben) als Funktion von vier Größen:

1. **Landesumfragen** — der latente Umfragewert im Bundesland zum aktuellen Stichtag („Stand“). Wir schätzen und nutzen ein Vorlauf-Modell für die **genaue Zahl der Tage bis zur Wahl** (wie bei BW/RP 2026), nicht nur die festen Paper-Horizonte 2 / 14 / 60 Tage.

Wie bei BW/RP 2026 ist das Live-Modell **umfragenbasiert** (polls-only): Bundestrend, letztes Wahlergebnis und Regierungsbeteiligung fließen in die Paper-Variante `_all` ein, nicht in die hier gezeigte Vorhersage. **Keine** `new_party`-Variable — neue Wettbewerber stecken bereits in den Umfragen.

Das Modell schätzt aus den historischen Wahlen, wie diese Faktoren zusammenwirken — und wie groß der typische Restfehler ist, der auch mit den besten Prädiktoren bleibt. Genau dieser Restfehler bestimmt die Breite der Unsicherheitsintervalle.

<div class="meth-fig" aria-label="Prognosefehler nach Vorlauf">
  <p class="meth-fig-title">Je näher die Wahl, desto kleiner der Fehler</p>
  <div id="meth-viz-mae"></div>
  <p class="meth-fig-cap">Mittlerer absoluter Fehler (MAE) des Modells bei historischer Kreuzvalidierung — getrennt nach Vorlauf. Für Live-Vorhersagen trainieren wir am exakten Tages-Vorlauf der jeweiligen Wahl.</p>
</div>

### Von Umfragen zur Prognose

Die Berechnung läuft täglich serverseitig in unserer Datenpipeline:

<div class="meth-fig" aria-label="Ablauf der Vorhersageberechnung">
  <div id="meth-viz-pipeline"></div>
</div>

1. **Daten sammeln** — Landes- und Bundesumfragen kommen aus derselben Datenbasis wie die Stimmungsanzeige ([DAWUM](https://dawum.de) und [wahlrecht.de](https://www.wahlrecht.de/umfragen/)); dazu die letzten Wahlergebnisse und die aktuelle Regierungskonstellation des Landes.
2. **Prädiktoren bilden** — Für jede Partei (CDU/CSU, SPD, AfD, GRÜNE, LINKE, BSW, FDP und Sonstige) werden die vier Modellgrößen berechnet.
3. **Simulieren** — Das Modell erzeugt für jede Partei **4.000 Simulationen** des Wahlergebnisses. Jede Simulation ist ein plausibles Wahlergebnis, das sowohl die Unsicherheit der Modellparameter als auch den historischen Prognosefehler berücksichtigt; anschließend werden die Anteile in jeder Simulation auf 100 % normalisiert.
4. **Zusammenfassen** — Die **Punktschätzung** ist der Mittelwert der Simulationen, das **5/6-Intervall** die entsprechenden Quantile — auch für Sonstige.

### Wie die Unsicherheit zu lesen ist

Der farbige Balken um jede Punktschätzung zeigt das **5/6-Intervall** (rund 83 %): In fünf von sechs Fällen erwarten wir das tatsächliche Wahlergebnis innerhalb dieses Bereichs — und in **einem von sechs Fällen außerhalb**. Das ist kein Schönheitsfehler, sondern eine ehrliche Ansage: Auch eine gute Prognose liegt regelmäßig daneben, und das Intervall sagt, wie weit.

<div class="meth-fig" aria-label="So liest man Punktschätzung und Intervall">
  <p class="meth-fig-title">So liest man Punktschätzung und Intervall</p>
  <div id="meth-viz-anatomy"></div>
</div>

Die Intervalle sind bewusst **breiter als die Schwankungsbreite einzelner Umfragen**, denn sie enthalten nicht nur Stichprobenfehler, sondern den gesamten historischen Prognosefehler — also auch systematische Umfrageabweichungen und echte Last-Minute-Bewegungen, wie sie bei vergangenen Landtagswahlen aufgetreten sind.

<div class="meth-fig" aria-label="Beispielvorhersage Sachsen-Anhalt">
  <p class="meth-fig-title">Beispiel: Vorhersage Sachsen-Anhalt</p>
  <div class="meth-chart-wrap">
    <canvas id="meth-viz-forecast" aria-label="Balkendiagramm mit Punktschätzung und 5/6-Intervall"></canvas>
  </div>
  <p class="meth-fig-cap">Snapshot vom <strong>3. Juli 2026</strong> (Wahl am 6. September). Farbige Balken = 5/6-Intervall, Punkte = Punktschätzung — dieselbe Darstellung wie auf der Startseite.</p>
</div>

### Szenario-Wahrscheinlichkeiten {#szenarien}

Aus denselben 4.000 Simulationen berechnen wir die Wahrscheinlichkeiten konkreter Ereignisse: Wie oft ist eine Partei in den Simulationen **stärkste Kraft**? Wie oft schafft sie es **über die 5 %-Hürde**? Und wie oft hätte eine bestimmte **Koalition eine Parlamentsmehrheit**?

Für die Mehrheitsrechnung gilt: Nur Parteien über der 5 %-Hürde ziehen ins Parlament ein, und die Sitze verteilen sich proportional zu den Stimmen dieser Parteien. Eine Koalition hat eine Mehrheit, wenn ihre Parteien zusammen mehr als die Hälfte dieser Sitze stellen — wobei jede beteiligte Partei selbst über der Hürde liegen muss. Angezeigt werden nur Szenarien mit mindestens 1 % Wahrscheinlichkeit.

Direktmandate und Überhang/Ausgleich bilden die Szenarien nicht im Detail ab — und das ändert an den Wahrscheinlichkeiten praktisch nichts: In Berlin und Sachsen-Anhalt stellt der Ausgleich den Proporz (nahezu) wieder her. In Mecklenburg-Vorpommern kann der gesetzliche Deckel (Ausgleich höchstens doppelt so viele Sitze wie Überhangmandate) der Überhangpartei einen kleinen Sitzvorteil lassen; in unseren Simulationen verschiebt das Szenario-Wahrscheinlichkeiten um **deutlich unter einen Prozentpunkt**. Die Absolute Mehrheit der AfD bleibt davon unberührt (Unterschied Deckel vs. voller Ausgleich: 0 pp). Details zur Größenverteilung und zum MV-Deckel stehen in der [Wahlkreis-Vorhersage](/blog/posts/district-forecast-methodology/#parlamentsgroesse).

<div class="meth-fig" aria-label="Beispiel Szenario-Wahrscheinlichkeiten">
  <p class="meth-fig-title">Aus Simulationen werden Wahrscheinlichkeiten</p>
  <div id="meth-viz-scenarios"></div>
  <p class="meth-fig-cap">Jedes Kästchen steht für 5 Prozentpunkte Wahrscheinlichkeit (20 Punkte = 100 %). Gefüllte Punkte = Anteil der Simulationen, in denen das Szenario eintritt.</p>
</div>

Eine Wahrscheinlichkeit von z. B. 69 % für „BSW über 5 %-Hürde“ heißt: In 69 % der Simulationen liegt das BSW über 5 % — es ist also gut möglich, aber keineswegs sicher. Umgekehrt heißen 99,9 % nicht „sicher“, sondern: In den Simulationen kommt das Gegenteil praktisch nicht vor.

### Stimmung und Vorhersage im Vergleich

| | **Stimmung** (Balken/Linien) | **Vorhersage** |
|---|---|---|
| Frage | Wie ist die Stimmung *heute*? | Wie geht die Wahl *am Wahltag* aus? |
| Methode | [Kalman-Filter](/blog/posts/polling-calculation-methods/) über alle Umfragen | Bayesianisches Modell, trainiert auf 94 Landtagswahlen |
| Eingangsdaten | Nur Umfragen | Umfragen + Bundestrend + letztes Ergebnis + Regierungsbeteiligung |
| Unsicherheit | ±1σ-Band der Umfrageglättung | 5/6-Intervall inkl. historischem Prognosefehler |
| Verfügbar | Immer | Ab 90 Tage vor der Wahl |

Kurz gesagt: Die Stimmung glättet, was Umfragen *messen*; die Vorhersage schätzt, was am Wahltag *herauskommt* — inklusive der Erfahrung, wie stark beides in der Vergangenheit auseinanderlag.

### Grenzen des Modells

- **Umfragen dominieren kurz vor der Wahl.** Liegen kaum aktuelle Landesumfragen vor, stützt sich das Modell stärker auf das letzte Wahlergebnis und den Bundestrend — die Intervalle bleiben entsprechend breit.
- **Kandidaten- und Kampagneneffekte** kennt das Modell nur indirekt (über die Umfragen). Spitzenkandidat*innen, lokale Themen oder Skandale in den letzten Tagen kann es nicht vorhersehen.
- **Kleinparteien** erscheinen gemeinsam als „Sonstige“ (nicht Partei für Partei).
- **Wahlrechtliche Sonderregeln** (Grundmandatsklauseln, Direktmandate) sind in den Szenario-Rechnungen nicht Sitz für Sitz abgebildet. Der Effekt auf Mehrheits-Wahrscheinlichkeiten ist vernachlässigbar (siehe oben); die [Wahlkreis-Vorhersage](/blog/posts/district-forecast-methodology/) zeigt Direktmandate und eine indikative Parlamentsgröße.

### Fazit

Die Landtagswahl-Vorhersage kombiniert aktuelle Umfragen mit strukturellen Faktoren, deren Zusammenwirken aus über 90 vergangenen Landtagswahlen gelernt wurde. Sie liefert keine Gewissheit, sondern **kalibrierte Wahrscheinlichkeiten**: eine Punktschätzung, ein ehrliches Unsicherheitsintervall und Szenario-Wahrscheinlichkeiten, die man beim Wort nehmen darf. Die archivierten Prognosen vergangener Wahlen bleiben unverändert online — so können Sie selbst überprüfen, wie gut das Modell trifft.

---

**Weiterlesen:** [Wie funktioniert die Wahlkreis-Vorhersage?](/blog/posts/district-forecast-methodology/) · [FAQ](/faq)

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
<script>
  if (typeof Chart !== 'undefined' && typeof ChartDataLabels !== 'undefined') {
    Chart.register(ChartDataLabels);
  }
</script>
<script src="/js/methodology-viz.js"></script>
