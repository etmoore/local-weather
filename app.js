var lat;
var lon;
var httpRequest;

function makeWeatherRequest(lat, lon){
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = displayWeather;
  httpRequest.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=2de143494c0b295cca9337e1e96b00e0&units=imperial');
  httpRequest.send();
}

function displayWeather(){
  if (httpRequest.readyState === XMLHttpRequest.DONE){
    if (httpRequest.status === 200){
      var json= JSON.parse(httpRequest.responseText);
      var html = '';
      html += "City: " + json.name + "<br>";
      html += "Temperature: " + json.main.temp + " degrees <br>";
      html += "Description: " + json.weather[0].description + "<br>";
      document.getElementsByClassName('weatherbox')[0].innerHTML = html;
    }
  }
}

function init(){
  navigator.geolocation.getCurrentPosition(function(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    makeWeatherRequest(lat, lon);
  });
};

init();
