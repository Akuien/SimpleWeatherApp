const temperature = document.querySelector(".city_temperature");
const description = document.querySelector(".city_weather_description");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

var search_button = document.querySelector(".searchBtn");
var search_input = document.querySelector(".search-Input");

//We first take user input, that is the city entered by the user in the search bar.
const takeUserInput = function () {
    var city = search_input.value;
        if (city.trim() === "") {
        alert("Error: City name cannot be empty!")
    }
    getCityCurrentWeather(city);
}

//We pass this input(specified city) to the api to get the response/details about the weather back
const getCityCurrentWeather = function (city) {

    //the api_url looks for the specified city from the input to get its current weather info
    const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=25ba9b1776ffb6593c36f34fa561c2c2&units=metric';

    fetch(api_url)
        .then(response => {
            if(!response.ok) {
                alert("Error: No weather available, check your input!");
            }
            const responseFromApi = response.json();
            return responseFromApi;
        })

        .then(responseFromApi => {
            displayCurrentWeatherResults(responseFromApi);
        })

        .catch(err => {
            console.log(err);
        });

        
}

//we pass the weather results from the api to the display function, to display the weather of the city.
const displayCurrentWeatherResults = function(responseFromApi) {

    temperature.innerHTML = "Temp: " + Math.round(responseFromApi.main.temp) + " °C";
    description.innerText = responseFromApi.weather[0].description;
    humidity.innerText = "Humidity: " + responseFromApi.main.humidity + "%";
    wind.innerText = "Wind speed: " + responseFromApi.wind.speed + " km/h";
}
