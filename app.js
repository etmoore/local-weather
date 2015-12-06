var lat;
var lon;
var httpRequest;
var tempUnit = 'F';
var temp;
var convertTempButton = document.getElementsByTagName('button')[0];

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
      temp = temp || json.main.temp;
      var html = '';
      html += "<p class='city'><b>" + json.name + "</b></p>";
      html += "<p class='temperature'>" + temp.toFixed(2) + " &deg;" + tempUnit + "</p>";
      html += "<p class='description'>" + json.weather[0].description + "</p>";
      html += "<p class='wind'> wind: " + json.wind.speed + "mph " + calculateWindDirection(json.wind.deg) + "</p>";
      html += "<img class='weather-icon' src='http://openweathermap.org/img/w/" + json.weather[0].icon + ".png' alt='weather icon'>"
      document.getElementsByClassName('forecast')[0].innerHTML = html;
      convertTempButton.removeAttribute('hidden');
    }
  }
}

function calculateWindDirection(degrees){
  var compassPoints = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return compassPoints[Math.round(degrees/45)];
}

function convertTemp(){
  console.log('in convertTemp');
  if (tempUnit === 'F'){
    console.log('converting to C');
    tempUnit = 'C';
    temp = (temp - 32) * 5 / 9;
    displayWeather();
  }
  else if (tempUnit === 'C'){
    tempUnit = 'F';
    temp = (temp * 9 / 5) + 32;
    displayWeather();
  }
}

convertTempButton.addEventListener('click', convertTemp);

function init(){
  navigator.geolocation.getCurrentPosition(function(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    makeRequest(lat, lon);
  });
};

init();
