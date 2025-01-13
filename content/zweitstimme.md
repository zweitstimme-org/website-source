---
title: "Zweitstimme"
layout: "page"
summary: "Zweitstimme Prognosen"
url: "/zweitstimme"
---

<section>
  <div class="content-wrapper">
    <h3 style="color: var(--primary); text-align: center;">Vorhersagetrend</h3>
    <div style="position: relative; padding-bottom: 50%; height: 0; margin-top: -10px;">
      <iframe src="https://polsci.uni-wh.de/interactive_trend"
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
              allowfullscreen>
      </iframe>
    </div>
    <p>(Stand: <span id="forecast-text">lädt...</span>)</p>
    <p>Diese Grafik zeigt die zeitliche Entwicklung unserer Wahlprognosen. Die Linien stellen die prognostizierten Stimmenanteile der Parteien dar, basierend auf unserem statistischen Modell zum jeweiligen Zeitpunkt. Da unser Modell auch auf aktuellen Umfragen basiert, verändert sich unsere Vorhersage ständig. Unser Modell für die Zweitstimme 2025 beschreiben wir in unserem <a href="/posts/blog/zweitstimme-model/">Blogpost</a>.</p>
  </div>
</section>

<section class="section-alt">
  <div class="content-wrapper">
    <h2>Wahrscheinlichkeiten</h2>
    <p>Basierend auf unseren Modellen für die Erst- und Zweitstimmen, berechnen wir zusätzlich die Wahrscheinlichkeiten für die Eintritt ins Parlament und die Wahrscheinlichkeiten für die verschiedenen Koalitionsoptionen. Diese Wahrscheinlichkeiten berücksichtigen neben der 5%-Hürde auch die Grundmandatsklausel (mind. drei gewonnene Wahlkreise) über unser Erststimme-Modell. Mehr dazu in unserem <a href="/posts/blog/probabilities/">Blogpost</a>.</p>
    <div class="probability-row">
      <!-- Probability boxes here -->
    </div>

<div class="probability-row">
  <!-- First Column -->
  <div class="probability-column">
    <div class="probability-box">
      <div class="box-header">
        <h4>Eintritt ins Parlament</h4>
      </div>
      <div class="box-content">
        <ul style="list-style-type: none; padding-left: 0;">
          <li>
            Grüne <span id="hurdle_gru" style="display: none;">lädt...</span>
            <div class="progress-bar">
              <div class="progress" id="progress_gru"></div>
            </div>
          </li>
          <li>
            BSW <span id="hurdle_bsw" style="display: none;">lädt...</span>
            <div class="progress-bar">
              <div class="progress" id="progress_bsw"></div>
            </div>
          </li>
          <li>
            FDP <span id="hurdle_fdp" style="display: none;">lädt...</span>
            <div class="progress-bar">
              <div class="progress" id="progress_fdp"></div>
            </div>
          </li>
          <li>
            Linke <span id="hurdle_lin" style="display: none;">lädt...</span>
            <div class="progress-bar">
              <div class="progress" id="progress_lin"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Second Column -->
  <div class="probability-column">
    <div class="probability-box">
      <div class="box-header">
        <h4>Wahrscheinlichkeiten für Mehrheiten</h4>
      </div>
      <div class="box-content">
        <ul style="list-style-type: none; padding-left: 0;">
          <li>
            CDU/CSU, Grüne und SPD <span id="maj_cdu_csu_gru_spd" style="display: none;">lädt...</span>
            <div class="progress-bar">
              <div class="progress" id="progress_cdu_csu_gru_spd"></div>
            </div>
          </li>
          <li>
            CDU/CSU und AfD <span id="maj_cdu_csu_afd" style="display: none;">lädt...</span>
            <div class="progress-bar">
              <div class="progress" id="progress_cdu_csu_afd"></div>
            </div>
          </li>
          <li>
            CDU/CSU und SPD <span id="maj_cdu_csu_spd" style="display: none;">lädt...</span>
            <div class="progress-bar">
              <div class="progress" id="progress_cdu_csu_spd"></div>
            </div>
          </li>
          <li>
            CDU/CSU und Grüne <span id="maj_cdu_csu_gru" style="display: none;">lädt...</span>
            <div class="progress-bar">
              <div class="progress" id="progress_cdu_csu_gru"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
  </div>
</section>

<style>
section {
    padding: 2rem 0;
    width: 100%;
    margin: 0;
}

.section-alt {
    background-color: rgb(245, 245, 245);
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
}

.content-wrapper {
    max-width: var(--main-width);
    margin: 0 auto;
    padding: 0 var(--gap);
}

/* Probability boxes specific styles */
.probability-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.probability-column {
  flex: 1;
  max-width: 400px;
}

.probability-box {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.probability-box .box-header {
  padding: 8px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  line-height: 1.2;
}

.probability-box .box-header h4 {
  margin: 0;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  padding: 0;
  line-height: inherit;
}

.probability-box .box-content {
  padding: 15px;
  background-color: white;
  margin-top: -1px;
}

@media (max-width: 768px) {
  .probability-row {
    flex-direction: column;
    align-items: center;
  }
  
  .probability-column {
    width: 100%;
    margin-bottom: 20px;
  }
}

.progress-bar {
  width: 90%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-top: 4px;
  margin-bottom: 12px;
  overflow: visible;
  position: relative;
}

.progress {
  height: 100%;
  width: 0%;
  transition: width 0.5s ease-in-out;
  background-size: 30px 30px;
  position: relative;
}

.progress::after {
  content: attr(data-percentage);
  position: absolute;
  right: -35px;
  top: -7px;
  font-size: 0.8rem;
  color: #666;
}

/* Party Colors */
.progress-bsw {
  background-color: #FF8C00;
}

.progress-fdp {
  background-color: #FFED00;
}

.progress-lin {
  background-color: #800080;
}

/* Coalition Stripes */
.progress-cdu-gru-spd {
  background: linear-gradient(to right, 
    #000000 0, #000000 33%, 
    #46962b 33%, #46962b 66%, 
    #E3000F 66%, #E3000F 100%
  );
}

.progress-cdu-afd {
  background: linear-gradient(to right,
    #000000 0, #000000 50%,
    #009EE0 50%, #009EE0 100%
  );
}

.progress-cdu-spd {
  background: linear-gradient(to right,
    #000000 0, #000000 50%,
    #E3000F 50%, #E3000F 100%
  );
}

.progress-cdu-gru {
  background: linear-gradient(to right,
    #000000 0, #000000 50%,
    #46962b 50%, #46962b 100%
  );
}

.progress-gru {
  background-color: #46962b;
}
</style>

<script>
function toggleCollapse(button) {
  const content = button.nextElementSibling;
  const arrow = button.querySelector('h4');
  
  if (content.style.display === "none") {
    content.style.display = "block";
    arrow.innerHTML = arrow.innerHTML.replace('▲', '▼');
  } else {
    content.style.display = "none";
    arrow.innerHTML = arrow.innerHTML.replace('▼', '▲');
  }
}
</script>

<script>
    function fetchForecast() {
        // Fetch forecast data from the Plumber API
        fetch("https://polsci.uni-wh.de/forecast")
            .then(response => response.json())
            .then(data => {
                // Get the last updated timestamp
                fetch("https://polsci.uni-wh.de/last_updated")
                    .then(response => response.json())
                    .then(lastUpdatedData => {
                        const lastUpdated = new Date(lastUpdatedData.last_updated);
                        const formattedDate = formatDateToGerman(lastUpdated);
                        document.getElementById('forecast-values').textContent = formattedDate;
                        document.getElementById('forecast-text').textContent = formattedDate;
                    })
                    .catch(err => console.error('Fehler beim Laden des Datums:', err));
            })
            .catch(err => console.error('Fehler beim Laden der Prognose:', err));
    }

    // Function to format date to German format
    function formatDateToGerman(date) {
        const months = [
            "Januar", "Februar", "März", "April", "Mai", "Juni", 
            "Juli", "August", "September", "Oktober", "November", "Dezember"
        ];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day}. ${month} ${year}`;
    }

    // Call fetchForecast when page loads
    window.onload = function() {
        console.log('Page loaded');
        fetchForecast();
    };

  // Fetch the JSON data from the API
  fetch('https://polsci.uni-wh.de/pred_probabilities')
    .then(response => response.json())
    .then(data => {
      const probabilities = data[0];
      
      // Update with party colors including Grüne
      updateProbability('hurdle_gru', 'progress_gru', probabilities.hurdle_gru, 'gru');
      updateProbability('hurdle_bsw', 'progress_bsw', probabilities.hurdle_bsw, 'bsw');
      updateProbability('hurdle_fdp', 'progress_fdp', probabilities.hurdle_fdp, 'fdp');
      updateProbability('hurdle_lin', 'progress_lin', probabilities.hurdle_lin, 'lin');
      
      // Update with coalition stripes
      updateProbability('maj_cdu_csu_gru_spd', 'progress_cdu_csu_gru_spd', probabilities.maj_cdu_csu_gru_spd, 'cdu-gru-spd');
      updateProbability('maj_cdu_csu_afd', 'progress_cdu_csu_afd', probabilities.maj_cdu_csu_afd, 'cdu-afd');
      updateProbability('maj_cdu_csu_spd', 'progress_cdu_csu_spd', probabilities.maj_cdu_csu_spd, 'cdu-spd');
      updateProbability('maj_cdu_csu_gru', 'progress_cdu_csu_gru', probabilities.maj_cdu_csu_gru, 'cdu-gru');
    })
    .catch(error => console.error('Error fetching probabilities:', error));

function updateProbability(textId, progressId, value, type) {
  const percentage = (value * 100).toFixed(0);
  document.getElementById(textId).textContent = percentage + '%';
  const progressBar = document.getElementById(progressId);
  progressBar.style.width = percentage + '%';
  progressBar.setAttribute('data-percentage', percentage + '%');
  
  // Add appropriate class based on type
  switch(type) {
    case 'bsw':
      progressBar.className = 'progress progress-bsw';
      break;
    case 'fdp':
      progressBar.className = 'progress progress-fdp';
      break;
    case 'lin':
      progressBar.className = 'progress progress-lin';
      break;
    case 'cdu-gru-spd':
      progressBar.className = 'progress progress-cdu-gru-spd';
      break;
    case 'cdu-afd':
      progressBar.className = 'progress progress-cdu-afd';
      break;
    case 'cdu-spd':
      progressBar.className = 'progress progress-cdu-spd';
      break;
    case 'cdu-gru':
      progressBar.className = 'progress progress-cdu-gru';
      break;
    case 'gru':
      progressBar.className = 'progress progress-gru';
      break;
  }
}

// Function to fetch and update the "Stand" information
function updateStand() {
  fetch('https://polsci.uni-wh.de/last_updated')
    .then(response => response.json())
    .then(data => {
      const lastUpdated = new Date(data.last_updated);
      const formattedDate = formatDateToGerman(lastUpdated);
      document.getElementById('forecast-text').textContent = formattedDate;
    })
    .catch(error => console.error('Error fetching last updated date:', error));
}

// Call updateStand when the page loads
window.onload = function() {
  updateStand();
};
</script>