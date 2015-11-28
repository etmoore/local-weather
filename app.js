var lat;
var lon;
var httpRequest;

function makeWeatherRequest(lat, lon){
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = displayWeather;
  httpRequest.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=2de143494c0b295cca9337e1e96b00e0');
  httpRequest.send();
}

function displayWeather(){
  if (httpRequest.readyState === XMLHttpRequest.DONE){
    if (httpRequest.status === 200){
      console.log(httpRequest.responseText);
    }
  }
}

function getGeoLocation(){
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude, position.coords.longitude);
  });
  // navigator.geoLocation.getCurrentPosition(function(position){
  //   lat = position.coords.latitude;
  //   lon = position.coords.longitude;
  //   console.log(lat, lon);
  // });
};

getGeoLocation();
makeWeatherRequest(35, 139);
