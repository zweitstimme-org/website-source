---
title: "Vergangene Vorhersagen"
date: 2026-09-10T12:00:00+02:00
draft: false
kicker: "Archiv"
description: "Letzte Modellprognosen vor dem Wahltag — eingefroren, nicht mit dem Wahlergebnis überschrieben."
---

Nach der Wahl nehmen wir die Vorhersage von der Startseite. Hier bleibt die **letzte veröffentlichte Modellprognose vor dem Wahltag** stehen: Punktschätzung, 5/6-Unsicherheitsintervall und Szenario-Wahrscheinlichkeiten wie am letzten Tag vor der Wahl.

Für Sachsen-Anhalt 2026 ist das der Stand vom 4. September (letzte Umfrage: 3. September). Die Auswertung, was davon eingetroffen ist, steht in der [Evaluation](/blog/posts/st-2026-evaluation/).

<div class="past-forecasts" id="past-forecasts">
  <div class="state-coats-of-arms" id="past-forecasts-targets"></div>
  <p id="past-forecasts-empty" hidden>Noch keine eingefrorenen Vorhersagen.</p>
  <div class="past-forecasts-chart-wrap">
    <canvas id="past-forecasts-chart" aria-label="Eingefrorene Modellprognose"></canvas>
  </div>
  <p class="past-forecasts-note">
    Letzte Modellprognose vor der Wahl — nicht mit dem Wahlergebnis aktualisiert<span id="past-forecasts-stand"></span>.
    <a href="/blog/posts/state-forecast-methodology/">Wie funktioniert die Vorhersage?</a>
  </p>
  <div id="past-forecasts-scenarios" class="scenario-prob-panel" style="display:none">
    <h3 class="scenario-prob-heading">Szenario-Wahrscheinlichkeiten</h3>
    <div id="past-forecasts-scenarios-list" class="scenario-prob-list is-collapsed"></div>
    <button type="button" id="past-forecasts-scenarios-toggle" class="scenario-prob-toggle" style="display:none" aria-expanded="false">Mehr anzeigen</button>
  </div>
  <div id="past-forecasts-districts" class="scenario-prob-panel" style="display:none">
    <h3 class="scenario-prob-heading">Wahlkreise und Listen</h3>
    <div id="vorhersage-districts-section" class="vorhersage-home-map past-forecasts-map">
      <div id="vorhersage-districts-map"></div>
    </div>
    <div id="vorhersage-districts-legend" class="past-forecasts-map-legend"></div>
    <div class="vorhersage-subpage-links" aria-label="Weiterführende Links">
      <a id="past-forecasts-link-wahlkreise" class="scenario-prob-toggle vorhersage-subpage-link" href="/direktmandate/">→ Wahlkreise</a>
      <a id="past-forecasts-link-einzug" class="scenario-prob-toggle vorhersage-subpage-link" href="/einzug/">→ Alle Kandidierende</a>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
{{< site_js "js/chart-logo-watermark.js" >}}
{{< site_js "js/pipeline-data.js" >}}
{{< site_js "js/enhanced-party-mapper.js" >}}
{{< site_js "js/district-forecast-map.js" >}}
{{< site_js "js/past-forecasts.js" >}}
