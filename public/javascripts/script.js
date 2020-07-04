/* LEAFLET */

var cityNames = document.querySelectorAll('.city-name')

var latLong = []

for (var i=0; i<cityNames.length; i++) {
    var tempArray= []
    tempArray.push(cityNames[i].dataset.lat)
    tempArray.push(cityNames[i].dataset.lon)
    latLong.push(tempArray)
    }

var mymap = L.map('weathermap', {
    center: [10, 10],
    zoom: 3
});

mymap.fitBounds(latLong);

var CartoDB_VoyagerLabelsUnder = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

CartoDB_VoyagerLabelsUnder.addTo(mymap)

var customIcon = L.icon({
    iconUrl: '/images/pointer.png',
    shadowUrl: '/images/pointer-shadow.png',
    
    iconSize:   [24, 36],
    shadowSize:  [24, 36],
    
    iconAnchor:  [12, 36],
    shadowAnchor: [12, 36],  
    
    popupAnchor: [0, -36]
    });


    for (var i=0; i<cityNames.length; i++) {
        var weatherCities = L.marker([cityNames[i].dataset.lat, cityNames[i].dataset.lon], {icon: customIcon}).addTo(mymap).bindPopup(cityNames[i].dataset.name);
        }