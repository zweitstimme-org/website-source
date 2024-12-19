---
title: "Erststimme"
layout: "page"
summary: "Erststimme Prognosen"
url: "/erststimme"
---


## Wahlkreisprognosen

<div style="margin-bottom: 30px; text-align: center;">
    <img id="districtMap" src="http://polsci.uni-wh.de:8073/figure_districts" alt="Wahlkreiskarte" style="max-width: 70%; height: auto;">
</div>

Hier finden Sie für alle Wahlkreise und Parteien die vorhergesagten Erststimmenanteile sowie die Wahrscheinlichkeit, dass diese Partei den Wahlkreis gewinnt. Vorhergesagte Gewinner sind fett gedruckt. Stand: <span id="forecast-values">lädt...</span>.


<table id="forecastTable" class="display" cellspacing="0" width="100%">
  <thead>
    <tr>
      <th>Nr.</th>
      <th>Wahlkreis</th>
      <th>Partei</th>
            <th>Vorhersage Erststimme</th>
      <th>Wahrscheinlichkeit</th>
    </tr>
  </thead>
  <tbody>
    <!-- Data will be dynamically inserted here -->
  </tbody>
</table>




<!-- Include jQuery and DataTables library -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>

<!-- Add custom CSS for the search field and pagination -->
<style>
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

  /* Table text size */
  #forecastTable {
    font-size: 0.9em;
  }

  /* Responsive font size */
  @media screen and (max-width: 768px) {
    #forecastTable {
      font-size: 0.75em;
    }
    
    .dataTables_filter input,
    .dataTables_length select,
    .dataTables_info,
    .dataTables_paginate {
      font-size: 0.85em;
    }
  }

  /* Pagination styling */
  .dataTables_paginate {
    margin-top: 15px;
    padding-top: 10px;
  }

  .dataTables_paginate .paginate_button {
    padding: 5px 12px;
    margin: 0 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }

  .dataTables_paginate .paginate_button:hover {
    background-color: #f5f5f5;
  }

  .dataTables_paginate .paginate_button.current {
    background-color: #f0f0f0;
    border-color: #aaa;
  }
</style>

<!-- Initialize DataTable and fetch data from the API -->
<script>
    function refreshMap() {
        const map = document.getElementById('districtMap');
        map.src = 'http://polsci.uni-wh.de:8073/figure_districts?' + new Date().getTime();
    }

    // Add map refresh to the existing fetchForecast function
    function fetchForecast() {
        fetch("http://polsci.uni-wh.de:8073/forecast")
            .then(response => response.json())
            .then(data => {
                fetch("http://polsci.uni-wh.de:8073/last_updated")
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

    // Fetch data from the API
    fetch("http://polsci.uni-wh.de:8073/forecast_districts")
        .then(response => response.json())
        .then(data => {
            // Insert rows into the table
            const tableBody = document.querySelector("#forecastTable tbody");
            data.forEach(item => {
                const row = document.createElement("tr");
                
                // Add font-weight: bold style if winner is 1
                if (item.winner === 1) {
                    row.style.fontWeight = 'bold';
                }

                // Create table cells
                row.innerHTML = `
                    <td>${item.wkr}</td>
                    <td>${item.wkr} - ${item.wkr_name}</td>
                    <td>${item.partei}</td>
                    <td>${item.value}%</td>
                    <td>${(item.probability)}%</td>
                `;

                // Append row to table
                tableBody.appendChild(row);
            });

            // Initialize DataTable with German language and column visibility
            $('#forecastTable').DataTable({
                order: [[0, 'asc']], // Sort by first column ascending
                columnDefs: [
                    {
                        targets: [0], // Target first column
                        visible: false // Hide it
                    }
                ],
                language: {
                    "lengthMenu": "Zeige _MENU_ Einträge",
                    "zeroRecords": "Keine Einträge gefunden",
                    "info": "Zeige Seite _PAGE_ von _PAGES_",
                    "infoEmpty": "Keine Einträge verfügbar",
                    "infoFiltered": "(gefiltert von _MAX_ Einträgen)",
                    "search": "Suche:",
                    "paginate": {
                        "first": "Erste",
                        "last": "Letzte",
                        "next": ">",
                        "previous": "<"
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
</script>