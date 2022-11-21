# weather-dashboard

## Description

Web application with the purpose of retrieving data from another application's API and using it in the context of its own. This is a weather dashboard that runs in the browser and features dynamically updated HTML and CSS.

This code uses the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities. This application uses `localStorage` to store any persistent data.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Application Screenshot

![orduno-weather-dashboard-screenshot](/assets/images/jesus-orduno-weather-dashboard-screenshot.html.png)

## Link to Deployed Application

[Page published here](https://jesus-orduno.github.io/weather-dashboard/)
