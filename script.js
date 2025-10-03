const apiKey = "XXXX";
const cityInputEl = document.getElementById("city-input");
const weatherDataEl = document.getElementById("weather-data");
const Description = document.getElementById("description");
const Temp = document.getElementById("temp");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if(!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        console.log(data);

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="WeatherIcon">`
        Temp.textContent = `${temperature}°C`;
        Description.textContent = description;
        
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=> `<div>${detail}</div>`).join("")
    } catch (error) {
        Description.textContent = `Please enter a valid city`;
        weatherDataEl.querySelector(".icon").innerHTML = "";
        Temp.textContent = "";
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}