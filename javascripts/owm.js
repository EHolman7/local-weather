"use strict";

let owmKey;
const dom = require('./dom');
const events = require('./events');

//current weather
const searchOWM = (zip) => {
	// promise search zip codes
	return new Promise((resolve, reject) => {
		$.ajax(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=${owmKey}&units=imperial`).done((data) => {
			console.log(data);
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
};

//weather forecast
const weatherForecast = (zip, days) => {
	return new Promise((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=${owmKey}&units=imperial`).done((data) => {
			resolve(data);
			console.log(data);
		}).fail((error) => {
			reject(error);
		});
	});
};

const searchZipCodes = (zip) => {
	// execute searchOWM
	searchOWM(zip).then((data) => {
		//console.log("data", data);
		showResults(data);
	}).catch((error) => {
		console.log("error in search Zip Codes", error);
	});
};

const searchForecast = (zip) => {
	// execute weatherForecast
	weatherForecast(zip).then((data) => {
		console.log("data", data);
		showResults2(data);
	}).catch((error) => {
		console.log("error in search forecast", error);
	});
};

const setKey = (apiKey) => {
	// sets owmKey
	owmKey = apiKey;
	console.log("owmKey", owmKey);
};

const showResults = (weatherArray) => {
	dom.clearDom();
	dom.domString(weatherArray);
};

const showResults2 = (forecastArray) => {
	dom.clearDom();
	dom.dayString(forecastArray);
};



module.exports = {setKey, searchZipCodes, searchForecast};

