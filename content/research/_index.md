---
title: "Forschung"
layout: "forschung"
url: "/research/posts"
description: "Transparente, peer-reviewed Wahlprognosemodelle – für Bundestag und Landtage."
---

<div class="intro-card">
<p>Für uns als Wissenschaftler:innen ist es zentral, dass unsere Prognosen <strong>transparent und nachvollziehbar</strong> sind. Seit 2017 entwickeln und evaluieren wir das Zweitstimme-Modell in peer-reviewed Fachzeitschriften und stellen Code sowie Replikationsdaten öffentlich bereit.</p>
</div>

<div class="pillar-grid">
  <div class="pillar-card">
    <h3>Zweitstimmenmodell</h3>
    <p>Strukturelle Langfristfaktoren (seit 1949) mit aktuellen Umfragen, bayesianisch geschätzt und als Wahrscheinlichkeiten kommuniziert.</p>
  </div>
  <div class="pillar-card">
    <h3>Wahlkreismodell</h3>
    <p>Übertragung nationaler Trends auf die Wahlkreise – u. a. über Swing-Annahmen – und Vorhersage von Direktmandat-Wahrscheinlichkeiten.</p>
  </div>
  <div class="pillar-card">
    <h3>Landtagswahlen</h3>
    <p>Bayesianische Prognosen für subnationale Wahlen, trainiert auf deutschen Landtagswahlen seit den 1990er Jahren.</p>
  </div>
</div>

<p>Das Modell wurde für die Bundestagswahlen 2017, 2021 und 2025 weiterentwickelt, auf Landtagswahlen übertragen und methodisch zu Swing- und Sitzprognosen vertieft. Code und Replikationen finden Sie auf <a href="https://github.com/zweitstimme-org">GitHub</a> sowie in den Datensätzen zu den einzelnen Papers.</p>

<div class="detail-card">
<h4>Das Zweitstimmenmodell</h4>
<p>Die strukturelle Komponente nutzt Faktoren, die sich historisch als relevant erwiesen haben – etwa frühere Wahlergebnisse, historische Umfragen und die Information, ob eine Partei den Kanzler oder die Kanzlerin stellte. Früh verfügbare Informationen ermöglichen so bereits Monate vor der Wahl eine erste Prognose.</p>
<p>Um kurzfristige Stimmungsschwankungen abzubilden, mischen wir diese Strukturinformation mit veröffentlichten Sonntagsfragen. Je näher der Wahltag rückt, desto stärker gewichtet das Modell die Umfragekomponente. Über MCMC-Simulationen entstehen daraus Wahrscheinlichkeiten für Ereignisse wie Mehrheiten oder Koalitionsoptionen – nicht nur Punktprognosen.</p>
</div>

<div class="detail-card">
<h4>Das Wahlkreismodell</h4>
<p>Mit dem Wahlkreismodell schätzen wir, wer in welchem Wahlkreis das Direktmandat gewinnen kann und wie unsicher diese Prognose ist. Dazu übertragen wir simulierte Zweitstimmenergebnisse über Swing-Annahmen auf die Wahlkreise und modellieren das Verhältnis von Erst- und Zweitstimme, inklusive Kandidierenden- und Wahlkreisfaktoren.</p>
<p>Welche Swing-Annahme man wählt (z. B. uniform vs. proportional), beeinflusst die Präzision von Sitzprognosen – das untersuchen wir in unserer jüngsten Arbeit in <em>Electoral Studies</em>.</p>
</div>

<div class="detail-card">
<h4>Landtagswahlen</h4>
<p>Neben der Bundesebene erstellen wir Vorhersagen für <strong>Landtagswahlen</strong>. Das Modell kombiniert aktuelle Landesumfragen mit strukturellen Faktoren – etwa dem letzten Landtagswahlergebnis, dem Bundestrend und der Regierungsbeteiligung im Land – und ist auf einer großen Zahl vergangener Landtagswahlen trainiert.</p>
<p>So entstehen Punktschätzungen, Unsicherheitsintervalle und Szenario-Wahrscheinlichkeiten auch unterhalb der Bundesebene. Methodik und Evaluation sind in unserer Arbeit zu subnationalen Wahlprognosen in <em>Electoral Studies</em> (2025) dokumentiert; eine allgemeinverständliche Erklärung finden Sie im <a href="/blog/posts/state-forecast-methodology/">Blogbeitrag zur Landtagswahl-Vorhersage</a>.</p>
</div>
