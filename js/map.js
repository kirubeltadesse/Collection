// taggling function
// TODO: need to fix this taggle funcitionality it is not showing up in the front side
// taggling function
function mapDisplay(){

    // center of the map
    var center = [38.205,-122.2869];
    // Create the map
    var map = L.map('mapid',{ drawControl: true }).setView(center, 10);
    //add base layer
    mapLink =
        '<a href="http://www.esri.com/">Esri</a>';
    wholink =
        'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    /*
var layer=L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; '+mapLink+', '+wholink,
// Set up the OSM layer

        maxZoom: 18
}).addTo(map);
    */
    L.tileLayer('https://maps.tilehosting.com/styles/hybrid/{z}/{x}/{y}.jpg?key=trAzZh4tFv6kVYo4It60',{
        attribution: '<a href="https://www.maptiler.com/license/maps/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
        crossOrigin: true
    }).addTo(map);
    //make second layer
    /*
        var layer2=L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
                maxZoom: 18
    })
    */
    // add a marker in the given location
    L.marker(center).addTo(map);

    // Initialise the FeatureGroup to store editable layers
    var editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    var drawPluginOptions = {
        position: 'topright',
        draw: {
            polygon: {
                allowIntersection: false, // Restricts shapes to simple polygons
                drawError: {
                    color: '#e1e100', // Color the shape will turn when intersects
                    message: '<strong>DURI Map Service Error<strong> you can\'t draw that!' // Message that will show when intersect
                },
                shapeOptions: {
                    color: '#97009c'
                }
            },
            // disable toolbar item by setting it to false
            polyline: false,
            circle: false, // Turns off this drawing tool
            rectangle: false,
            marker: false,
        },
        edit: {
            featureGroup: editableLayers, //REQUIRED!!
            remove: false
        }
    };

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw(drawPluginOptions);
    map.addControl(drawControl);

    var editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    map.on('draw:created', function(e) {
        var type = e.layerType,
            layer = e.layer;

        if (type === 'marker') {
            layer.bindPopup('A popup!');
        }

        editableLayers.addLayer(layer);
        arr = layer.toGeoJSON()["geometry"]["coordinates"][0];
        finalCoord = [];
        polygon = "POLYGON((";
        for(x in arr)
            if(x%2==0)
                finalCoord.push(arr[x])
        finalCoord.pop();
        for(x in finalCoord)
            if(x!=finalCoord.length-1)
                polygon+=finalCoord[x][0]+" "+finalCoord[x][1]+",";
            else
                polygon+=finalCoord[x][0]+" "+finalCoord[x][1];
        polygon+="))"
        document.getElementById("polygon").value = polygon;
        console.log(polygon);
        console.log(layer);
    });

    var geocodeService = L.esri.Geocoding.geocodeService();

    map.on('click', function(e) {
        geocodeService.reverse().latlng(e.latlng).run(function(error, result) {
            var patt1 = /[1-9][0-9]{4}/g;
            document.getElementById("zipcode").value = result.address.Match_addr.match(patt1);

        });
    });
    map.on('measurefinish', function(evt){
        writeResults(evt);
        console.log("function is being called");
    });

    function writeResults(results){
        
    }
}


