// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png"



let contacter = async (city) => {
	let parameter = city.replace(' ', '+');
	console.log(city);
	let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${parameter}
		&appid=71546e626ce54b166c7578d855928c49`);
	let data = await response.json();
	if (data.cod[0] == '4') {
		alert('Invalid Location');
	}
	return data;
};

let image = (iconcode) => ('url(http://openweathermap.org/img/w/' + iconcode + '.png');

export default contacter;
export image;





