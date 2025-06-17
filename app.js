
const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "d928e2b074ec4f7f9d284fd63beade11"


//add event listener to handle form submission
weatherForm.addEventListener("submit",async event => {
    event.preventDefault();//prevent from refreshing

    const city = cityInput.value;
    if (city) {
        try {
           //fetch data from entered ciyu
            const weatherData = await getWeatherData(city);
            displayWeatherinfo(weatherData);
            
        }
        catch (error) {
            console.error(error);
            displayError(Error)
        }
        
    }
    else {
        displayError("please enter city")//displayed whem no city name is enterd
   }
    
})
//async function used to fetch weather data from openweather api
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    //check if api request was successful
    if (!response.ok) {

        throw new Error("cannot fetch weather data")
        
    }
    //convert response to json
    return await response.json();
}
//function to display weather data in card
function displayWeatherinfo(data) {
    //destructure data from api
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;
//clear the previous card
    card.textContent = "";
    card.style.display = "flex";
    //create card elements
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");

    const humidityDisplay= document.createElement("p");

    const descriptionDisplay= document.createElement("p");
    const weatherEmoji = document.createElement("p");

//set card element content to data from api
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity : ${humidity}%`;
    descriptionDisplay.textContent = `${description}`
    weatherEmoji.textContent = getWeatherEmoji(id);
    

//assign class for api
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descriptionDisplay.classList.add("descriptionDisplay");
    weatherEmoji.classList.add("weatherEmoji")
    changeBackgroundWeather(id);


//appending result to card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descriptionDisplay);
    card.appendChild(weatherEmoji);

    
    
}
//function to display emoji according to weather elelements
function getWeatherEmoji(WeatherId) {
    switch (true) {
        case (WeatherId >= 200 && WeatherId < 300):
     return "🌨"     
        case (WeatherId >= 300 && WeatherId < 400):
            return "🌧";
        case (WeatherId >=500 && WeatherId <600):
            return "🌧";
        case (WeatherId >= 600 && WeatherId < 700):
            return "❄";
        case (WeatherId >=700 && WeatherId < 800):
            return "🌫";
        case (WeatherId === 800):
            return "☀";
        case (WeatherId >800 && WeatherId <=810):
            return "☁";
        default:
            return "?";
    }

    
}
//change background color according to weather
function changeBackgroundWeather(WeatherId) {
    

    switch (true) {
case (WeatherId >= 200 && WeatherId < 300):
    document.body.style.backgroundImage = "linear-gradient(to right, #232526, #414345)"; // Thunderstorm
    break;
case (WeatherId >= 300 && WeatherId < 400):
    document.body.style.backgroundImage = "linear-gradient(to right, #485563, #29323c)"; // Drizzle
    break;
case (WeatherId >= 500 && WeatherId < 600):
    document.body.style.backgroundImage="linear-gradient(to right, #2c3e50, #3498db)";// Rain
    break;
case (WeatherId >= 600 && WeatherId < 700):
    document.body.style.backgroundImage= "linear-gradient(to right, #e6dada, #274046)";// Snow
    break;
case (WeatherId >= 700 && WeatherId < 800):
    document.body.style.backgroundImage = "linear-gradient(to right, #bdc3c7, #2c3e50)";// Atmosphere
    break;
case (WeatherId === 800):
    document.body.style.backgroundImage = "linear-gradient(to right,rgb(235, 237, 108),rgb(237, 215, 47))"; // Clear
    break;
case (WeatherId > 800 && WeatherId <= 810):
    document.body.style.backgroundImage= "linear-gradient(to right, #ffffff, #e0e0e0)"; // Clouds
    break;

default:
      document.body.style.backgroundImage= "linear-gradient(90deg,rgba(10,245,221,1)0%,rgba(34,199,180,1)35%,rgba(24,157,184,1)100%)"
    break;
    }
    
}

//function to display error messages

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay")
//clear card and display error message
    card.textContent = '';
    card.style.display = "flex";
    card.appendChild(errorDisplay);
 
}
