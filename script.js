let userLat, userLng;
let map;

navigator.geolocation.getCurrentPosition(position => {
    userLat = position.coords.latitude;
    userLng = position.coords.longitude;
    initMap();
});

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: userLat, lng: userLng },
        zoom: 14
    });

    new google.maps.Marker({
        position: { lat: userLat, lng: userLng },
        map: map,
        title: "You are here"
    });
}

function scanMedicine() {
    const file = document.getElementById("imageInput").files[0];

    Tesseract.recognize(file, 'eng')
        .then(result => {
            document.getElementById("searchBar").value = result.data.text.trim().toLowerCase();
            searchMedicine();
        });
}

function searchMedicine() {
    const medicineName = document.getElementById("searchBar").value.toLowerCase();

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
