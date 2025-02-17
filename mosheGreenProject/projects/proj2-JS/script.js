const API_Key = "d09d3fa08043d470893c5b15450d1c3d";
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_Key}&units=metric&q=`;
const cityName = document.getElementById("inputCity");
const button = document.querySelector("button");
const cityHeading = document.getElementById("city");
const description = document.getElementById("description");
const temp = document.getElementById("temp");
const sunny = document.getElementById("sunny");
const cloudy = document.getElementById("cloudy");
const rainy = document.getElementById("rainy");
const errorMessage = document.getElementById("errorMessage"); 
const body = document.body;  

function getWeather(city) 
{
    if(!city.trim()) 
    {
        displayError("Please enter a city name.");
        return;
    }

    errorMessage.innerText = ""; 

    fetch(URL + city)
        .then(res => res.json())
        .then((data) => {
            if (data.cod === "404") 
                { 
                displayError("City not found. Please enter a valid city.");
                return;
                }

            cityHeading.innerText = data.name;
            description.innerText = data.weather[0].description;
            temp.innerText = `${data.main.temp}°C`;
            const weatherCondition = description.innerText.toLowerCase();
            sunny.style.display = "none";
            rainy.style.display = "none";
            cloudy.style.display = "none";

            if (weatherCondition.includes("clear") || weatherCondition.includes("sun")) 
                {
                sunny.style.display = "block";
                setWeatherTheme("#FFD700", "#FFA500"); 
                } 
            else if (weatherCondition.includes("rain") || weatherCondition.includes("drizzle")) 
                {
                rainy.style.display = "block";
                setWeatherTheme("#6C7A89", "#34495E"); 
                } 
            else if (weatherCondition.includes("cloud") || weatherCondition.includes("overcast")) 
                {
                cloudy.style.display = "block";
                setWeatherTheme("#B0C4DE", "#778899"); 
                } 
            else if (weatherCondition.includes("storm") || weatherCondition.includes("thunder")) 
                {
                rainy.style.display = "block";
                setWeatherTheme("#2C3E50", "#1C2833"); 
                }
            else if (weatherCondition.includes("snow") || weatherCondition.includes("blizzard")) 
                {
                snowy.style.display = "block";
                setWeatherTheme("#ADD8E6", "#4682B4"); 
                }
            else 
            {
                cloudy.style.display = "block";
                setWeatherTheme("#D3D3D3", "#A9A9A9"); 
            }
        })
        .catch(() => {
            displayError("Please enter a valid city.");
        });
}


function setWeatherTheme(bgColor, btnColor) 
{
    body.style.transition = "background 0.5s ease-in-out";  
    body.style.background = bgColor;
    button.style.background = btnColor;
}


function displayError(message) 
{
    errorMessage.innerText = message;
    cityHeading.innerText = "";
    description.innerText = "";
    temp.innerText = "";
    sunny.style.display = "none";
    rainy.style.display = "none";
    cloudy.style.display = "none";
    setWeatherTheme("#FF6347", "#FF4500"); 
}


button.addEventListener("click", () => {
    getWeather(cityName.value);
});

