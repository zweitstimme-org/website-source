---
title: "Erststimme"
layout: "page"
summary: "Erststimme Prognosen"
url: "/erststimme"
---


## Wahlkreisprognosen



<div style="text-align: center; margin-bottom: 20px;">
  <button id="mapToggleShare" class="map-toggle-button active">Erststimmenanteil</button>
  <button id="mapToggleErststimme" class="map-toggle-button">Gewinnwahrscheinlichkeit</button>
  <button id="mapToggleVacant" class="map-toggle-button">Wahlkreise ohne Direktmandat</button>
</div>



<iframe id="mapIframe" src="https://polsci.uni-wh.de/interactive_districts_share" width="100%" height="600" frameborder="0"></iframe>

<!---<div style="margin-bottom: 30px; text-align: center;">
    <img id="districtMap" src="https://polsci.uni-wh.de/figure_districts" alt="Wahlkreiskarte" style="max-width: 100%; height: auto;">
</div>-->

<section class="section-alt">
  <div class="content-wrapper">


<p>(Stand: <span id="forecast-last-updated">lädt...</span>)</p>

Hier finden Sie für alle Wahlkreise und Parteien die vorhergesagten <strong>Erststimmenanteile</strong> und <strong>Gewinnwahrscheinlichkeiten</strong>. Für Wahlkreise in denen auch andere Parteien eine Gewinnwahrscheinlichkeit über 5% haben, werden diese in den Karten aufgeführt. Unser Modell für die Erststimme 2025 beschreiben wir in unserem <a href="/posts/blog/erststimme-model/">Blogpost</a>.

Die dritte Karte zeigt die Wahrscheinlichkeiten dafür, dass in einem Wahlkreis aufgrund des neuen Wahlrechts kein Direktmandat vergeben wird. Hier finden Sie unseren <a href="/posts/blog/vacant-districts/">Blogpost</a> zu diesem Thema.

Die Tabellen zeigen die Daten in tabellarischer Form.
</div>
</section>
<br>
<div style="text-align: center; margin-bottom: 20px;">
  <button id="toggleTableShare" class="map-toggle-button active">Erststimmenanteil</button>
  <button id="toggleTableErststimme" class="map-toggle-button">Gewinnwahrscheinlichkeit</button>
  <button id="toggleTableVacant" class="map-toggle-button">Wahlkreise ohne Direktmandat</button>
</div>

<div style="margin-bottom: 20px;">
  <input type="text" id="searchInput" class="search-input" placeholder="Suche nach Wahlkreis..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
</div>

<table id="forecastTable" class="display" cellspacing="0" width="100%">
  <thead>
    <tr>
      <th class="wkr-column">Nr.</th>
      <th class="wkr-name-column">Wahlkreis</th>
      <th class="party-column">Partei</th>
      <th class="value-column">Vorhersage Erststimme</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>





<!-- Include jQuery and DataTables library -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>

<!-- Add custom CSS for the search field and pagination -->
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
    margin: 5px;
    border: 1px solid #007bff;
    background-color: #fff;
    color: #007bff;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
  }

  .map-toggle-button.active {
    background-color: #007bff;
    color: #fff;
  }

  .map-toggle-button:hover {
    background-color: #0056b3;
    color: #fff;
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
</style>

<!-- Initialize DataTable and fetch data from the API -->
<script>
    function refreshMap() {
        const map = document.getElementById('districtMap');
        map.src = 'https://polsci.uni-wh.de/figure_districts?' + new Date().getTime();
    }

    // Add map refresh to the existing fetchForecast function
    function fetchForecast() {
        fetch("https://polsci.uni-wh.de/forecast")
            .then(response => response.json())
            .then(data => {
                fetch("https://polsci.uni-wh.de/last_updated")
                    .then(response => response.json())
                    .then(lastUpdatedData => {
                        const lastUpdated = new Date(lastUpdatedData.last_updated);
                        const formattedDate = formatDateToGerman(lastUpdated);
                        document.getElementById('forecast-values').textContent = formattedDate;
                        refreshMap(); // Refresh the map when date is updated
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

    // Add these functions before the existing fetch call
    function updateTableHeaders(mode) {
      const valueColumn = document.querySelector('.value-column');
      switch(mode) {
        case 'share':
          valueColumn.textContent = 'Vorhersage';
          break;
        case 'erststimme':
          valueColumn.textContent = 'Wahrscheinlichkeit';
          break;
        case 'vacant':
          valueColumn.textContent = 'Wahrscheinlichkeit';
          break;
      }
    }

    function loadTableData(mode) {
      const table = $('#forecastTable').DataTable();
      table.clear();
      
      let endpoint = '';
      switch(mode) {
        case 'share':
          endpoint = 'forecast_districts';
          break;
        case 'erststimme':
          endpoint = 'forecast_districts';
          break;
        case 'vacant':
          endpoint = 'pred_vacant';
          break;
      }

      fetch(`https://polsci.uni-wh.de/${endpoint}`)
        .then(response => response.json())
        .then(data => {
          if (mode === 'vacant') {
            // Sort data by abandon_p in descending order
            data.sort((a, b) => b.abandon_p - a.abandon_p);
            table.rows.add(data.map(item => [
              item.wkr,
              item.wkr_name,
              null,  // Empty party column
              `${(item.abandon_p * 100).toFixed(0)}%`
            ])).draw();
          } else if (mode === 'erststimme') {
            table.rows.add(data.map(item => [
              item.wkr,
              item.wkr_name,
              item.partei,
              `${(item.probability).toFixed(0)}%`
            ])).draw();
          } else {
            table.rows.add(data.map(item => [
              item.wkr,
              item.wkr_name,
              item.partei,
              `${(item.value).toFixed(0)}%`
            ])).draw();
          }

          // Update column visibility based on mode
          table.column(2).visible(mode !== 'vacant');
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    // Add event listeners for table toggles
    document.getElementById('toggleTableShare').addEventListener('click', function() {
      setActiveTableButton('toggleTableShare');
      updateTableHeaders('share');
      loadTableData('share');
    });

    document.getElementById('toggleTableErststimme').addEventListener('click', function() {
      setActiveTableButton('toggleTableErststimme');
      updateTableHeaders('erststimme');
      loadTableData('erststimme');
    });

    document.getElementById('toggleTableVacant').addEventListener('click', function() {
      setActiveTableButton('toggleTableVacant');
      updateTableHeaders('vacant');
      loadTableData('vacant');
    });

    function setActiveTableButton(activeId) {
      document.getElementById('toggleTableShare').classList.remove('active');
      document.getElementById('toggleTableErststimme').classList.remove('active');
      document.getElementById('toggleTableVacant').classList.remove('active');
      document.getElementById(activeId).classList.add('active');
    }

    // Modify the initial table load to use the new function
    $(document).ready(function() {
      const table = $('#forecastTable').DataTable({
        order: [[0, 'asc']],
        columnDefs: [
          {
            targets: [0],
            visible: true,
            width: '5%'
          },
          {
            targets: [1],
            width: '55%'
          },
          {
            targets: [2],
            width: '20%'
          },
          {
            targets: [3],
            width: '20%'
          }
        ],
        columns: [
          { title: "Nr.", orderable: true },
          { title: "Wahlkreis", orderable: true },
          { title: "Partei", className: "party-column", orderable: true },
          { title: "Vorhersage", className: "value-column", orderable: true }
        ],
        language: {
          "zeroRecords": "Keine Einträge gefunden",
          "info": "",
          "infoEmpty": "",
          "infoFiltered": "",
          "search": "Suche:",
          "paginate": {
            "first": "Erste",
            "last": "Letzte",
            "next": ">",
            "previous": "<"
          }
        },
        dom: 'rtp',
        autoWidth: false,
        width: '100%',
        ordering: true
      });
      
      // Load initial data
      loadTableData('share');
    });

  document.getElementById('mapToggleShare').addEventListener('click', function() {
    const iframe = document.getElementById('mapIframe');
    iframe.src = "https://polsci.uni-wh.de/interactive_districts_share";
    setActiveMapButton('mapToggleShare');
  });

  document.getElementById('mapToggleErststimme').addEventListener('click', function() {
    const iframe = document.getElementById('mapIframe');
    iframe.src = "https://polsci.uni-wh.de/interactive_districts_probability";
    setActiveMapButton('mapToggleErststimme');
  });

  document.getElementById('mapToggleVacant').addEventListener('click', function() {
    const iframe = document.getElementById('mapIframe');
    iframe.src = "https://polsci.uni-wh.de/interactive_vacant";
    setActiveMapButton('mapToggleVacant');
  });

  function setActiveMapButton(activeId) {
    document.getElementById('mapToggleShare').classList.remove('active');
    document.getElementById('mapToggleErststimme').classList.remove('active');
    document.getElementById('mapToggleVacant').classList.remove('active');
    document.getElementById(activeId).classList.add('active');
  }

  // Function to fetch and update the "Stand" information
  function updateStand() {
    fetch('https://polsci.uni-wh.de/last_updated')
     .then(response => response.json())
      .then(data => {
        const lastUpdated = new Date(data.last_updated);
        const formattedDate = formatDateToGerman(lastUpdated);
        document.getElementById('forecast-last-updated').textContent = formattedDate;
      })
      .catch(error => console.error('Error fetching last updated date:', error));
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

  

  // Call updateStand when the page loads
  window.onload = function() {
    updateStand();
  };

  document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchValue = e.target.value.toLowerCase();
    const table = $('#forecastTable').DataTable();
    table.search(searchValue).draw();
  });
</script>