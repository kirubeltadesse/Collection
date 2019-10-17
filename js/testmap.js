(function(L, document) {
    // center of the map
    var center = [38.205,-122.2869];

    var map = L.map('mapid', {
        drawControl: true,

        // measureControl: true,}).setView(center, 10);
        center: [38.205,-122.2869],
        zoom: 16,
        measureControl: true
    });

    L.tileLayer('https://maps.tilehosting.com/styles/hybrid/{z}/{x}/{y}.jpg?key=trAzZh4tFv6kVYo4It60',{
        attribution: '<a href="https://www.maptiler.com/license/maps/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
        crossOrigin: true
    }).addTo(map);
    // // add a marker in the given location
    //     L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    //     minZoom: 14,
    //         maxZoom: 18,
    //         attribution: '&copy; Esri &mdash; Sources: Esri, DigitalGlobe, Earthstar Geographics, CNES/Airbus DS, GeoEye, USDA FSA, USGS, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community'
    // }).addTo(map);
    L.marker(center).addTo(map);

    //  var editableLayers = new L.FeatureGroup();
    //  map.addLayer(editableLayers);
    //
    //  var drawPluginOptions = {
    //      position: 'topright',
    //      draw: {
    //          polygon: {
    //              allowIntersection: false, // Restricts shapes to simple polygons
    //              drawError: {
    //                  color: '#e1e100', // Color the shape will turn when intersects
    //                  message: '<strong>DURI Map Service Error<strong> you can\'t draw that!' // Message that will show when intersect
    //              },
    //              shapeOptions: {
    //                  color: '#97009c'
    //              }
    //          },
    //          // disable toolbar item by setting it to false
    //          polyline: false,
    //          circle: false, // Turns off this drawing tool
    //          rectangle: false,
    //          marker: false,
    //      },
    //      edit: {
    //          featureGroup: editableLayers, //REQUIRED!!
    //          remove: false
    //      }
    //  };
    //
    // var drawControl = new L.Control.Draw(drawPluginOptions);
    //  map.addControl(drawControl);

    //   map.on('draw:created', function(evt) {
    //   writeResults(evt);
    //   console.log(evt);
    // });




    map.on('measurefinish', function(evt) {
        writeResults(evt);

    });
    // Finding the zipcode
    var geocodeService = L.esri.Geocoding.geocodeService();
    map.on('click', function(e) {
        console.log("being called!")
        geocodeService.reverse().latlng(e.latlng).run(function(error, result) {
            console.log(result);
            var patt1 = /[1-9][0-9]{4}/g;
            // document.getElementById("zipcode").value = result.address.Match_addr.match(patt1);
            test = result.address.Match_addr.match(patt1)
            console.log(test);
        });
    });

    function writeResults(results) {
        document.getElementById('eventoutput').innerHTML = JSON.stringify(
            {
                area: results.area,
                areaDisplay: results.areaDisplay,
                lastCoord: results.lastCoord,
                length: results.length,
                lengthDisplay: results.lengthDisplay,
                pointCount: results.pointCount,
                points: results.points
            },
            null,
            2
        );
        polygon = "POLYGO((";
        pnts = results.pointCount;
        arr = results.points;
        for(var i = 0; i < pnts; i++){
            if(i!=pnts-1)
                polygon+= arr[i].lng+" "+arr[i].lat+",";
            else
                polygon+= arr[i].lng+" "+arr[i].lat;
        }
        polygon+="))"
        // document.getElementById("polygon").value = polygon;
        console.log(polygon);




    }
})(window.L, window.document);

