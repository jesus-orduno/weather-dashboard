var searchBtn = $(`#searchBtn`);
var apiKey = 'd7ec5251a0e16bfd35f2a82ad5dbcb91';
var cityName = '';
var currentWeather = $(`#currentWeather`);
var searchHistory = $(`#searchHistory`);
var fiveDay = $(`#fiveDay`);
var today = moment().format('L');

var recentSearch = JSON.parse(localStorage.getItem('recentSearch')) || [];

function search() {
  cityName = $(`#cityName`).val();
  if(!recentSearch.includes(cityName)){
    recentSearch.unshift(cityName);
  }
  localStorage.setItem('recentSearch', JSON.stringify(recentSearch));
  
  newSearchBtn();

  var geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
  fetch(geoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
      
      fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayWeather(data);
      })
    })
};

function newSearchBtn() {
  $(`#searchHistory`).empty();

  if(recentSearch.length > 10){
    recentSearch.pop();
  };

  for (var i = 0; i < recentSearch.length; i++) {
    var recentSearchBtn = $(`<button class="btn btn-secondary">`).text(recentSearch[i]);
    $(`#searchHistory`).append(recentSearchBtn);
  }
};

function displayWeather(weatherData) {
  console.log(weatherData);

  $(`#today`)
    .text(cityName + ' ' + today)
    .append($(`<img src="http://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png">`));

  $(`#temp`).text(`Temperature: ${weatherData.list[0].main.temp} F`);

  $(`#humidity`).text(`Humidity: ${weatherData.list[0].main.humidity}%`);

  $(`#windSpeed`).text(`Wind Speed: ${weatherData.list[0].wind.speed} MPH`);

  $(`#uvIndex`).text(`UV Index: ${weatherData.list[0].main.uvi}`);

  if (weatherData.list[0].main.uvi <= 3) {
    $(`#uvIndex`).removeClass("bg-warning bg-danger").addClass(`bg-success`);
  } else if (weatherData.list[0].main.uvi > 3 && weatherData.list[0].main.uvi < 6) {
    $(`#uvIndex`).removeClass("bg-success bg-danger").addClass("bg-warning");
  } else {
    $(`#uvIndex`).removeClass("bg-success bg-warning").addClass("bg-danger");
  }

  $(`#fiveDay`).empty();

  for (var i = 0; i < 5; i++) {
    var fiveDayCard = $(`<div class="card col-2">`);
    var fiveDayDate = $(`<div class="card-header">`).text(moment().add(i + 1, 'days').format('L'));
    var individualDayCard = document.createElement('p');
    fiveDayCard.append(individualDayCard).textContent = fiveDayDate;
    var fiveDayIcon = $(`<img src="http://openweathermap.org/img/w/${weatherData.list[i].weather[0].icon}.png">`);
    var fiveDayTemp = $(`<div class="card-body">`).text(`Temp: ${weatherData.list[i].main.temp} F`);
    var fiveDayWind = $(`<div class="card-body">`).text(`Wind: ${weatherData.list[i].wind.speed} MPH`);
    var fiveDayHumidity = $(`<div class="card-body">`).text(`Humidity: ${weatherData.list[i].main.humidity}%`);

    fiveDayCard.append(fiveDayDate, fiveDayIcon, fiveDayTemp, fiveDayHumidity);
    $(`#fiveDay`).append(fiveDayCard);
  }
};

searchBtn.on('click', search);

newSearchBtn();


