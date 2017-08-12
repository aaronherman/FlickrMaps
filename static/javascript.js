var myCenter=new google.maps.LatLng(43.3033,-91.7857);
var map; 
function initialize() {
  var req = new XMLHttpRequest()
  req.open("GET","/", true);
  req.onreadystatechange = function () {
    var mapProp = {
      center:myCenter,
      zoom:10,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };


    map=new google.maps.Map(document.getElementById("googleMap"),mapProp);


    var marker=new google.maps.Marker({
      position:myCenter,
    });
    marker.setMap(map);


    google.maps.event.addListener(map, 'click', function(event){
      placeMarker(event.latLng, map);
      latitude = event.latLng.lat(); 
      longitude = event.latLng.lng(); 
      getlatandlon(latitude, longitude); 
    });

    function placeMarker (position, map) {
    var marker = new google.maps.Marker({
      position: position,
      map: map
    });
    map.panTo(position);
  }
  };
  req.send(); 
};
google.maps.event.addDomListener(window, 'load', initialize);

function placeMarker (lat, lon, map, id) {
var position = new google.maps.LatLng(lat,lon); 
var marker = new google.maps.Marker({
  position: position,
  map: map
});
}; 

function highlight() {
  alert("this picture clicked"); 
}; 

function addtext() {
  alert("Button worked!")

}; 


function getlatandlon(thelatitude, thelongitude) {

    var submitted_lat = thelatitude;
    var submitted_lon = thelongitude; 

    console.log(submitted_lat, submitted_lon); 

    var url = "/coordinates";
    var params = "latitude="+submitted_lat+"&longitude="+submitted_lon;

    console.log(params)

    var obj = new XMLHttpRequest();
    obj.open("GET",url+"?"+params, true);
    obj.onreadystatechange = function () {
        if (obj.readyState == 4 && obj.status == 200) {
            picjson = JSON.parse(obj.responseText)
            console.log(picjson)
            var picdiv = document.getElementById('pictures'); 

            function addTitle(i) {
              "use strict";
              return function () {
                document.getElementById('divtitle').innerHTML = picjson.json_obj[i]['title'];

                var theid = picjson.json_obj[i]['id'];
                var theauthor = picjson.json_obj[i]['author'];

                var theurl = "http://flickr.com/photos/"+theauthor+"/"+theid;
                console.log(theurl)
                document.getElementById("divurl").setAttribute("href", theurl);
              }
            }

            for (i in picjson.json_obj) {

                console.log(picjson.json_obj[i]);

                var btn = document.createElement("BUTTON");  

                var img = document.createElement("IMG");
                img.src = picjson.json_obj[i]['url']; 
                img.id = "picjson.json_obj[i]['id']"; 
                img.title = picjson.json_obj[i]['title'];
                title = picjson.json_obj[i]['title']; 

                btn.appendChild(img);   

                btn.addEventListener("click", addTitle(i), false); 

                picdiv.appendChild(btn);

                var lat = picjson.json_obj[i]["lat"]; 
                var lon = picjson.json_obj[i]["lon"]; 

                placeMarker(lat, lon, map); 
              }
        }        
    }
obj.send();
};
