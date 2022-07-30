// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png"

let caller = async function (city) {
	let parameter = city.replace(' ', '+');
	let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${parameter}
	&units=metric&appid=71546e626ce54b166c7578d855928c49`);
	let data = await response.json();
	if (data.cod[0] == '4') {
		alert('Invalid Location');
		return null;
	}
	return data;
};

let search = document.getElementById('search-button');
let input = document.getElementById('city-input');
search.onclick =  () => {
	let city = input.value;
	init(city);
}

async function init(city) {
	
	console.clear();
	let data = await caller(city);
	
	city = city.toUpperCase().slice(0,1) + city.toLowerCase().slice(1);
	document.getElementById('city-name').textContent = city;

	parse_data(data);
}

let set_icon = (iconcode) => {
	document.getElementById('weather-icon').setAttribute('src', `http://openweathermap.org/img/w/${iconcode}.png`);
};

let parse_data = (data) => {
	set_location(data);
	set_times(data);
	set_weather(data);
}

async function set_location(data) {
	await set_country(data.sys.country);
	document.getElementById('sea_level').textContent = data.main.sea_level;
	document.getElementById('grnd_level').textContent = data.main.grnd_level;
	document.getElementById('lon').textContent = data.coord.lon;
	document.getElementById('lat').textContent = data.coord.lat;
}

async function set_country(code) {
	let request = await fetch(`https://restcountries.com/v2/alpha?codes=${code}`);
	let country = await request.json();
	document.getElementById('country').textContent = country[0].name;
	document.getElementById('region').textContent = country[0].region;
	document.getElementById('map-img').setAttribute('src', country[0].flags.svg);
}
function set_times(data) {
	document.getElementById('time_zone').textContent = time_to_string(data.timezone);
	document.getElementById('dt').textContent = time_to_string(new Date(data.dt));
	document.getElementById('sunrise').textContent = time_to_string(new Date(data.sys.sunrise + data.timezone));
	document.getElementById('sunset').textContent = time_to_string(new Date(data.sys.sunset + data.timezone));
}

function time_to_string(time) {
	let hour = Math.floor(time / 3600) % 24;
	let minute = Math.floor(time / 60) % 60;
	let time_string = "";
	if (hour < 10) {
		if (hour < 0)
			time_string += "-";
		time_string += "0";
	}
	time_string += `${Math.abs(hour)} : `;
	if (minute < 10)
		time_string += "0";
	time_string += `${minute}`;
	return time_string;
}

function set_weather(data) {
	set_icon(data.weather[0].icon);
	document.getElementById('type').textContent = data.weather[0].main;
	document.getElementById('description').textContent = data.weather[0].description;
	document.getElementById('temp').textContent = data.main.temp;
	document.getElementById('temp_max').textContent = data.main.temp_max;
	document.getElementById('temp_min').textContent = data.main.temp_min;
	document.getElementById('feels_like').textContent = data.main.feels_like;
	document.getElementById('pressure').textContent = data.main.pressure;
	document.getElementById('humidity').textContent = data.main.humidity;
	document.getElementById('clouds').textContent = data.clouds.all;
	document.getElementById('visibility').textContent = data.visibility;
	document.getElementById('speed').textContent = data.wind.speed;
	document.getElementById('deg').textContent = data.wind.deg;
	document.getElementById('gust').textContent = data.wind.gust;
}


init('Vladivostok');