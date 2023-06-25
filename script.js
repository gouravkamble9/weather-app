const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const cityName=document.getElementById('cityName');
const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');

const getLocation=document.querySelector('.getLoc');

async function checkWeather(city,lat,long){
    console.log(city);
    const api_key = "9d7884cfea3dfab492718b948eb8dce1";
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    let url;
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    } else if (lat && long) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`;
    } else {
      return;
    }

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        inputBox.value="";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    cityName.innerHTML=weather_data.name;
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "./assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "./assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "./assets/rainy.png";
            break;
        case 'Mist':
            weather_img.src = "./assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "./assets/snow.png";
            break;
        case 'Haze':
            weather_img.src = "/assets/haze.png";
            break;
        case 'Haze':
            weather_img.src = "/assets/mist.png";
            break;

    }

    inputBox.value="";

    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value,undefined,undefined);

});

async function gotlocation(position){
    console.log(position);
    
    await checkWeather(undefined,position.coords.latitude,position.coords.longitude);
}

function failtoget(){
    console.log("No location")
}

getLocation.addEventListener('click',async ()=>{
    const result=navigator.geolocation.getCurrentPosition(gotlocation,failtoget)
});
