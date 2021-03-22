const api = {
    key : "3d47abbbbf8b97cb262a7926f77923c7",
    base : "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults (query){
    fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>℃</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}℃/ ${Math.round(weather.main.temp_max)}℃`;

    let visi = document.querySelector('.current .vis');
    visi.innerText = `Visibilty : ${weather.visibility}m`;

    let humid = document.querySelector('.current .humi');
    humid.innerText = `Humidity : ${weather.main.humidity}%`;

    let windspeed = document.querySelector('.current .ws');
    windspeed.innerText = `Wind Speed : ${weather.wind.speed}m/s`;

    let pressure = document.querySelector('.current .press');
    pressure.innerText = `Pressure : ${weather.main.pressure}hPa`;
}

function dateBuilder(d){
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date}, ${month}, ${year}`;
}