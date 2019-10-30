var myMap = L.map("map", {
    center: [41.866094, -87.670421],
    zoom: 10
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
  var crashes = "https://data.cityofchicago.org/resource/85ca-t3if.json";
  
  d3.json(crashes).then(function(data) {
    var heatArray = [];
  
    data.forEach((response) => {
      const { location } = response;
  
      if (location) {
        heatArray.push([location.coordinates[1], location.coordinates[0]]);
      }
    });
  
    L.heatLayer(heatArray, {
      radius: 65,
      blur: 10
    }).addTo(myMap);
  }).catch(function(error) {
    console.log(error);
  });