---
title: "Berlin und Mecklenburg-Vorpommern 2026: Evaluation der Vorhersagen"
date: 2026-09-21T12:00:00+02:00
draft: false
kicker: "Nach der Wahl"
description: "Was unsere letzten Vorhersagen vor den Wahlen in Berlin und Mecklenburg-Vorpommern getroffen haben — und ob Zweitstimmen-Intervalle und Wahlkreise über ST, BE und MV im erwarteten Rahmen lagen."
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
.steval-err-party { font-size: 0.82rem; font-weight: 700; text-align: right; }
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
.steval-err-val { font-size: 0.8rem; font-variant-numeric: tabular-nums; font-weight: 700; }
.steval-err-val.is-over { color: #2e7d32; }
.steval-err-val.is-under { color: #c62828; }

.steval-scen-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 0.9rem;
  margin-bottom: 0.85rem;
  font-size: 0.75rem;
  color: #555;
}
.steval-scen-leg { display: inline-flex; align-items: center; gap: 0.35rem; }
.steval-scen-swatch { width: 0.65rem; height: 0.65rem; border-radius: 50%; flex-shrink: 0; }
.steval-scen-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem 0.85rem; }
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
.steval-dot { width: 4px; height: 4px; border-radius: 50%; background: #dde1e6; }
.steval-scen-text { min-width: 0; flex: 1; }
.steval-scen-top { display: flex; align-items: baseline; justify-content: space-between; gap: 0.4rem; }
.steval-scen-pct { font-size: 1.12rem; font-weight: 700; font-variant-numeric: tabular-nums; line-height: 1; }
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
.steval-scen-label { font-size: 0.78rem; color: #333; line-height: 1.25; margin-top: 0.22rem; }

.steval-size {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.65rem;
  align-items: end;
  min-height: 160px;
}
.steval-size--5 { grid-template-columns: repeat(5, 1fr); }
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
.steval-size-lab { margin-top: 0.4rem; font-size: 0.78rem; font-weight: 600; color: #333; }
.steval-size-lab span { display: block; font-size: 0.68rem; font-weight: 500; color: #888; }
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
.steval-wk-leg-miss i { background: #f3d4e4; box-shadow: inset 0 0 0 1px #BE3075; }
.steval-wk-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 0.28rem; }
.steval-wk-grid--be { grid-template-columns: repeat(13, 1fr); }
.steval-wk-grid--mv { grid-template-columns: repeat(9, 1fr); }
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
.steval-wk-n { font-size: 0.72rem; font-weight: 700; font-variant-numeric: tabular-nums; line-height: 1; }
.steval-wk-tag { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.02em; line-height: 1; }
.steval-miss { display: grid; grid-template-columns: 1fr; gap: 0.65rem; }
.steval-miss-card {
  padding: 0.75rem 0.85rem;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  background: #fafafa;
}
.steval-miss-card strong { display: block; margin-bottom: 0.2rem; }
.steval-miss-card span { font-size: 0.78rem; color: #666; }

.steval-check-row {
  display: grid;
  grid-template-columns: 9.5rem 1fr 3.6rem;
  align-items: center;
  gap: 0.55rem;
  margin: 0.4rem 0;
}
.steval-check-row.is-total { margin-top: 0.7rem; font-weight: 700; }
.steval-check-lab { font-size: 0.82rem; font-weight: 600; color: #333; }
.steval-check-track {
  position: relative;
  height: 14px;
  background: #f3f3f3;
  border-radius: 3px;
  overflow: visible;
}
.steval-check-bar {
  display: block;
  height: 100%;
  border-radius: 3px;
}
.steval-check-exp {
  position: absolute;
  top: -3px;
  bottom: -3px;
  width: 2px;
  background: #111;
  transform: translateX(-1px);
}
.steval-check-val { font-size: 0.82rem; font-variant-numeric: tabular-nums; font-weight: 700; text-align: right; }
.steval-check-note { margin: 0.65rem 0 0; font-size: 0.78rem; color: #666; }

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
  .steval-wk-grid,
  .steval-wk-grid--be,
  .steval-wk-grid--mv { grid-template-columns: repeat(6, 1fr); }
  .steval-chart-wrap { height: 250px; }
  .steval-err-row { grid-template-columns: 4.4rem 1fr 2.8rem; }
  .steval-check-row { grid-template-columns: 1fr 3.2rem; }
  .steval-check-lab { grid-column: 1 / -1; }
  .steval-size--5 { grid-template-columns: repeat(3, 1fr); }
}
@media (prefers-reduced-motion: reduce) {
  .steval-size-bar { animation: none !important; }
}
</style>

Am 20. September haben Berlin und Mecklenburg-Vorpommern gewählt. In diesem Beitrag evaluieren wir unsere **letzten Vorhersagen vor der Wahl** — Berlin Stand 19. September (letzte Umfrage: 18. September), Mecklenburg-Vorpommern Stand 18. September (letzte Umfrage: 17. September) — und vergleichen sie mit den vorläufigen amtlichen Ergebnissen. Die eingefrorenen Prognosen stehen unter [Vergangene Vorhersagen](/archive/posts/vergangene-vorhersagen/). Sachsen-Anhalt zwei Wochen zuvor: [eigene Evaluation](/blog/posts/st-2026-evaluation/).

## Modellbestätigung: drei Wahlen 2026

Das 5/6-Intervall sagt: In fünf von sechs Fällen liegt das Ergebnis in diesem Band. Über ST, BE und MV sind das 24 Partei-Intervalle, also **rund 20 Treffer erwartet**. Bei den Wahlkreisen ist die erwartete Trefferquote das Mittel der Favoriten-Wahrscheinlichkeiten — nicht 100 Prozent, sondern das, was die ausgewiesene Unsicherheit hergibt.

<div class="steval-fig" aria-label="Zweitstimmen-Coverage über drei Wahlen">
  <p class="steval-fig-title">Zweitstimme: Coverage der 5/6-Intervalle</p>
  <div id="ltw26-coverage"></div>
  <p class="steval-fig-cap">16 von 24 Parteien im Intervall (67&nbsp;%). Erwartet waren 83&nbsp;%. Berlin fast vollständig im Band, MV dazwischen, Sachsen-Anhalt der Ausreißer — dort eine besondere Wahl mit wahrscheinlich viel taktischem Wählen. Wo das Ergebnis außerhalb lag, meist nicht weit: Berliner Linke 25,7 vs. 25, MV-CDU 4,9 vs. 5; in ST CDU, Linke und BSW ebenfalls knapp am Rand.</p>
</div>

<div class="steval-fig" aria-label="Wahlkreis-Accuracy über drei Wahlen">
  <p class="steval-fig-title">Wahlkreise: Trefferquote gegen erwartete Genauigkeit</p>
  <div id="ltw26-accuracy"></div>
  <p class="steval-fig-cap">131 von 155 Direktmandaten richtig (84,5&nbsp;%). Erwartet aus den Favoriten-Wahrscheinlichkeiten: 82&nbsp;%. Ungefähr so viele Treffer, wie die kommunizierte Unsicherheit hergibt — in allen drei Ländern bei oder leicht über der Erwartung.</p>
</div>

**Kurz:** Bei den Wahlkreisen liegen wir ungefähr so richtig, wie die ausgewiesene Unsicherheit sagt. Die landesweiten Intervalle waren 2026 etwas zu eng — getrieben vor allem von Sachsen-Anhalt, einer besonderen Wahl mit wahrscheinlich viel taktischem Wählen. Wo das Ergebnis außerhalb des Bandes lag, lag es meist nicht weit außerhalb.

## Berlin: Linke vorne, Rest im Band

Die Linke kommt auf 25,7 Prozent — 4,7 Punkte über der Punktschätzung von 21, knapp über dem oberen Intervallende von 25. **Alle anderen Parteien bleiben im 5/6-Band**, einschließlich BSW (4,7, unter der Hürde) und Kenia wie Rot-Grün-Rot.

<div class="steval-fig" aria-label="Kurzbilanz Berlin">
  <p class="steval-fig-title">Kurzbilanz Berlin</p>
  <div id="beval-score"></div>
  <p class="steval-fig-cap">Vorläufiges Ergebnis der Landeswahlleitung (21. September, 03:34) gegen die letzte veröffentlichte Modellprognose. Quellen: <a href="https://wahlen-berlin.de/wahlen/BE2026/Afspraes/AGH/index.html">AfS Berlin</a>, eingefrorene Prognose vom 19. September.</p>
</div>

<div class="steval-fig" aria-label="Berlin Zweitstimme">
  <p class="steval-fig-title">Zweitstimme: Intervall, Punkt, Ergebnis</p>
  <div class="steval-chart-wrap">
    <canvas id="beval-votes" aria-label="Balkendiagramm 5/6-Intervall mit Punktschätzung und Wahlergebnis Berlin"></canvas>
  </div>
  <p class="steval-fig-cap">Farbige Balken = 5/6-Intervall. Kreise = Punktschätzung. Rauten = vorläufiges Ergebnis (grün im Intervall, rot außerhalb).</p>
</div>

<div class="steval-fig" aria-label="Berlin Abweichung">
  <p class="steval-fig-title">Abweichung vom Wahlergebnis</p>
  <div id="beval-error"></div>
  <p class="steval-fig-cap">Ergebnis minus Punktschätzung. Der Linke-Fehler (+4,7) steht allein; der mittlere absolute Fehler über acht Parteien liegt bei 1,5 Punkten.</p>
</div>

Rot-Grün-Rot und Kenia bleiben beide möglich. Kenia war im Laufe des Abends zwischenzeitlich unsicher, liegt nach dem vorläufigen Sitzbild aber über der Mehrheit (CDU 34 + Grüne 26 + SPD 22 = 82 von 158, Mehrheit 80). R2G kommt auf 95 Sitze unter Führung der Linken. Das BSW bleibt unter 5 Prozent — dafür hatten wir 27 Prozent gegeben.

<div class="steval-fig" aria-label="Berlin Szenarien">
  <p class="steval-fig-title">Welche Szenarien eingetreten sind</p>
  <div id="beval-scenarios"></div>
  <p class="steval-fig-cap">Jedes Kästchen = 5 Prozentpunkte. Linke stärkste Kraft: 44&nbsp;%, also als knappes Rennen ausgewiesen — und eingetreten.</p>
</div>

Das Abgeordnetenhaus bleibt bei **158 Sitzen** (gesetzliches Minimum 130, 2023: 159). Unsere Simulationen lagen höher (Median 173), weil sie mehr CDU-Überhang in den Westbezirken erwarteten.

<div class="steval-fig" aria-label="Berlin Parlamentsgröße">
  <p class="steval-fig-title">Wie groß das Abgeordnetenhaus wird</p>
  <div id="beval-size"></div>
  <p class="steval-fig-cap">Gesetzliches Minimum, Median der Sitzsimulation, vorläufiges Ergebnis, AGH 2023. Vorläufig: Linke 47 (28 Direkt), CDU 34 (27), AfD 29 (12), Grüne 26 (10), SPD 22 (1 Direkt). Wahlbeteiligung 74,2 Prozent (2023: 62,9).</p>
</div>

### 78 Direktmandate

64 von 78 Wahlkreisen haben wir richtig vorhergesagt — etwas über der erwarteten Trefferquote von 79 Prozent. Die Linke holt sechs Direktmandate mehr als prognostiziert, vor allem von CDU und Grünen (22 → 28).

<div class="steval-fig" aria-label="Berlin 78 Wahlkreise">
  <p class="steval-fig-title">78 Direktmandate</p>
  <div class="steval-wk-legend">
    <span><i style="background:#BE3075"></i> Linke</span>
    <span><i style="background:#000"></i> CDU</span>
    <span><i style="background:#009EE0"></i> AfD</span>
    <span><i style="background:#46962b"></i> Grüne</span>
    <span><i style="background:#E3000F"></i> SPD</span>
    <span class="steval-wk-leg-miss"><i></i> Prognose falsch</span>
  </div>
  <div id="beval-districts"></div>
  <p class="steval-fig-cap">Farbe = tatsächliche Gewinnerpartei. Umrandet = Prognose falsch. 14 Fehler, darunter sechs Linke-Gewinne von CDU oder Grünen.</p>
</div>

<div class="steval-miss">
  <div class="steval-miss-card">
    <strong>Sechs zusätzliche Linke-Direktmandate</strong>
    <span>Friedrichshain-Kreuzberg 2 (Grüne mit 66&nbsp;%), Pankow 6 (Grüne 71&nbsp;%), Charlottenburg-Wilmersdorf 1 (CDU 57&nbsp;%), Spandau 3 (CDU 82&nbsp;%), Tempelhof-Schöneberg 4 (Grüne 47&nbsp;%) und Reinickendorf 1 (CDU 79&nbsp;%). Wie in Sachsen-Anhalt und bei der Bundestagswahl 2025 bilden wir lokale Kampagneneffekte nicht ab — in Berlin schlägt das diesmal flächig zugunsten der Linken aus.</span>
  </div>
  <div class="steval-miss-card">
    <strong>Acht weitere Fehlgriffe</strong>
    <span>Pankow 1 (AfD 63&nbsp;% → CDU), Pankow 2 (AfD 47&nbsp;% → CDU), Charlottenburg-Wilmersdorf 4 (Grüne 52&nbsp;% → CDU), Spandau 2 (CDU 61&nbsp;% → AfD), Steglitz-Zehlendorf 1 (CDU 50&nbsp;% → Grüne), Treptow-Köpenick 3 (AfD 49&nbsp;% → SPD), Marzahn-Hellersdorf 4 (CDU 60&nbsp;% → AfD), Reinickendorf 5 (CDU 78&nbsp;% → AfD).</span>
  </div>
</div>

## Mecklenburg-Vorpommern: CDU unter der Hürde

AfD und SPD liegen etwas höher als die Punktschätzung, bleiben aber im Band. **Linke (10 → 6,5) und CDU (7 → 4,9) fallen unter das Intervall**, die CDU damit unter die 5-Prozent-Hürde. Grüne drin, BSW mit 4,8 Prozent raus.

<div class="steval-fig" aria-label="Kurzbilanz MV">
  <p class="steval-fig-title">Kurzbilanz Mecklenburg-Vorpommern</p>
  <div id="mveval-score"></div>
  <p class="steval-fig-cap">Vorläufiges Ergebnis der Landeswahlleitung (21. September, 00:01) gegen die letzte veröffentlichte Modellprognose. Quellen: <a href="https://wahlen.mvnet.de/wahl/land">LAIV / mvnet</a>, eingefrorene Prognose vom 18. September.</p>
</div>

<div class="steval-fig" aria-label="MV Zweitstimme">
  <p class="steval-fig-title">Zweitstimme: Intervall, Punkt, Ergebnis</p>
  <div class="steval-chart-wrap">
    <canvas id="mveval-votes" aria-label="Balkendiagramm 5/6-Intervall mit Punktschätzung und Wahlergebnis MV"></canvas>
  </div>
  <p class="steval-fig-cap">CDU 4,9 Prozent: 0,1 Punkte unter dem unteren Intervallende von 5 — und unter der Hürde. Die Linke liegt klarer außerhalb (6,5 vs. 8–13). Sonstige 3,4 vs. oberes Ende 3.</p>
</div>

<div class="steval-fig" aria-label="MV Abweichung">
  <p class="steval-fig-title">Abweichung vom Wahlergebnis</p>
  <div id="mveval-error"></div>
  <p class="steval-fig-cap">Linke (−3,5) und CDU (−2,1) tragen den Fehler; AfD und SPD holen 1,2 bzw. 2,5 Punkte mehr als die Punktschätzung, bleiben aber im Band. MAE: 1,7 Punkte.</p>
</div>

Der Landtag bleibt bei der gesetzlichen Mindestgröße von **71 Sitzen** (2021: 79). Die letzte Vorhersage sah ihn ganz überwiegend genau dort. AfD 32 (22 Direkt), SPD 29 (14 Direkt), Linke 5, Grüne 5. Mehrheit ohne AfD: SPD, Grüne und Linke kommen auf 39 Sitze. SPD plus Linke allein reicht nicht (34).

<div class="steval-fig" aria-label="MV Szenarien">
  <p class="steval-fig-title">Welche Szenarien eingetreten sind</p>
  <div id="mveval-scenarios"></div>
  <p class="steval-fig-cap">Grüne über 5 Prozent: 52&nbsp;%, also als offenes Rennen ausgewiesen — und eingetreten. BSW-Einzug 8&nbsp;%, nicht eingetreten. Absolute Mehrheit der AfD 2&nbsp;%, nicht eingetreten.</p>
</div>

<div class="steval-fig" aria-label="MV Landtagsgröße">
  <p class="steval-fig-title">Wie groß der Landtag wird</p>
  <div id="mveval-size"></div>
  <p class="steval-fig-cap">Gesetzliches Minimum, Median der Sitzsimulation, vorläufiges Ergebnis, Landtag 2021. Wahlbeteiligung 78,1 Prozent (2021: 70,8).</p>
</div>

### 36 Direktmandate

29 von 36 Wahlkreisen richtig — bei einer erwarteten Trefferquote von 79 Prozent. Sechs der sieben Fehler sind SPD→AfD; umgekehrt geht nur Stralsund II an die SPD, wo wir die AfD vorne gesehen hatten.

<div class="steval-fig" aria-label="MV 36 Wahlkreise">
  <p class="steval-fig-title">36 Direktmandate</p>
  <div class="steval-wk-legend">
    <span><i style="background:#009EE0"></i> AfD</span>
    <span><i style="background:#E3000F"></i> SPD</span>
    <span class="steval-wk-leg-miss"><i></i> Prognose falsch</span>
  </div>
  <div id="mveval-districts"></div>
  <p class="steval-fig-cap">Farbe = tatsächliche Gewinnerpartei. 2021: SPD 34, AfD 1, CDU 1. 2026: AfD 22, SPD 14.</p>
</div>

<div class="steval-miss">
  <div class="steval-miss-card">
    <strong>WK 18 Ludwigslust-Parchim II — SPD mit 82&nbsp;% vorne gesehen, AfD gewinnt.</strong>
    <span>Der selbstsicherste Fehlgriff. Die übrigen SPD→AfD: Neubrandenburg I und Landkreis Rostock IV je 64&nbsp;%, Ludwigslust-Parchim V 59&nbsp;%, Nordwestmecklenburg II 58&nbsp;%, Mecklenburgische Seenplatte IV 54&nbsp;%.</span>
  </div>
  <div class="steval-miss-card">
    <strong>WK 26 Stralsund II — AfD mit 69&nbsp;% vorne gesehen, SPD gewinnt.</strong>
    <span>Der einzige Fehler in die andere Richtung.</span>
  </div>
</div>

## Was bleibt

Über drei Landtagswahlen 2026 treffen die **Wahlkreise** ungefähr so oft, wie die kommunizierte Unsicherheit hergibt: 131 von 155 Direktmandaten, leicht über der erwarteten Trefferquote. Die **landesweiten 5/6-Intervalle** haben 16 von 24 Parteien gehalten — weniger als die nominalen fünf Sechstel. Der Ausreißer ist Sachsen-Anhalt, eine besondere Wahl mit wahrscheinlich viel taktischem Wählen; wo das Ergebnis außerhalb lag, meist nicht weit (Berliner Linke, MV-CDU, in ST CDU/Linke/BSW). Berlin lag fast vollständig im Band.

Die eingefrorenen Vorhersagen bleiben unverändert unter [Vergangene Vorhersagen](/archive/posts/vergangene-vorhersagen/).

---

Methode: [Landtagswahl-Vorhersage](/blog/posts/state-forecast-methodology/), [Wahlkreis-Vorhersage](/blog/posts/district-forecast-methodology/). Letzte Vorhersagen vor der Wahl: [Vergangene Vorhersagen](/archive/posts/vergangene-vorhersagen/). Ergebnisse: [AfS Berlin AGH 2026](https://wahlen-berlin.de/wahlen/BE2026/Afspraes/AGH/index.html) und [LAIV MV LTW 2026](https://wahlen.mvnet.de/wahl/land), vorläufig, nicht die endgültigen Ergebnisse der Landeswahlausschüsse. Sachsen-Anhalt: [Evaluation vom 7. September](/blog/posts/st-2026-evaluation/).

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
<script>
  if (typeof Chart !== 'undefined' && typeof ChartDataLabels !== 'undefined') {
    Chart.register(ChartDataLabels);
  }
</script>
<script src="/js/be-mv-eval-viz.js"></script>
