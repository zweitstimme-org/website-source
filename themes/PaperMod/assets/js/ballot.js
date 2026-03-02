// Copy all the JavaScript from ballot.html into this file let currentDistrict = null;  // Initialize as null instead of 1
let districts = [];       // Store all districts

// Update the initialization code
document.addEventListener('DOMContentLoaded', function() {
    // Load initial data
    fetch('/btw25_bewerb_utf8.json')  // Note: Updated path to be relative to root
        .then(response => response.json())
        .then(data => {
            // Store sorted district numbers
            districts = [...new Set(data
                .filter(entry => entry.Gebietsart === "Wahlkreis")
                .map(entry => entry.Gebietsnummer)
            )].sort((a, b) => a - b);
            
            // If no district is selected yet, choose a random one
            if (currentDistrict === null) {
                const randomIndex = Math.floor(Math.random() * districts.length);
                currentDistrict = districts[randomIndex];
            }
            
            // Load the current district data
            updateCurrentDistrict(currentDistrict);
        })
        .catch(error => console.error('Error loading initial data:', error));
});

// Update the navigation function to use the stored districts array
function navigateDistrict(direction) {
    if (!districts.length) return;  // Guard against empty districts array
    
    // Find current index
    const currentIndex = districts.indexOf(currentDistrict);
    if (currentIndex === -1) return;  // Guard against invalid current district
    
    // Calculate new index
    let newIndex = currentIndex + direction;
    
    // Handle wrapping
    if (newIndex < 0) {
        newIndex = districts.length - 1;
    } else if (newIndex >= districts.length) {
        newIndex = 0;
    }
    
    // Update with new district
    updateCurrentDistrict(districts[newIndex]);
}

function updateCurrentDistrict(wkr) {
    currentDistrict = wkr;
    loadData(wkr);
    
    // Update search input if it exists
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Hide search results if they exist
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

function loadData(wahlkreisNr) {
    const candidatesList = document.getElementById('candidates-list');
    const partiesList = document.getElementById('parties-list');
    
    // Clear existing content
    candidatesList.innerHTML = '';
    partiesList.innerHTML = '';

    fetch('/btw25_bewerb_utf8.json')
        .then(response => response.json())
        .then(data => {
            // Filter for Wahlkreis data and selected district
            const filteredData = data.filter(entry => 
                entry.Gebietsart === "Wahlkreis" && 
                entry.Gebietsnummer === wahlkreisNr
            );

            if (filteredData.length > 0) {
                const districtInfo = filteredData[0];
                document.getElementById('ballot-header').innerHTML = `
                    <h1>Stimmzettel</h1>
                    <p>für die Wahl zum Deutschen Bundestag am 23. Februar 2025<br>im Wahlkreis ${districtInfo.Gebietsnummer} – ${districtInfo.Gebietsname}</p>
                `;
            }

            // Rest of your loadData function...
            // (Include all the party and candidate processing logic)
        })
        .catch(error => console.error('Error loading data:', error));
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const value = e.target.value.trim();
        
        if (!value) {
            searchResults.style.display = 'none';
            return;
        }

        // Rest of your search initialization code...
    });

    // Rest of your event listeners...
}

function updatePlaceholder() {
    const searchInput = document.getElementById('searchInput');
    if (window.innerWidth <= 600) {
        searchInput.placeholder = "Suche...";
    } else {
        searchInput.placeholder = "Suche nach Wahlkreis, PLZ oder Kandidat:in...";
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', initializeSearch);
window.addEventListener('load', updatePlaceholder);
window.addEventListener('resize', updatePlaceholder);