---
title: "Sachsen-Anhalt 2026: Evaluation der Vorhersagen"
date: 2026-09-07T18:00:00+02:00
draft: false
kicker: "Nach der Wahl"
description: "Was unsere letzte Vorhersage vor der Landtagswahl in Sachsen-Anhalt getroffen hat — und wo Umfragen und Wahlergebnis auseinanderlagen."
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

Am 6. September hat Sachsen-Anhalt einen neuen Landtag gewählt. In diesem Beitrag evaluieren wir unsere **letzte Vorhersage vor der Wahl** (Stand 4. September) und vergleichen sie mit dem vorläufigen amtlichen Ergebnis. Die eingefrorene Prognose — Zweitstimme, Wahlkreise und Einzugschancen — steht unter [Vergangene Vorhersagen](/archive/posts/vergangene-vorhersagen/).

**Umfragen und Wahlergebnis lagen bei dieser Wahl zum Teil weit auseinander.** Doch lagen die Ergebnisse noch in unseren [5/6-Unsicherheitsintervallen](/blog/posts/state-forecast-methodology/#szenarien)? Und wie nah dran waren unsere Wahrscheinlichkeiten?

<div class="steval-fig" aria-label="Kurzbilanz der Vorhersage">
  <p class="steval-fig-title">Kurzbilanz</p>
  <div id="steval-score"></div>
  <p class="steval-fig-cap">Vorläufiges Ergebnis des Statistischen Landesamts (Ergebnisart V, 7. September) gegen die letzte veröffentlichte Modellprognose. Quellen: <a href="https://wahlergebnisse.sachsen-anhalt.de/wahlen/lt26/downloads.html">StaLA</a>, <a href="https://zweitstimme.org/api/v2/state/st.json">zweitstimme.org API</a>.</p>
</div>

## Die Prognose kommuniziert Unsicherheiten

Das 5/6-Intervall sagt: In fünf von sechs Fällen erwarten wir das Ergebnis in diesem Band — in einem von sechs Fällen also außerhalb. Darin steckt die Erfahrung, wie weit Umfragen und Wahlergebnis in der Vergangenheit auseinanderlagen.

Bei dieser Wahl lagen die Umfragen relativ weit vom Ergebnis entfernt. CDU, Linke, Grüne und BSW liegen außerhalb des 5/6-Intervalls — CDU, Linke und BSW allerdings nur knapp, die Grünen deutlich (8,9 Prozent gegenüber einem oberen Intervallende von 7).

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

Der Einbruch der CDU von prognostizierten 23 auf 17,2 Prozent ist ungewöhnlich — aber nicht jenseits dessen, was Umfragen in der Vergangenheit verfehlt haben. Genau solche Abweichungen sollen die Intervalle sichtbar machen.

## Eine Verschiebung, die nach taktischem Wählen aussieht

Der Fehler ist nicht gleichmäßig verteilt. **CDU und Linke liegen unter der Prognose, Grüne, SPD und BSW darüber.** Zusammen bleiben CDU und Linke 9,2 Punkte hinter der Erwartung zurück; Grüne, SPD und BSW holen 6,5 Punkte mehr. Der Rest geht vor allem an die AfD (+2,8), die im Intervall bleibt.

Das Muster passt zu **taktischem Wählen**: CDU und Linke lagen in den Umfragen klar über 5 Prozent, Grüne und BSW an oder unter der Hürde. Wer eine absolute Mehrheit der AfD verhindern oder eine weitere Partei über die 5 Prozent heben wollte, hatte einen Grund, die Zweitstimme nicht der „sicheren“ Partei zu geben.

<div class="steval-fig" aria-label="Verschiebung CDU und Linke zu Grünen, SPD und BSW">
  <p class="steval-fig-title">CDU und Linke zu Grünen, SPD und BSW</p>
  <div id="steval-flow"></div>
  <p class="steval-fig-cap">Abweichung der Punktschätzung vom Ergebnis. Links die beiden Parteien, die das Modell überschätzt hat; rechts die drei, die es unterschätzt hat.</p>
</div>

## Szenarien in Farbe

Wir hatten für verschiedene Szenarien Wahrscheinlichkeiten angegeben. Hier ist, was davon eingetreten ist. Grün: von uns für wahrscheinlich gehalten und eingetreten. Grau: unwahrscheinlich und ausgeblieben. Orange: unter 50 Prozent, aber eingetreten. Rot: für wahrscheinlich gehalten, aber ausgeblieben.

<div class="steval-fig" aria-label="Szenario-Wahrscheinlichkeiten und Ausgang">
  <p class="steval-fig-title">Welche Szenarien eingetreten sind</p>
  <div id="steval-scenarios"></div>
  <p class="steval-fig-cap">Jedes Kästchen = 5 Prozentpunkte (20 Kästchen = 100 %).</p>
</div>

Dem BSW-Einzug hatten wir nur 19 Prozent gegeben — wir hatten das BSW zwar eher nicht im Landtag gesehen, aber ein knappes Rennen vorhergesagt. Unsere Punktschätzung lag bei 4 Prozent (Intervall 3–5), das Ergebnis bei 5,3 Prozent: knapp über der Hürde und am oberen Rand des Bandes. Rund ein Fünftel unserer Simulationen sahen das BSW über 5 Prozent.

## Sitze und Parlamentsgröße

2021 war der Landtag auf 97 Sitze angewachsen, weil die CDU 40 von 41 Wahlkreisen bei nur 37 Prozent der Zweitstimmen gewann. 2026 gewinnt die AfD 38 Direktmandate bei 43,8 Prozent — die Direktmandate sind durch den Proporz gedeckt, es entsteht kein Überhang. Das hatte unsere Sitzsimulation erwartet: 74 Prozent der Simulationen landeten genau bei 83 Sitzen, und auch der Median von 39 AfD-Sitzen traf das Ergebnis exakt.

<div class="steval-fig" aria-label="Simulierte Landtagsgröße">
  <p class="steval-fig-title">Wie groß der Landtag wird</p>
  <div id="steval-size"></div>
  <p class="steval-fig-cap">Anteil der Simulationen nach Parlamentsgröße. Der Landtag bleibt bei der gesetzlichen Mindestgröße von 83 Sitzen. Vorläufige Sitzverteilung: AfD 39 (38 Direkt, 1 Liste), CDU 15, Linke 8, SPD 8, Grüne 8, BSW 5. Wahlbeteiligung 77,8 Prozent (2021: 60,3).</p>
</div>

## Direktmandate

38 von 41 Wahlkreisen haben wir richtig vorhergesagt. Eine einfache Regel „AfD gewinnt überall“ hätte allerdings genauso viele Wahlkreise getroffen: Unsere beiden Nicht-AfD-Vorhersagen (Magdeburg II an die CDU, Halle III an die Grünen) waren falsch, und Halle II (AfD mit 62 Prozent Gewinnwahrscheinlichkeit) ging an die Linke. Allerdings hatte das Modell in diesen Stadt-Wahlkreisen auch eine hohe Unsicherheit angegeben — die Favoriten lagen nur bei 45 bis 62 Prozent.

<div class="steval-fig" aria-label="41 Wahlkreise, Gewinner">
  <p class="steval-fig-title">41 Direktmandate</p>
  <div id="steval-districts"></div>
  <p class="steval-fig-cap">Farbe = tatsächliche Gewinnerpartei. Umrandet = Prognose falsch. 2021: CDU 40, AfD 1. 2026: AfD 38, Linke 3. Der knappste AfD-Sieg: Magdeburg III, wo Ministerpräsident Schulze mit 31,7 zu 35,2 unterliegt.</p>
</div>

<div class="steval-miss">
  <div class="steval-miss-card">
    <strong>WK 11 Magdeburg II — Mustafa Groener (Linke), +5,9 Pp.</strong>
    <span>Wir hatten die CDU in 45 Prozent der Fälle vorne gesehen, die Linke nur in 6 Prozent.</span>
  </div>
  <div class="steval-miss-card">
    <strong>WK 36 Halle II — Gitta Hartenstein-Wiermann (Linke), +4,7 Pp.</strong>
    <span>Hier hatten wir die AfD knapp vorne gesehen.</span>
  </div>
  <div class="steval-miss-card">
    <strong>WK 37 Halle III — Jannik-Loris Balint (Linke), +22 Pp.</strong>
    <span>Hier hatten wir die Grünen deutlich vorne erwartet. Stark waren die Grünen auch — allerdings bei der Zweitstimme (33,7 Prozent). Die Erststimmen gingen mit großem Abstand an die Linke.</span>
  </div>
</div>

Wie schon bei der [Bundestagswahl 2025](/archive/posts/evaluation-2025/) dürften hier Kandidierendeneffekte eine Rolle spielen, die unser Modell nicht abbildet. Die Linke-Kandidierenden in Halle und Magdeburg führten monatelange Haustürwahlkämpfe — in Halle III mit rund 250 Helfer:innen und dem Ziel von 32.000 Haustüren. Solche lokalen Kampagnen kann das Modell nicht vorhersehen; es kann nur die Unsicherheit in diesen Wahlkreisen ausweisen.

## Was bleibt

Trotz der teils deutlichen Abweichungen zwischen Umfragen und Wahlergebnis hat unser Modell insgesamt gut abgeschnitten: AfD-Anteil, Sitzzahl und Parlamentsgröße lagen nah am Ergebnis. Den CDU-Einbruch und das Grünen-Plus haben die Umfragen — und damit unser umfragenbasiertes Modell — nicht vorweggenommen. Beim BSW war der Einzug knapp und mit 19 Prozent auch als knapp ausgewiesen.

Am 20. September wählen Mecklenburg-Vorpommern und Berlin. Taktisches Wählen kann die Verhältnisse um die 5-Prozent-Hürde noch verschieben. Und: Wird die Linke in den Wahlkreisen wieder stärker als erwartet?

---

Methode: [Landtagswahl-Vorhersage](/blog/posts/state-forecast-methodology/), [Wahlkreis-Vorhersage](/blog/posts/district-forecast-methodology/). Letzte Vorhersage vor der Wahl: [Vergangene Vorhersagen](/archive/posts/vergangene-vorhersagen/). Ergebnis: [StaLA LTW 2026](https://wahlergebnisse.sachsen-anhalt.de/wahlen/lt26/downloads.html), vorläufig (V), nicht das endgültige Ergebnis des Landeswahlausschusses.

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
<script>
  if (typeof Chart !== 'undefined' && typeof ChartDataLabels !== 'undefined') {
    Chart.register(ChartDataLabels);
  }
</script>
<script src="/js/st-eval-viz.js"></script>
