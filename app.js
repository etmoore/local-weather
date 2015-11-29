var lat;
var lon;
var httpRequest;

function makeRequest(lat, lon){
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = displayWeather;
  var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=2de143494c0b295cca9337e1e96b00e0&units=imperial'
  httpRequest.open('GET', url);
  httpRequest.send();
}

function displayWeather(){
  if (httpRequest.readyState === XMLHttpRequest.DONE){
    if (httpRequest.status === 200){
      var json = JSON.parse(httpRequest.responseText);
      var html = '';
      html += "<p class='city'>" + json.name + "</p>";
      html += "<p class='temperature'>" + json.main.temp + " degrees </p>";
      html += "<p class='description'>" + json.weather[0].description + "</p>";
      document.getElementsByClassName('weatherbox')[0].innerHTML = html;
    }
  }
}

function init(){
  navigator.geolocation.getCurrentPosition(function(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    makeRequest(lat, lon);
  });
};

init();
