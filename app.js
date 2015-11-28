var httpRequest;

function makeWeatherRequest(lat, lon){
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = displayWeather;
  httpRequest.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=2de143494c0b295cca9337e1e96b00e0');
  httpRequest.send();
}

function displayWeather(){
  if (httpRequest.readyState === XMLHttpRequest.DONE){
    if (httpRequest.status === 200){
      console.log(httpRequest.responseText);
    }
  }
}

makeWeatherRequest();
