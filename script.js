let map;
let userLat, userLng;

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
        .bindPopup("You are here")
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
        document.getElementById("searchBar").value.toLowerCase();

    fetch("stores.json")
        .then(response => response.json())
        .then(data => {
            const results = data.filter(store =>
                store.medicines.includes(medicineName)
            );

            displayStores(results);
        });
}

function displayStores(stores) {
    const list = document.getElementById("storesList");
    list.innerHTML = "";

    stores.forEach(store => {
        list.innerHTML += `
            <div class="store-card">
                <h3>${store.name}</h3>
                <p>Distance: ${store.distance} km</p>
                <p>Phone: ${store.phone}</p>
                <p>Status: ${store.status}</p>
            </div>
        `;
    });
}

