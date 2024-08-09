let cityName = document.querySelector(".inputcity");
let temp = document.querySelector(".temp");
let city = document.querySelector(".city");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".Wind");
let weather = document.querySelector(".weather");
let error = document.querySelector(".error");
let weather_icon = document.querySelector(".weather-icon");
// let card = document.querySelector(".card");
let btn = document.querySelector("#button");
let apikey = "ae623d419158af94635910a57982d7d8";

let apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let updateimg = (condition) => {
    if (condition === "Clouds") {
        weather_icon.src = "images/clouds.png";
    }
    else if (condition === "Clear") {
        weather_icon.src = "images/clear.png";
    }
    else if (condition === "Drizzle") {
        weather_icon.src = "images/drizzle.png";
    }
    else if (condition === "Mist") {
        weather_icon.src = "images/mist.png";
    }
    else if (condition === "Rain") {
        weather_icon.src = "images/rain.png";
    }
    else if (condition === "Snow") {
        weather_icon.src = "images/snow.png";
    }
}



let update = (data) => {
    city.innerHTML = data.name;
    // temp.innerHTML = data.main.temp;

    temp.innerHTML = `${Math.round(data.main.temp)} <sup>o</sup>C`;

    // humidity.innerHTML = data.main.humidity;
    humidity.innerHTML = `${data.main.humidity}%`;

    // wind.innerHTML = data.wind.speed;
    wind.innerHTML = `${data.wind.speed}km/h`;
    updateimg(data.weather[0].main);
    // colorupdate(data.main.temp);

    // display 
    error.style.display = "none";
    weather.style.display = "block";
}

async function Checkapi(cityName) {
    const response = await fetch(apiurl + cityName + `&appid=${apikey}`);
    let data = await response.json();

    if (cityName === "") {
        error.innerHTML = `Enter city name in input box`;
        weather.style.display = "none";
        error.style.display = "block";
        return;
    }

    else if (data.cod < 300 && data.cod > 100) {
        update(data);
    }
    else if (response.status === 404) {
        // error.innerHTML = `${cityName} city is Not Found`;
        error.innerHTML = `Enter correct city name`;
        weather.style.display = "none";
        error.style.display = "block";
        return;
    }
    // console.log(data);

}


let calls = () => {
    Checkapi(cityName.value);
}

btn.addEventListener("click", calls);