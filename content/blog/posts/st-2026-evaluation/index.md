---
title: "Sachsen-Anhalt 2026: Was die Vorhersage getroffen hat"
date: 2026-09-07T18:00:00+02:00
draft: false
kicker: "Nach der Wahl"
description: "AfD-Sitze und Landtagsgröße lagen am Median — der CDU-Einbruch und das Grünen-Plus nicht. Genau deshalb gehören Unsicherheitsintervalle zur Prognose: Umfragen und Wahlergebnis können auseinanderlaufen."
---

<style>
.steval-fig {
  margin: 1.35rem 0 1.75rem;
  padding: 1rem 1.1rem 1.05rem;
  border: 1px solid var(--border, #e6e6e6);
  border-radius: 12px;
  background: #fff;
}
.steval-fig-title {
  margin: 0 0 0.15rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.01em;
}
.steval-fig-cap {
  margin: 0.85rem 0 0;
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--secondary, #666);
}
.steval-fig-cap strong { color: #444; font-weight: 600; }
.steval-chart-wrap { position: relative; height: 300px; width: 100%; }
.steval-chart-wrap--seats { height: 280px; }

.steval-score {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.65rem;
}
.steval-score-item {
  padding: 0.7rem 0.65rem 0.75rem;
  border: 1px solid #ececec;
  border-radius: 10px;
  background: #fafafa;
  min-width: 0;
}
.steval-score-v {
  font-size: 1.25rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  color: #1a1a1a;
  line-height: 1.15;
}
.steval-score-l {
  margin-top: 0.28rem;
  font-size: 0.72rem;
  line-height: 1.3;
  color: #666;
}

.steval-err-axis {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.5rem;
  font-size: 0.72rem;
  color: #888;
  margin-bottom: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.steval-err-axis span:first-child { text-align: left; }
.steval-err-axis span:nth-child(2) { text-align: center; text-transform: none; letter-spacing: 0; color: #666; }
.steval-err-axis span:last-child { text-align: right; }
.steval-err-row {
  display: grid;
  grid-template-columns: 5.4rem 1fr 3.4rem;
  align-items: center;
  gap: 0.5rem;
  margin: 0.28rem 0;
}
.steval-err-party {
  font-size: 0.82rem;
  font-weight: 700;
  text-align: right;
}
.steval-err-track {
  position: relative;
  height: 14px;
  background: #f3f3f3;
  border-radius: 3px;
  overflow: hidden;
}
.steval-err-zero {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #bbb;
}
.steval-err-bar {
  position: absolute;
  top: 2px;
  bottom: 2px;
  border-radius: 2px;
}
.steval-err-bar.is-over { left: 50%; background: #2e7d32; }
.steval-err-bar.is-under { right: 50%; background: #c62828; }
.steval-err-bar.is-out { opacity: 1; }
.steval-err-bar.is-in { opacity: 0.55; }
.steval-err-val {
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}
.steval-err-val.is-over { color: #2e7d32; }
.steval-err-val.is-under { color: #c62828; }

.steval-flow {
  display: grid;
  grid-template-columns: 1fr 2.2rem 1fr;
  gap: 0.35rem;
  align-items: start;
}
.steval-flow-h {
  font-size: 0.78rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.45rem;
}
.steval-flow-row {
  display: grid;
  grid-template-columns: 4.4rem 1fr 3.1rem;
  align-items: center;
  gap: 0.4rem;
  margin: 0.32rem 0;
}
.steval-flow-name { font-size: 0.8rem; font-weight: 700; text-align: right; }
.steval-flow-track {
  height: 12px;
  background: #f3f3f3;
  border-radius: 3px;
  overflow: hidden;
}
.steval-flow-bar {
  display: block;
  height: 100%;
  border-radius: 2px;
}
.steval-flow-n {
  font-size: 0.8rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.steval-flow-sum {
  margin-top: 0.45rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #333;
}
.steval-flow-mid {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 7rem;
}
.steval-flow-mid span {
  width: 0.7rem;
  height: 0.7rem;
  border-right: 2px solid #c5c9ce;
  border-top: 2px solid #c5c9ce;
  transform: rotate(45deg);
}
.steval-flow-rest {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: #666;
}

.steval-scen-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 0.9rem;
  margin-bottom: 0.85rem;
  font-size: 0.75rem;
  color: #555;
}
.steval-scen-leg { display: inline-flex; align-items: center; gap: 0.35rem; }
.steval-scen-swatch {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  flex-shrink: 0;
}
.steval-scen-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem 0.85rem;
}
.steval-scen-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
  padding: 0.55rem 0.6rem;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
}
.steval-scen-dots {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  gap: 1.5px 2.5px;
  width: 118px;
  flex-shrink: 0;
  padding: 3px 5px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background: #fff;
  box-sizing: content-box;
}
.steval-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #dde1e6;
}
.steval-scen-text { min-width: 0; flex: 1; }
.steval-scen-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.4rem;
}
.steval-scen-pct {
  font-size: 1.12rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}
.steval-scen-badge {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  border: 1px solid;
  border-radius: 999px;
  padding: 0.12rem 0.4rem;
  white-space: nowrap;
}
.steval-scen-label {
  font-size: 0.78rem;
  color: #333;
  line-height: 1.25;
  margin-top: 0.22rem;
}

.steval-size {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.65rem;
  align-items: end;
  min-height: 160px;
}
.steval-size-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
}
.steval-size-val {
  font-size: 0.95rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #1a1a1a;
  margin-bottom: 0.35rem;
}
.steval-size-bar-wrap {
  flex: 1;
  width: 100%;
  max-width: 64px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 80px;
}
.steval-size-bar {
  width: 100%;
  background: #c5c9ce;
  border-radius: 3px 3px 0 0;
  animation: steval-grow 0.7s ease-out both;
}
.steval-size-col.is-actual .steval-size-bar { background: #3a4654; }
.steval-size-lab {
  margin-top: 0.4rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #333;
}
.steval-size-lab span {
  display: block;
  font-size: 0.68rem;
  font-weight: 500;
  color: #888;
}
@keyframes steval-grow { from { transform: scaleY(0); transform-origin: bottom; } to { transform: scaleY(1); } }

.steval-wk-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 1rem;
  margin-bottom: 0.65rem;
  font-size: 0.78rem;
  color: #555;
}
.steval-wk-legend i {
  display: inline-block;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 2px;
  margin-right: 0.3rem;
  vertical-align: -1px;
}
.steval-wk-leg-miss i {
  background: #f3d4e4;
  box-shadow: inset 0 0 0 1px #BE3075;
}
.steval-wk-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.28rem;
}
.steval-wk {
  appearance: none;
  border: 1px solid transparent;
  border-radius: 5px;
  min-height: 2.15rem;
  padding: 0.2rem 0.1rem;
  font: inherit;
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.05rem;
}
.steval-wk-n {
  font-size: 0.72rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}
.steval-wk-tag {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
}
.steval-miss {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;
}
.steval-miss-card {
  padding: 0.75rem 0.85rem;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  background: #fafafa;
}
.steval-miss-card strong { display: block; margin-bottom: 0.2rem; }
.steval-miss-card span { font-size: 0.78rem; color: #666; }

.steval-note {
  margin: 1rem 0 1.4rem;
  padding: 0.8rem 0.95rem;
  border-left: 3px solid #3a4654;
  background: #f6f7f8;
  border-radius: 0 8px 8px 0;
  font-size: 0.92rem;
  line-height: 1.5;
}

@media (max-width: 720px) {
  .steval-score { grid-template-columns: 1fr 1fr; }
  .steval-scen-grid { grid-template-columns: 1fr; }
  .steval-flow { grid-template-columns: 1fr; }
  .steval-flow-mid { min-height: 1.2rem; transform: rotate(90deg); }
  .steval-wk-grid { grid-template-columns: repeat(6, 1fr); }
  .steval-chart-wrap { height: 250px; }
  .steval-err-row { grid-template-columns: 4.4rem 1fr 2.8rem; }
}
@media (prefers-reduced-motion: reduce) {
  .steval-size-bar { animation: none !important; }
}
</style>


Am 6. September hat Sachsen-Anhalt einen neuen Landtag gewählt. Unsere **letzte Vorhersage vor der Wahl** (Stand 4. September) evaluieren wir hier.

**Umfragen und Wahlergebnis lagen bei dieser Wahl zum Teil weit auseinander.** Doch lagen die Ergebnisse noch in unseren [5/6-Unsicherheitsintervallen](/blog/posts/state-forecast-methodology/#szenarien) — und wie nah dran waren unsere Wahrscheinlichkeiten?

<div class="steval-fig" aria-label="Kurzbilanz der Vorhersage">
  <p class="steval-fig-title">Kurzbilanz</p>
  <div id="steval-score"></div>
  <p class="steval-fig-cap">Vorläufiges Ergebnis des Statistischen Landesamts (Ergebnisart V, 7. September) gegen die letzte veröffentlichte Modellprognose. Quellen: <a href="https://wahlergebnisse.sachsen-anhalt.de/wahlen/lt26/downloads.html">StaLA</a>, <a href="https://zweitstimme.org/api/v2/state/st.json">zweitstimme.org API</a>.</p>
</div>

## Die Prognose kommuniziert Unsicherheiten

Das 5/6-Intervall (rund 83 Prozent) sagt: In fünf von sechs Fällen erwarten wir das Ergebnis in diesem Band — und **in einem von sechs Fällen außerhalb**. Hier steckt der historische Abstand zwischen Umfragen und Wahlsonntag.

Bei dieser Wahl lagen die Umfragen relativ weit vom Ergebnis. CDU, Linke, Grüne und BSW liegen außerhalb des 5/6-Intervalls; CDU, Linke und BSW allerdings nur knapp, die Grünen klar (8,9 gegen oberes Ende 7).

<div class="steval-fig" aria-label="Zweitstimme: Intervall, Punktschätzung, Ergebnis">
  <p class="steval-fig-title">Zweitstimme: Intervall, Punkt, Ergebnis</p>
  <div class="steval-chart-wrap">
    <canvas id="steval-votes" aria-label="Balkendiagramm 5/6-Intervall mit Punktschätzung und Wahlergebnis"></canvas>
  </div>
  <p class="steval-fig-cap">Farbige Balken = 5/6-Intervall der Vorhersage. Kreise = Punktschätzung. Rauten = vorläufiges Ergebnis (grün im Intervall, rot außerhalb). Quelle: forecast_state_st.json, 4. September · StaLA Land, 7. September.</p>
</div>

<div class="steval-fig" aria-label="Abweichung Prognose minus Ergebnis">
  <p class="steval-fig-title">Abweichung vom Wahlergebnis</p>
  <div id="steval-error"></div>
  <p class="steval-fig-cap">Ergebnis minus Punktschätzung in Prozentpunkten. Blass = Partei blieb im 5/6-Intervall. Der CDU-Fehler (−5,8) und das Grünen-Plus (+3,9) dominieren; der mittlere absolute Fehler über acht Parteien liegt bei 2,4 Punkten.</p>
</div>

<div class="steval-note">
Ohne Intervall liest sich „CDU 23 Prozent“ wie eine Ansage. Mit Intervall 18–27 war klar: Ein Einbruch in Richtung 17 Prozent ist ungewöhnlich, aber nicht jenseits dessen, was Umfragen historisch verfehlen. Die Bänder haben ihre Aufgabe erfüllt — sie haben die Unsicherheit sichtbar gemacht, bevor der Wahlsonntag sie bewiesen hat.
</div>

## Eine Verschiebung, die nach taktischem Wählen aussieht

Der Fehler ist nicht gleichmäßig. **CDU und Linke liegen unter der Prognose, Grüne, SPD und BSW darüber.** Zusammen geben CDU und Linke 9,2 Punkte weniger her als erwartet; Grüne, SPD und BSW nehmen 6,5 Punkte mehr mit. Der Rest geht vor allem an die AfD (+2,8), die im Intervall bleibt.

Das Muster passt zu **taktischem Wählen**: CDU und Linke waren in den Umfragen klar über 5 Prozent, Grüne und BSW lagen an oder unter der Hürde. Wer AfD-Alleinherrschaft verhindern oder eine weitere Partei über 5 Prozent heben wollte, hatte einen Grund, die Zweitstimme nicht der „sicheren“ Partei zu geben. Beweisen lässt sich das aus dem Landesergebnis nicht — dafür bräuchte man Individualdaten. Aber die Richtung ist dieselbe, die man bei Leihstimmen an die Hürde erwartet.

<div class="steval-fig" aria-label="Verschiebung CDU und Linke zu Grünen, SPD und BSW">
  <p class="steval-fig-title">CDU und Linke zu Grünen, SPD und BSW</p>
  <div id="steval-flow"></div>
  <p class="steval-fig-cap">Abweichung der Punktschätzung vom Ergebnis. Die linke Spalte sind die beiden Parteien, die das Modell überschätzt hat; die rechte die drei, die es unterschätzt hat. Kein nachgewiesener Stimmentransfer — nur die Buchhaltung des Prognosefehlers.</p>
</div>

In den Städten sieht man dasselbe auf dem Stimmzettel. In **Halle III** holen die Grünen 33,7 Prozent der Zweitstimmen (einziger Wahlkreis, den sie auf der Landesstimme gewinnen) — und verlieren das Direktmandat 12 zu 40 an die Linke. In **Magdeburg II** stehen 22,8 Prozent Grüne-Zweit gegen 6,0 Prozent Erst; die Linke gewinnt mit 29,4 Prozent Erst bei 12,6 Prozent Zweit. Erststimme an die Linke, Zweitstimme an eine Partei näher an der Hürde: das klassische Split-Ticket.

## Szenarien in Farbe

Aus denselben 4.000 Zügen kommen die Wahrscheinlichkeiten auf der Startseite. Hier ist, was davon eingetreten ist. Grün: wir haben es für wahrscheinlich gehalten, und es stimmt. Grau: unwahrscheinlich, und es ist ausgeblieben. Orange: unter 50 Prozent, aber wahr — bei BSW und AfD+BSW ein knapper Hürdenfall, kein Ausreißer. Rot: wahrscheinlich, aber falsch.

<div class="steval-fig" aria-label="Szenario-Wahrscheinlichkeiten und Ausgang">
  <p class="steval-fig-title">Was die 4.000 Simulationen für wahrscheinlich hielten</p>
  <div id="steval-scenarios"></div>
  <p class="steval-fig-cap">Jedes Kästchen = 5 Prozentpunkte (20 Punkte = 100 %). Die Füllfarbe ist der Ausgang, nicht die Partei. BSW-Einzug 19 % und Mehrheit AfD+BSW 9 % sind dasselbe enge Hürdenereignis, nicht zwei unabhängige Überraschungen.</p>
</div>

**19 Prozent für den BSW-Einzug war die richtige Größenordnung für ein knappes Rennen.** Die Punktschätzung lag bei 4 Prozent, das 5/6-Intervall bei 3–5; das vorläufige Ergebnis ist 5,3 — einen knappen halben Punkt über der Hürde, praktisch am oberen Rand des Bandes. Rund ein Fünftel der Simulationen lagen über 5 Prozent. Genau so liest man eine Wahrscheinlichkeit an einer Schwelle: nicht „zieht nicht ein“, sondern „öfter drunter als drüber, aber oft genug drüber, dass man es mitdenken muss“.

Die **AfD-BSW-Mehrheit (9 Prozent)** ist fast dasselbe Ereignis, nur enger. Ohne BSW im Landtag gibt es diese Mehrheit nicht. Selbst wenn das BSW drin ist, reicht AfD+BSW nicht in jedem Zug: In den Simulationen lag die gemeinsame Mehrheit in etwa der Hälfte der BSW-Einzüge (9 von 19 Prozentpunkten). Am Sonntag fielen beide zusammen, weil CDU und Linke schwächer und die Grünen stärker waren als der Punkt — sechs Fraktionen, AfD 39, BSW 5, zusammen 44 von 83. Die Kehrseite ist der rote Fehlalarm: „Mehrheit ohne AfD und BSW“ bei 70 Prozent. Ohne BSW bleiben die anderen vier bei 39 Sitzen, unter 42.

Die AfD-Absolutmehrheit (22 Prozent über Stimmen, 24 Prozent über Sitze) ist ausgeblieben. 39 von 83 sind 47 Prozent der Sitze; 42 wären nötig gewesen.

## Sitze und Parlamentsgröße

Die Sitzsimulation (Wahlkreis-Swing, Hare/Niemeyer, Ausgleich nach LWG LSA, Basis 83) hatte den **Median 83 Sitze** und **AfD 39**. Beides ist eingetreten. 2021 war der Landtag auf 97 aufgebläht, weil die CDU 40 von 41 Wahlkreisen bei 37 Prozent der Zweitstimmen gewann. 2026 gewinnt die AfD 38 Direktmandate bei 43,8 Prozent — der Proporz trägt die Direktmandate, es bleibt kein Überhang. 74 Prozent der Simulationen landeten genau bei 83.

<div class="steval-fig" aria-label="Simulierte Landtagsgröße">
  <p class="steval-fig-title">Wie groß der Landtag wird</p>
  <div id="steval-size"></div>
  <p class="steval-fig-cap">Anteil der 4.000 Sitzsimulationen. Die Kammer bleibt bei der gesetzlichen Mindestgröße. Quelle: parliament.json, 5. September.</p>
</div>

<div class="steval-fig" aria-label="Sitze: Median, Band, Ergebnis">
  <p class="steval-fig-title">Sitze: Median, 10–90-Prozent-Band, Ergebnis</p>
  <div class="steval-chart-wrap steval-chart-wrap--seats">
    <canvas id="steval-seats" aria-label="Sitzprognose und Ergebnis nach Partei"></canvas>
  </div>
  <p class="steval-fig-cap">AfD 39 und SPD 8 exakt. Der CDU-Median 22 wird zu 15 (unter p10), Grüne 5 zu 8, BSW 0 zu 5. Eine naive Rechnung 97 × Stimmenanteil hätte der AfD rund 45 Sitze gegeben — die Wahlkreis-Simulation war hier die bessere Funktion, nicht nur Glück.</p>
</div>

Amtliche vorläufige Verteilung: AfD 39 (38 Direkt, 1 Liste), CDU 15 Liste, Linke 8 (3 Direkt, 5 Liste), SPD 8, Grüne 8, BSW 5. Wahlbeteiligung 77,8 Prozent (2021: 60,3).

## Direktmandate

38 von 41 Wahlkreisen richtig. Eine Regel „AfD überall“ hätte denselben Zähler — die beiden Nicht-AfD-Rufe des Modells (Magdeburg II CDU, Halle III Grüne) waren falsch, Halle II (AfD 62 Prozent) ging an die Linke. Der Unterschied: Die Stadt-Wahlkreise waren mit 45–62 Prozent angesetzt, nicht mit 100. Auf der Karte lagen sie als umkämpfte Wahlkreise, nicht als sichere Farben.

<div class="steval-fig" aria-label="41 Wahlkreise, Gewinner">
  <p class="steval-fig-title">41 Direktmandate</p>
  <div id="steval-districts"></div>
  <p class="steval-fig-cap">Farbe = tatsächliche Gewinnerpartei. Umrandet = Prognose falsch. 2021: CDU 40, AfD 1. 2026: AfD 38, Linke 3. Der knappste AfD-Hold: Magdeburg III, Ministerpräsident Schulze unterliegt 31,7 zu 35,2 — das Modell hatte AfD mit 78 Prozent, korrekt.</p>
</div>

<div class="steval-miss">
  <div class="steval-miss-card">
    <strong>WK 11 Magdeburg II — Mustafa Groener (Linke), +5,9 Pp.</strong>
    <span>Prognose CDU 45 Prozent, P(Linke) 6 Prozent. Linke-Erst 29,4 gegen Modell 15,9 — außerhalb des Erst-Intervalls. Zweit Grüne 22,8, Erst Grüne 6,0.</span>
  </div>
  <div class="steval-miss-card">
    <strong>WK 36 Halle II — Gitta Hartenstein-Wiermann (Linke), +4,7 Pp.</strong>
    <span>Engster Fehlruf. AfD-Erst lag auf der Prognose (24,9 gegen 24,2); die Linke-Erst 29,6 gegen 15,8 nicht. CDU-Zweit 13,8 statt 20,7.</span>
  </div>
  <div class="steval-miss-card">
    <strong>WK 37 Halle III — Jannik-Loris Balint (Linke), +22 Pp.</strong>
    <span>Modell: Grüne 59 Prozent (Zweit-Stärke). Ergebnis: Grüne-Zweit 33,7, Erst 12,2. Ohne Kandidierendeneffekt bleibt so ein Split-Ticket unsichtbar.</span>
  </div>
</div>

Die erwartete Zahl der AfD-Direktmandate aus den Gewinnwahrscheinlichkeiten war 37,1 (Ist: 38). CDU 3,0 (Ist: 0), Linke 0,2 (Ist: 3). Die Karte hat die Städte falsch eingefärbt, die Summe fast nicht.

Die drei Fehlrufe lagen in Wahlkreisen, die das Modell als umkämpft ausgewiesen hat — Favoriten mit 45, 62 und 59 Prozent, nicht mit 90. Falsch war die Paarung: CDU gegen AfD in Magdeburg II, AfD in Halle II, Grüne in Halle III. Die Linke stand in keinem der drei als Favoritin (6, 4 und 11 Prozent Gewinnwahrscheinlichkeit). Dass in Halle III ein intensiver Haustürwahlkampf lief, war öffentlich: Mitte August berichtete die *Frankfurter Rundschau* über Jannik-Loris Balint und rund 250 Helferinnen und Helfer, die 32.000 Haustüren anpeilten. Nach der Wahl hat Balint genau das als Grund genannt; Mustafa Groener in Magdeburg II ebenfalls. Die Gewinner waren keine Amtsinhaber. Das Modell kennt keine Kandidierendeneffekte, nur Partei und Wahlkreis. Eine solche Kampagne kann es deshalb nicht „rufen“ — nur die Unsicherheit in den Städten sichtbar machen. Genau das hat die Karte getan.

## Was bleibt

Die Punktschätzung ist der Mittelwert. Die Intervalle und Szenarien sind die Aussage, und in Sachsen-Anhalt waren sie die nützlichere. CDU-Einbruch und Grünen-Plus haben die Umfragen — und damit unser umfragenbasiertes Modell — nicht vorweggenommen. Beim BSW war der Einzug knapp und mit 19 Prozent als solches ausgewiesen; die AfD-BSW-Mehrheit (9 Prozent) hing an derselben Schwelle. Die 70 Prozent für eine Mehrheit ohne AfD und BSW waren dann zu viel, sobald diese Schwelle fiel.

Das Modell hat die Unsicherheit nicht unterschlagen. Es hat sie in Bänder und Wahrscheinlichkeiten übersetzt. Wer sie mitgelesen hat, war auf einen Wahlsonntag vorbereitet, der nicht die letzte Umfrage wiederholt.

## Was das für MV und Berlin heißt

Am **20. September** wählen Mecklenburg-Vorpommern und Berlin. Drei Dinge aus Sachsen-Anhalt sind dort direkt lesbar.

**Intervalle und Hürden, nicht nur der Punkt.** 19 Prozent für den BSW-Einzug war kein „zieht nicht ein“, sondern ein knappes Rennen am Rand des Intervalls. Dieselbe Sprache gilt für Grüne, BSW oder FDP in MV und Berlin, sobald sie in der Nähe von 5 Prozent stehen. Eine kleine Wahrscheinlichkeit an einer Schwelle ist die Prognose — nicht die Fußnote.

**Die Sitzsimulation schlägt die Faustformel.** Wer die Größe des letzten Landtags mal Stimmenanteil rechnet, lag in Sachsen-Anhalt bei der AfD um sechs Sitze daneben. Die Wahlkreis-Simulation (Median 83, AfD 39) hat beides getroffen. In MV ist der Ausgleich anders konstruiert (Deckel beim zweifachen Überhang); in Berlin kommen Grundmandat und Bezirkslisten hinzu, die Größe schwankt stärker. Trotzdem: Sitze aus den Wahlkreisen rechnen, nicht die letzte Legislatur fortschreiben.

**Umkämpfte Städte, keine Kandidierendeneffekte.** Magdeburg und Halle waren auf der Karte gestreift, nicht einfarbig — und gingen trotzdem an eine andere Partei, als der Favorit hieß, weil Haustürkampagnen und Split-Tickets im Modell nicht vorkommen. In MV gilt das für Rostock und Schwerin; in Berlin für fast alle Bezirke, plus die Grundmandatsklausel (ein Direktmandat reicht für den Einzug). Wer die Karte liest: die Streifen ernst nehmen, den genannten Favoriten nicht.

---

Methode: [Landtagswahl-Vorhersage](/blog/posts/state-forecast-methodology/), [Wahlkreis-Vorhersage](/blog/posts/district-forecast-methodology/). Ergebnis: [StaLA LTW 2026](https://wahlergebnisse.sachsen-anhalt.de/wahlen/lt26/downloads.html), vorläufig (V), nicht das endgültige Ergebnis des Landeswahlausschusses.

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
<script>
  if (typeof Chart !== 'undefined' && typeof ChartDataLabels !== 'undefined') {
    Chart.register(ChartDataLabels);
  }
</script>
<script src="/js/st-eval-viz.js"></script>
