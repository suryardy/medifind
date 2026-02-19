
let map;
let userLat, userLng;
let markers = [];

navigator.geolocation.getCurrentPosition(position => {
    userLat = position.coords.latitude;
    userLng = position.coords.longitude;
    initMap();
});

function initMap() {
    map = L.map('map').setView([userLat, userLng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([userLat, userLng]).addTo(map)
        .bindPopup("📍 You are here")
        .openPopup();
}

function scanMedicine() {
    const file = document.getElementById("imageInput").files[0];

    Tesseract.recognize(file, 'eng')
        .then(result => {
            document.getElementById("searchBar").value =
                result.data.text.trim().toLowerCase();
            searchMedicine();
        });
}

function searchMedicine() {
    const medicineName =
        document.getElementById("searchBar").value
        .trim()
        .toLowerCase();

    fetch("stores.json")
        .then(response => response.json())
        .then(data => {

            const results = data.filter(store =>
                store.medicines.some(med =>
                    med.toLowerCase().includes(medicineName)
                )
            );

            displayStores(results);
            showStoreMarkers(results);
        });
}

function displayStores(stores) {
    const list = document.getElementById("storesList");
    list.innerHTML = "";

    if (stores.length === 0) {
        list.innerHTML = `
            <div class="store-card">
                <h3>No Stores Found</h3>
                <p>This medicine is not available nearby.</p>
            </div>
        `;
        return;
    }

    stores.forEach(store => {
        list.innerHTML += `
            <div class="store-card">
                <h3>${store.name}</h3>
                <p>📞 ${store.phone}</p>
                <p>📦 ${store.status}</p>
            </div>
        `;
    });
}

function showStoreMarkers(stores) {

    // Remove old markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    stores.forEach(store => {
        const marker = L.marker([store.lat, store.lng]).addTo(map)
            .bindPopup(`
                <b>${store.name}</b><br>
                📞 ${store.phone}<br>
                📦 ${store.status}
            `);

        markers.push(marker);
    });
}
