/* LEAFLET */

var mymap = L.map('weathermap', {
    center: [48.866667, 2.333333],
    zoom: 4
});



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);

var customIcon = L.icon({
    iconUrl: '/images/pointer.png',
    shadowUrl: '/images/pointer-shadow.png',
    
    iconSize:   [24, 36],
    shadowSize:  [24, 36],
    
    iconAnchor:  [12, 36],
    shadowAnchor: [12, 36],  
    
    popupAnchor: [0, -36]
    });

var cityNames = document.querySelectorAll('.city-name')

for (var i=0; i<cityNames.length; i++) {
    L.marker([cityNames[i].dataset.lat, cityNames[i].dataset.lon], {icon: customIcon}).addTo(mymap).bindPopup(cityNames[i].dataset.name);
}


