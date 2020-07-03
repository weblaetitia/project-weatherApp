/* LEAFLET */
var longitudes = []
var latitudes = []

var cityNames = document.querySelectorAll('.city-name')

for (var i=0; i<cityNames.length; i++) {
    longitudes.push(cityNames[i].dataset.lon)
    latitudes.push(cityNames[i].dataset.lat)
    }

var minLat = Math.min(...latitudes) 
var maxLat = Math.max(...latitudes)
var minLong = Math.min(...longitudes)
var maxLong = Math.max(...longitudes)

var mediumLat = (minLat + maxLat) / 2
var mediumLong = (minLong + maxLong) / 2

var deltaLong = (maxLong - minLong)




var mymap = L.map('weathermap', {
    center: [mediumLat, mediumLong],
    zoom: 3
});

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(mymap);

var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
})

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