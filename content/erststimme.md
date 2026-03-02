---
title: "Erststimmen"
layout: "page"
url: "/erststimme"
---

<section>

 <div style="background-color: #e8f5e9; border: 1px solid #4caf50; border-radius: 4px; padding: 15px; margin: 20px 0;">
    <strong>Lesen Sie unsere <a href="/posts/blog/evaluation-2025" style="color: #2196f3; text-decoration: none;">Evaluation der Wahlprognosen zur Bundestagswahl 2025</a>!</strong>
</div>
  
<div style="text-align: center; margin-bottom: 10px;">
  <button id="mapToggleErststimme" class="map-toggle-button active">Gewinnwahrscheinlichkeit</button>
  <button id="mapToggleVacant" class="map-toggle-button">Nicht besetzte Mandate</button>
</div>

<div class="info-box">
  <p id="map-description">Die Karte zeigt für jeden Wahlkreis die Wahrscheinlichkeit, dass die jeweilige Partei das Direktmandat gewinnt.</p>
</div>

<div class="content-wrapper">
  <div style="margin-top: 8px; color: #666; font-size: 0.9em;text-align: center;">
    <i class="fas fa-mouse-pointer"></i> Klicken Sie auf einen Wahlkreis für Details
  </div>
  <div style="margin: 0px 0;">
    <div style="position: relative; padding-bottom: 100%; height: 0;">
      <iframe id="mapIframe" 
              src="/interactive_districts_probability.html" 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
              frameborder="0">
      </iframe>
    </div>
  </div>

  <!-- Remove the static party legend HTML and replace with empty div -->
  <div class="party-legend" id="party-legend">
  </div>

  <!-- Update the gradient legend HTML -->
  <div class="gradient-legend" id="gradient-legend" style="display: none;">
    <div class="gradient-bar"></div>
    <div class="gradient-labels">
      <span>unwahrscheinlich</span>
      <span>wahrscheinlich</span>
    </div>
  </div>

  <div class="info-box">
    <p>(Stand: <span id="forecast-values">lädt...</span>)</p>
    <p>Hier finden Sie für alle Wahlkreise und Parteien die vorhergesagten <strong>Erststimmenanteile</strong> und <strong>Gewinnwahrscheinlichkeiten</strong>. Für Wahlkreise in denen auch andere Parteien eine Gewinnwahrscheinlichkeit über 5% haben, werden diese in den Karten aufgeführt. Unser Modell für die Erststimme 2025 beschreiben wir in unserem <a href="/posts/blog/erststimme-model/">Blogpost</a>.</p>
    <p style="color: rgb(15, 109, 165);"><strong>Wichtig:</strong> Die Vorhersagen basieren auf einer Modellrechnung, die vor allem Informationen aus Umfragen auf Bundesebene nutzen. Es handelt sich nicht um eigene Umfragen im Wahlkreis. Die Vorhersagen berücksichtigen keine Stimmungen im Wahlkreis, die von nationalen Umfragen abweichen. Deshalb sind sie mit großer Unsicherheit behaftet.
    Es ist damit zu rechnen, dass das Wahlergebnis für einzelne Kandidierende deutlich von der Vorhersage abweicht. Wir raten deshalb davon ab, wahlrelevante Entscheidungen einzig auf Basis unserer Vorhersage zu treffen. Mehr Informationen zu unserem Modell finden Sie <a href="/posts/blog/erststimme-model/">hier</a>.</p>
    <p style="color: rgb(15, 109, 165);"><strong>Hinweis (18.02.2025):</strong> Am 18.2. produzierte unser Modell Prognosen, die unter anderem dazu führten, dass für Die Linke in einigen Wahlkreisen sehr hohe Erststimmenanteile vorhergesagt wurden. Ursächlich dafür war eine Modellannahme bezüglich der Aufteilung von Stimmanteilen zwischen Die Linke und BSW, die mittlerweile angepasst wurde.</p>
  </div>


  <div style="background-color: #e8f5e9; border: 1px solid #4caf50; border-radius: 4px; padding: 15px; margin: 20px 0;">
    <strong>Testen Sie unseren <a href="/posts/blog/ballot" id="ballotLink" style="color: #2196f3; text-decoration: none;">Stimmzettel-Simulator</a>!</strong> Sehen Sie, wie der Stimmzettel in Ihrem Wahlkreis aussehen könnte.
  </div>

</section>

<!-- Include jQuery and DataTables library -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>

<!-- Add custom CSS for the search field and pagination -->
<style>
  section {
    padding: 1.5rem 0;
    width: 100%;
    margin: 0;
}

@media screen and (max-width: 768px) {
    section {
        padding: 1rem 0;
    }
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

  .dataTables_filter input {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 6px 12px;
    margin-left: 8px;
  }
  
  .dataTables_filter input:focus {
    background-color: #fff;
    border-color: #aaa;
    outline: none;
    box-shadow: 0 0 3px rgba(0,0,0,0.1);
  }

  /* Smaller font size for the forecast table */
  #forecastTable {
    font-size: 0.6em; /* Adjust this value as needed */
  }

  /* Responsive font size for smaller screens */
  @media screen and (max-width: 768px) {
    #forecastTable {
      font-size: 0.4em; /* Adjust this value as needed */
    }
  }

  /* Center the pagination controls */
  .dataTables_wrapper .dataTables_paginate {
    display: flex;
    justify-content: center;
    width: 100%; /* Ensure it takes full width */
    margin-top: 10px; /* Add some spacing above if needed */
  }

  /* Style the pagination buttons to be text-only */
  .dataTables_paginate .paginate_button {
    padding: 0; /* Remove padding */
    margin: 0 4px; /* Adjust margin for spacing */
    border: none; /* Remove border */
    background: none; /* Remove background */
    color: #007bff; /* Set text color */
    cursor: pointer;
  }

  .dataTables_paginate .paginate_button:hover {
    text-decoration: underline; /* Add underline on hover */
  }

  .dataTables_paginate .paginate_button.current {
    font-weight: bold; /* Highlight the current page */
  }

  #forecastTable th:nth-child(2), #forecastTable td:nth-child(2) {
    width: 30%; /* Adjust this value as needed */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Specific styles for map toggle buttons */
  .map-toggle-button {
    padding: 10px 20px;
    background-color: white;
    border: 1px solid var(--primary);
    color: var(--primary);
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin: 5px;
    transition: all 0.2s ease;
  }

  .map-toggle-button:hover {
    background-color: #f0f0f0;
  }

  .map-toggle-button.active {
    background-color: var(--primary);
    color: white;
  }

  @media screen and (max-width: 768px) {
    .map-toggle-button {
        padding: 8px 16px;
        font-size: 14px;
        margin: 3px;
    }
  }

  .search-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,.25);
  }

  .dataTables_wrapper {
    width: 100%;
  }

  table.dataTable {
    width: 100% !important;
    margin: 0 !important;
  }

  table.dataTable td {
    white-space: normal;
    word-break: break-word;
  }

  /* Sorting indicators */
  table.dataTable thead th {
    position: relative;
    cursor: pointer;
    padding-right: 20px !important; /* Space for the indicator */
  }

  table.dataTable thead th::after,
  table.dataTable thead th::before {
    position: absolute;
    right: 8px;
    display: block;
    opacity: 0.3;
    line-height: 9px;
    font-size: 0.8em;
  }

  /* Up triangle */
  table.dataTable thead th::before {
    content: '▲';
    top: 30%;
  }

  /* Down triangle */
  table.dataTable thead th::after {
    content: '▼';
    bottom: 30%;
  }

  /* Active sort indicators */
  table.dataTable thead th.sorting_asc::before {
    opacity: 1;
  }

  table.dataTable thead th.sorting_desc::after {
    opacity: 1;
  }

  /* Remove sorting indicators from non-sortable columns if needed */
  table.dataTable thead th.no-sort::after,
  table.dataTable thead th.no-sort::before {
    display: none;
  }

  .iframe-section {
    margin: 0; /* Reset margins */
  }

  .iframe-wrapper {
    position: relative;
    padding-bottom: 50%;
    height: 0;
    margin: -10px 0; /* Negative margin to reduce space */
  }

  .iframe-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  @media screen and (max-width: 768px) {
    .iframe-wrapper {
        margin: -10px 0; /* Keep the same tight margins on mobile */
        padding-bottom: 60%; /* Slightly taller for mobile */
    }
    
    .iframe-section {
        margin: 0; /* Ensure no extra margins on mobile */
    }
  }

  .tooltip {
    position: absolute;
    padding: 8px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid #ddd;
    border-radius: 4px;
    pointer-events: none;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .search-container {
    position: relative;
    max-width: 500px;
    margin: 0 auto 20px auto;
  }

  .search-input-wrapper {
    position: relative;
    width: 100%;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    pointer-events: none;
    z-index: 1;
  }

  .search-input {
    width: 100%;
    padding: 10px 12px 10px 40px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  @media screen and (max-width: 600px) {
    .search-input {
        padding: 8px 8px 8px 36px;
        font-size: 13px;
    }
    
    .search-icon {
        left: 10px;
        width: 14px;
        height: 14px;
    }
  }

  .search-results {
    display: none;
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .search-result-item {
    padding: 10px 15px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
  }

  .search-result-item:last-child {
    border-bottom: none;
  }

  .search-result-item:hover {
    background-color: #f5f5f5;
  }

  .search-result-type {
    color: #666;
    font-size: 0.8em;
    margin-left: 8px;
  }

  @media screen and (max-width: 600px) {
    .search-input::placeholder {
        content: "Suche nach Wahlkreis, PLZ oder Kandidat:in...";
    }
  }

  /* Party legend styling */
  .party-legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin: 1.5rem auto;
    padding: 0 1rem;
    max-width: 800px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.25rem;
  }

  .color-box {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .party-name {
    font-size: 0.9rem;
    color: var(--primary);
  }

  @media screen and (max-width: 768px) {
    .party-legend {
      gap: 0.75rem;
    }
    
    .legend-item {
      margin: 0.2rem;
    }
    
    .color-box {
      width: 14px;
      height: 14px;
    }
    
    .party-name {
      font-size: 0.8rem;
    }
  }

  /* Update gradient legend styling */
  .gradient-legend {
    margin: 1.5rem auto;
    padding: 0 1rem;
    max-width: 300px;
    text-align: center;
  }

  .gradient-bar {
    height: 20px;
    background: linear-gradient(to right, #ffffff, #000000);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin-bottom: 0.5rem;
  }

  .gradient-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: var(--primary);
  }

  @media screen and (max-width: 768px) {
    .gradient-labels {
      font-size: 0.8rem;
    }
  }

  .info-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #007bff;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
    cursor: pointer;
    margin-left: 5px;
    font-style: normal;
    vertical-align: middle;
    position: relative;
  }

  .info-icon:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 100%;
    margin-bottom: 5px;
    background: rgba(255, 255, 255, 0.95);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    color: black;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 1000;
  }

  .info-box {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 15px 20px;
    margin: 20px 0;
    border: 1px solid #e0e0e0;
  }

  .info-box p {
    margin: 0;
    color: #333;
    line-height: 1.5;
  }

  .info-box p:not(:last-child) {
    margin-bottom: 10px;
  }

  .dice {
    font-size: 100px;
    margin: 20px;
    display: inline-block;
    transition: transform 0.5s;
  }
  
  .rolling {
    animation: roll 0.5s linear infinite;
  }
  
  @keyframes roll {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .bar-container {
    width: 200px;
    height: 20px;
    background-color: #ddd;
    margin: 10px auto;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .bar {
    height: 100%;
    background-color: var(--primary);
    width: 0%;
    transition: width 0.3s ease;
    position: relative;
    border-radius: 10px;
  }
  
  .bar::after {
    content: attr(data-value);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    white-space: nowrap;
    transition: all 0.3s ease;
    right: 0;
    transform: translate(calc(100% + 8px), -50%);
    color: #333;
  }

  /* Show white text with shadow when bar is wide enough */
  .bar[style*="width: 8"] ~ .bar::after,
  .bar[style*="width: 9"] ~ .bar::after,
  .bar[style*="width: 1"] ~ .bar::after {
    right: 8px;
    transform: translateY(-50%);
    color: white;
    text-shadow: 0 0 2px rgba(0,0,0,0.5);
  }
  
  .dice-stats {
    margin: 20px auto;
    border-collapse: collapse;
    width: 120%;
    max-width: 400px;
  }
  
  .dice-stats th, 
  .dice-stats td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  
  .dice-button {
    padding: 8px 16px;
    margin: 0 5px;
    background-color: white;
    border: 1px solid var(--primary);
    color: var(--primary);
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
  }
  
  .dice-button:hover {
    background-color: var(--primary);
    color: white;
  }
  
  @media screen and (max-width: 768px) {
    .dice {
      font-size: 80px;
    }
    
    .dice-button {
      padding: 6px 12px;
      font-size: 12px;
      margin: 3px;
    }
    
    .dice-stats {
      width: 100%;
      font-size: 14px;
    }
  }
</style>

<!-- Initialize DataTable and fetch data from the API -->
<script>
    function fetchForecast() {
        // Get the last updated timestamp
        fetch("/last_updated.json")
            .then(response => response.json())
            .then(lastUpdatedData => {
                const lastUpdated = new Date(lastUpdatedData.last_updated);
                const formattedDate = formatDateToGerman(lastUpdated);
                document.getElementById('forecast-values').textContent = formattedDate;
            })
            .catch(err => console.error('Fehler beim Laden des Datums:', err));
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

    // Add a single consolidated DOMContentLoaded event listener
    document.addEventListener('DOMContentLoaded', function() {
        // Fetch the last updated timestamp
        fetchForecast();
        updatePlaceholder();
        
        // Initialize all data and components
        initializeData().then(() => {
            initializeSearch();
            updateDistrict(currentDistrict);
            updateNavigationButtons();
            loadTableData();
        });
    });

    function loadTableData(mode) {
      const table = $('#forecastTable').DataTable();
      table.clear();
      
      // Instead of fetching again, use the existing districts data
      const sortedDistricts = Object.values(districts)
        .sort((a, b) => a.wkr - b.wkr);

      // Add rows for each district
      sortedDistricts.forEach(district => {
        // Check if the district has a parties property
        if (!district.parties) {
            console.warn(`District ${district.wkr} is missing parties data.`);
            return; // Skip this district if parties data is missing
        }

        // Sort parties by vote share
        district.parties.sort((a, b) => b.value - a.value);
        
        // Format vote shares
        const voteShares = district.parties
          .map(p => `${p.partei}: ${Math.round(p.low)}–${Math.round(p.high)}%`)
          .join(' | ');

        table.row.add([
          district.wkr,
          district.wkr_name,
          voteShares
        ]);
      });

      table.draw();
    }

    let currentMapType = 'probability'; // Track current map type

    // Update the map toggle event listeners
    document.getElementById('mapToggleErststimme').addEventListener('click', function() {
      if (currentMapType === 'probability') return; // Don't reload if already showing this map
      currentMapType = 'probability';
      const iframe = document.getElementById('mapIframe');
      iframe.src = "/interactive_districts_probability.html";
      setActiveMapButton('mapToggleErststimme');
      document.getElementById('map-description').textContent = 
          "Die Karte zeigt für jeden Wahlkreis die Wahrscheinlichkeit, dass die jeweilige Partei das Direktmandat gewinnt.";
      document.getElementById('party-legend').style.display = 'flex';
      document.getElementById('gradient-legend').style.display = 'none';
      updatePartyLegend();
    });

    document.getElementById('mapToggleVacant').addEventListener('click', function() {
      if (currentMapType === 'vacant') return; // Don't reload if already showing this map
      currentMapType = 'vacant';
      const iframe = document.getElementById('mapIframe');
      iframe.src = "/interactive_vacant.html";
      setActiveMapButton('mapToggleVacant');
      document.getElementById('map-description').innerHTML = 
          "Die Karte zeigt für jeden Wahlkreis die Wahrscheinlichkeit, dass aufgrund des neuen Wahlrechts kein Direktmandat vergeben wird. Mehr Informationen dazu finden Sie in unserem <a href='/posts/blog/vacant-districts/'>Blogpost zu nicht besetzten Mandaten</a>.";
      document.getElementById('party-legend').style.display = 'none';
      document.getElementById('gradient-legend').style.display = 'block';
    });

    function setActiveMapButton(activeId) {
      document.getElementById('mapToggleErststimme').classList.remove('active');
      document.getElementById('mapToggleVacant').classList.remove('active');
      document.getElementById(activeId).classList.add('active');
    }
</script>

<section>
  <div class="content-wrapper">
    <div style="text-align: center; margin-bottom: 10px;">
    </div>
    <div class="search-container" style="display: flex; align-items: center; gap: 10px;">
      <!-- Navigation buttons -->
      <div style="display: flex; gap: 5px;">
        <button onclick="navigateDistrict(-1)" style="
            background: #333;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
        ">&larr;</button>
        <button onclick="navigateDistrict(1)" style="
            background: #333;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
        ">&rarr;</button>
      </div>
      <div class="search-input-wrapper" style="flex-grow: 1;">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" 
               id="districtSearch" 
               class="search-input" 
               placeholder="Suche nach Wahlkreis oder PLZ..."
               autocomplete="off">
        <div id="searchResults" class="search-results"></div>
      </div>
    </div>
    <!-- District header -->
    <h2 id="districtHeader" style="margin: 5px 0 0 0; text-align: center; user-select: none;"></h2>
    <div id="winnerInfo"></div>
    <!-- Chart container -->
    <div id="chartContainer"></div>
  </div>
</section>

<script>
let districts = [];
let currentDistrict = 1;
let vacantData = [];
let dataInitialized = false;

// Create a function to initialize all data once
function initializeData() {
    if (dataInitialized) return Promise.resolve();
    
    return Promise.all([
        // Fetch districts data
        fetch('/forecast_districts.json')
            .then(response => response.json())
            .then(data => {
                districts = data;
            }),
        // Fetch vacant data
        fetch('/pred_vacant.json')
            .then(response => response.json())
            .then(data => {
                vacantData = data;
            })
    ]).then(() => {
        dataInitialized = true;
        updatePartyLegend();
    }).catch(error => console.error('Error initializing data:', error));
}

function createTableVisualization(data) {
    // Sort data: winners first, then by value
    data = data.sort((a, b) => {
        // If one is a winner and the other isn't, winner comes first
        if (a.winner && !b.winner) return -1;
        if (!a.winner && b.winner) return 1;
        // If both are winners or both aren't winners, sort by value
        return b.value - a.value;
    });

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
        width: 100%;
        margin: 40px 0;
        padding: 0;
        box-sizing: border-box;
    `;

    // First add the candidates table
    const table = document.createElement('table');
    table.style.cssText = `
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        font-size: 0.9rem;
    `;

    // Add table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Define headers with adjusted widths
    const headers = [
        { text: 'Kandidat:in', sortKey: 'name', width: '100%' },
        { text: 'Partei', sortKey: 'partei', width: '100%' }
    ];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerHTML = `${header.text} `;
        th.style.cssText = `
            cursor: pointer;
            padding: 12px 10px;
            text-align: left;
            border-bottom: 2px solid #ddd;
            width: ${header.width};
        `;
        th.dataset.sortKey = header.sortKey;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    
    // Create table content
    data.forEach((d, index) => {
        if (d.partei === 'And.') {
            d.partei = 'Andere';
        }
        else if (!d.Vornamen || !d.Nachname) {
            return;
        }
        
        // Create main row for name and party
        const mainRow = document.createElement('tr');
        mainRow.style.cssText = `
            border-top: ${index > 0 ? '1px solid #ddd' : 'none'};
            border-left: 5px solid ${getPartyColor(d.partei)};
        `;
        
        // Candidate name cell
        const nameCell = document.createElement('td');
        nameCell.textContent = d.Vornamen && d.Nachname ? 
            `${d.Vornamen} ${d.Nachname}` : 
            '–';
        nameCell.style.cssText = `
            padding: 12px 15px 0 15px;
            border: none;
        `;
        
        // Party cell
        const partyCell = document.createElement('td');
        partyCell.textContent = d.partei;
        partyCell.style.cssText = `
            padding: 12px 15px 0 15px;
            white-space: nowrap;
            border: none;
        `;
        
        mainRow.appendChild(nameCell);
        mainRow.appendChild(partyCell);
        
        // Create visualization row
        const visRow = document.createElement('tr');
        visRow.style.cssText = `
            border-left: 5px solid ${getPartyColor(d.partei)};
        `;
        
        const visCell = document.createElement('td');
        visCell.colSpan = 2;
        visCell.style.cssText = `
            padding: 0 15px 12px 15px;
            border: none;
        `;
        
        const visContainer = document.createElement('div');
        visContainer.style.cssText = `
            width: 100%;
            padding-top: 8px;
        `;
        
        const scaleContainer = document.createElement('div');
        scaleContainer.style.cssText = `
            position: relative;
            height: 20px;
            background: #f0f0f0;
            border-radius: 4px;
            width: 100%;
        `;
        
        // Calculate positions
        const maxValue = Math.ceil(Math.max(...data.map(d => d.high)) / 5) * 5 + 5;
        const scale = d => (d / maxValue) * 100;
        
        // Add error bar (confidence band)
        const errorBar = document.createElement('div');
        errorBar.style.cssText = `
            position: absolute;
            left: ${scale(d.low)}%;
            width: ${Math.min(scale(d.high) - scale(d.low), 85)}%;
            height: 4px;
            top: 50%;
            transform: translateY(-50%);
            background-color: ${getPartyColor(d.partei)};
        `;

        // Percentage text container
        const percentage = document.createElement('div');
        percentage.textContent = `${Math.round(d.low)}–${Math.round(d.high)}%`;
        percentage.style.cssText = `
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.8rem;
            color: var(--primary-color);
            text-align: right;
            width: 60px;
            background: #f0f0f0;
            z-index: 2;
        `;
        
        scaleContainer.appendChild(errorBar);
        scaleContainer.appendChild(percentage);
        visContainer.appendChild(scaleContainer);
        visCell.appendChild(visContainer);
        visRow.appendChild(visCell);
        
        tbody.appendChild(mainRow);
        tbody.appendChild(visRow);
        
        // Add spacer row
        const spacerRow = document.createElement('tr');
        spacerRow.style.cssText = `
            height: 8px;
        `;
        tbody.appendChild(spacerRow);
    });
    
    table.appendChild(tbody);
    wrapper.appendChild(table);

    // Add the info box about uncertainty
    const infoBox = document.createElement('div');
    infoBox.style.cssText = `
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
        border: 1px solid #e0e0e0;
    `;
    infoBox.innerHTML = `
        <p style="margin-bottom: 20px; font-size: 0.9rem; line-height: 1.5;">
            Unsere Vorhersagen enthalten Unsicherheiten, die wir durch Intervalle ausdrücken. 
            Das 5/6-Intervall zeigt den Bereich, in dem wir das Wahlergebnis mit etwa 83% 
            Wahrscheinlichkeit erwarten. Es bietet also eine intuitive Einschätzung der 
            Vorhersagegenauigkeit: Die Wahrscheinlichkeit, dass das Ergebnis außerhalb des 
            Intervals liegen wird, beträgt 1/6. Das entspricht der Wahrscheinlichkeit, mit 
            einem Würfel eine 6 zu würfeln.
        </p>
    `;
    wrapper.appendChild(infoBox);

    // Update the chart container
    const chartContainer = document.getElementById('chartContainer');
    chartContainer.innerHTML = '';
    chartContainer.appendChild(wrapper);
}

// Add party color function
function getPartyColor(party) {
    const colors = {
        'CDU': '#000000',
        'CSU': '#000000',
        'CDU/CSU': '#000000',
        'SPD': '#E3000F',
        'GRÜNE': '#46962b',
        'Grüne': '#46962b',
        'AfD': '#009EE0',
        'FDP': '#FFED00',
        'LINKE': '#800080',
        'Linke': '#800080',
        'BSW': '#FF8C00',
        'SSW': '#003D8F',
        'Freie Wähler': '#FF6600',
        'Andere': '#888888' // Added default color for Andere
    };
    return colors[party] || '#888888';  // Default gray if party not found
}

function showTooltip(e) {
    hideTooltips(); // Hide any existing tooltips first
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.dataset.tooltip;
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
    
    requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
    });
}

function hideTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 200);
    });
}

function updateDistrict(wkr) {
    const districtData = districts.filter(d => d.wkr === wkr);
    const header = document.getElementById('districtHeader');
    const title = `${districtData[0]?.wkr} — ${districtData[0]?.wkr_name}` || '';
    
    header.textContent = title;
    
    // Adjust font size based on content length
    if (title.length > 60) {
        header.style.fontSize = '16px';
    } else if (title.length > 45) {
        header.style.fontSize = '18px';
    } else if (title.length > 35) {
        header.style.fontSize = '20px';
    } else {
        header.style.fontSize = '24px';
    }
    
    // Find winner info
    const winner = districtData.reduce((prev, current) => 
        (prev.probability > current.probability) ? prev : current
    );
    
    // Determine victory confidence level
    let confidenceLevel;
    if (winner.probability >= 90) {
        confidenceLevel = "nahezu sicher";
    } else if (winner.probability >= 75) {
        confidenceLevel = "sehr wahrscheinlich";
    } else if (winner.probability >= 60) {
        confidenceLevel = "wahrscheinlich";
    } else if (winner.probability >= 41) {
        confidenceLevel = "möglich";
    } else if (winner.probability >= 26) {
        confidenceLevel = "eher unwahrscheinlich";
    } else if (winner.probability >= 11) {
        confidenceLevel = "unwahrscheinlich";
    } else {
        confidenceLevel = "sehr unwahrscheinlich";
    }
    
    // Use pre-fetched vacant probability data
    const districtVacant = vacantData.find(d => d.wkr === wkr);
    const vacantProb = districtVacant ? districtVacant.abandon_p * 100 : 0;
    
    let vacantText;
    if (vacantProb >= 90) {
        vacantText = "nahezu sicher";
    } else if (vacantProb >= 75) {
        vacantText = "sehr wahrscheinlich";
    } else if (vacantProb >= 60) {
        vacantText = "wahrscheinlich";
    } else if (vacantProb >= 41) {
        vacantText = "möglich";
    } else if (vacantProb >= 26) {
        vacantText = "eher unwahrscheinlich";
    } else if (vacantProb >= 11) {
        vacantText = "unwahrscheinlich";
    } else {
        vacantText = "sehr unwahrscheinlich";
    }
    
    // Update the winner info section
    const winnerName = winner.Vornamen && winner.Nachname ? 
        `${winner.Vornamen} ${winner.Nachname} (${winner.partei})` : 
        winner.partei;

    document.getElementById('winnerInfo').innerHTML = `
        <div style="
            background-color: #f5f5f5;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border: 1px solid #e0e0e0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            text-align: center;
        ">
            <div style="
                font-size: 1.1rem;
                font-weight: 500;
                margin-bottom: 12px;
                color: #333;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            ">
                <span>${winnerName} gewinnt: ${confidenceLevel}</span>
                <span class="info-icon" data-tooltip="${Math.round(winner.probability)}% Wahrscheinlichkeit">i</span>
            </div>
            <div style="
                font-size: 1.1rem;
                color: #333;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            ">
                <span>Nicht besetztes Direktmandat: ${vacantText}</span>
                <span class="info-icon" data-tooltip="${Math.round(vacantProb)}% Wahrscheinlichkeit">i</span>
            </div>
        </div>
    `;
    
    // Add event listeners for info icons after updating content
    document.querySelectorAll('.info-icon').forEach(icon => {
        icon.addEventListener('mouseenter', showTooltip);
        icon.addEventListener('mouseleave', hideTooltips);
        icon.addEventListener('touchstart', showTooltip, { passive: true });
        icon.addEventListener('touchend', hideTooltips);
    });

    createTableVisualization(districtData);

    // Update the mailto link with current district info
    const mailtoLink = document.querySelector('a[href^="mailto:wahlen@uni-mannheim.de"]');
    if (mailtoLink) {
        const emailBody = `Sehr%20geehrte%20Damen%20und%20Herren%2C%0A%0Abitte%20lassen%20Sie%20mir%20das%20Briefing%20f%C3%BCr%20WK%20${districtData[0]?.wkr}%20${districtData[0]?.wkr_name}%20zukommen.%0A%0A%3CLassen%20Sie%20uns%20gern%20weitere%20Informationen%20zu%20Ihrer%20Motivation%2FIhrem%20Hintergrund%20zukommen.%3E%0A%0AMit%20freundlichen%20Gr%C3%BC%C3%9Fen%0A`;
        mailtoLink.href = `mailto:wahlen@uni-mannheim.de?subject=Anmeldung%20f%C3%BCr%20Wahlkreisbriefing&body=${emailBody}`;
    }
}

function scrollToContent() {
    const searchContainer = document.querySelector('.search-container');
    const headerHeight = 60;
    const yOffset = -20;
    const y = searchContainer.getBoundingClientRect().top + window.pageYOffset - headerHeight + yOffset;
    
    // Custom smooth scroll with longer duration
    const start = window.pageYOffset;
    const distance = y - start;
    const duration = 1500; // Increased to 1.5 seconds
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smoother animation
        const easeInOutCubic = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        
        window.scrollTo(0, start + (distance * easeInOutCubic(progress)));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

function navigateDistrict(direction) {
    console.log('Navigating district:', direction); // Debugging line
    const maxWkr = Math.max(...districts.map(d => d.wkr));
    let newDistrict = currentDistrict + direction;
    
    // Wrap around for circular navigation
    if (newDistrict < 1) {
        newDistrict = maxWkr;  // Go to last district when going left from first
    } else if (newDistrict > maxWkr) {
        newDistrict = 1;  // Go to first district when going right from last
    }
    
    currentDistrict = newDistrict;
    updateDistrict(currentDistrict);
    updateNavigationButtons();
    scrollToContent();
}

function updateNavigationButtons() {
    // Remove disabled state since we now have circular navigation
    const prevButton = document.getElementById('prevDistrict');
    const nextButton = document.getElementById('nextDistrict');
    
    prevButton.classList.remove('disabled');
    nextButton.classList.remove('disabled');
}

function initializeSearch() {
    const searchInput = document.getElementById('districtSearch');
    const searchResults = document.getElementById('searchResults');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const value = e.target.value.trim();
        
        if (!value) {
            searchResults.style.display = 'none';
            return;
        }

        searchTimeout = setTimeout(() => {
            // Use cached districts data instead of fetching again
            const results = [];
            const seenDistricts = new Set();
            
            districts.forEach(district => {
                if (seenDistricts.has(district.wkr)) return;
                
                if (district.wkr_name.toLowerCase().includes(value.toLowerCase()) ||
                    district.wkr.toString() === value) {
                    results.push({
                        type: 'district',
                        text: `${district.wkr} - ${district.wkr_name}`,
                        wkr: district.wkr
                    });
                    seenDistricts.add(district.wkr);
                }
                
                if (district.Vornamen && district.Nachname) {
                    const fullName = `${district.Vornamen} ${district.Nachname}`;
                    if (fullName.toLowerCase().includes(value.toLowerCase())) {
                        results.push({
                            type: 'candidate',
                            text: `${fullName} (${district.partei}, WK ${district.wkr})`,
                            wkr: district.wkr
                        });
                    }
                }
            });

            if (/^\d+$/.test(value)) {
                districts.forEach(district => {
                    if (seenDistricts.has(district.wkr)) return;
                    
                    if (district.plz && district.plz.split(',').some(plz => plz.trim().startsWith(value))) {
                        results.push({
                            type: 'plz',
                            text: `PLZ ${value} - WK ${district.wkr} ${district.wkr_name}`,
                            wkr: district.wkr
                        });
                        seenDistricts.add(district.wkr);
                    }
                });
            }

            // Update search results display
            if (results.length > 0) {
                searchResults.innerHTML = results
                    .slice(0, 10)
                    .map(result => `
                        <div class="search-result-item" data-wkr="${result.wkr}">
                            ${result.text}
                            <span class="search-result-type">${
                                result.type === 'district' ? '(Wahlkreis)' :
                                result.type === 'candidate' ? '(Kandidat:in)' :
                                '(Postleitzahl)'
                            }</span>
                        </div>
                    `)
                    .join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.style.display = 'none';
            }
        }, 300);
    });

    searchResults.addEventListener('click', (e) => {
        const item = e.target.closest('.search-result-item');
        if (item) {
            const wkr = parseInt(item.dataset.wkr);
            currentDistrict = wkr; // Update current district
            searchInput.value = '';
            searchResults.style.display = 'none';
            
            // Update the map iframe - remove the origin
            const iframe = document.getElementById('mapIframe');
            iframe.contentWindow.postMessage({ action: 'selectDistrict', wkr: wkr }, '*');
            
            // Update district details
            updateDistrict(wkr);
            
            // Scroll to content
            scrollToContent();
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

function updatePlaceholder() {
    const searchInput = document.getElementById('districtSearch');
    if (window.innerWidth <= 600) {
        searchInput.placeholder = "Wahlkreis, PLZ oder Kandidat:in...";
    } else {
        searchInput.placeholder = "Suche nach Wahlkreis, PLZ oder Kandidat:in...";
    }
}

// Listen for messages from the map iframe
window.addEventListener('message', function(event) {
    // Remove origin check since maps are now local
    if (event.data && event.data.wkr) {
        const wkr = parseInt(event.data.wkr);
        currentDistrict = wkr;
        
        initializeData().then(() => {
            updateDistrict(wkr);
            scrollToContent();
        });
    }
});
</script>

<script>
// Add this new function to filter and update party legend
function updatePartyLegend() {
    if (!districts.length) return;
    
    // Find parties that have at least one district where they are the winner
    const relevantParties = new Set();
    districts.forEach(district => {
        if (district.winner === true) {
            relevantParties.add(district.partei);
        }
    });

    // Update the legend HTML
    const legendHTML = Array.from(relevantParties)
        .map(party => `
            <div class="legend-item">
                <span class="color-box" style="background-color: ${getPartyColor(party)};"></span>
                <span class="party-name">${party}</span>
            </div>
        `).join('');

    document.getElementById('party-legend').innerHTML = legendHTML;
}
</script>