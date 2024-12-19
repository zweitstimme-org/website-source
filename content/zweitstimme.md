---
title: "Zweitstimme"
layout: "page"
summary: "Zweitstimme Prognosen"
url: "/zweitstimme"
---

  <h3 style="color: var(--primary); text-align: center;">Vorhersagetrend <span id="forecast-values">lädt...</span></h3>

<div style="position: relative; padding-bottom: 50%; height: 0; margin-top: -10px;">
    <iframe src="http://polsci.uni-wh.de:8073/interactive_trend"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
            allowfullscreen>
    </iframe>
</div>

Diese Grafik zeigt die zeitliche Entwicklung unserer Wahlprognosen. Die Linien stellen die prognostizierten Stimmenanteile der Parteien dar, basierend auf unserem statistischen Modell zum jeweiligen Zeitpunkt. Da unser Modell auch auf aktuellen Umfragen basiert, verändert sich unsere Vorhersage ständig. 


## Weitere Informationen (im Aufbau)

Hier finden Sie detaillierte Analysen zu:
- Prognosen für alle Parteien
- Koalitionsoptionen  

<script>
    function fetchForecast() {
        // Fetch forecast data from the Plumber API
        fetch("http://polsci.uni-wh.de:8073/forecast")
            .then(response => response.json())
            .then(data => {
                // Get the last updated timestamp
                fetch("http://polsci.uni-wh.de:8073/last_updated")
                    .then(response => response.json())
                    .then(lastUpdatedData => {
                        const lastUpdated = new Date(lastUpdatedData.last_updated);
                        const formattedDate = formatDateToGerman(lastUpdated);
                        document.getElementById('forecast-values').textContent = formattedDate;
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
        return `zum ${day}. ${month} ${year}`;
    }

    // Call fetchForecast when page loads
    window.onload = function() {
        console.log('Page loaded');
        fetchForecast();
    };
</script>