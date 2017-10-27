(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const owm = require('./owm');

const apiKeys = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/apiKeys.json').done((data) => {
			resolve(data.apiKeys);
		}).fail((error) => {
			//console.log('api keys error!', error);
			reject(error);
		});
	});
};

const retrieveKeys = () => {
	apiKeys().then((results) => {
		owm.setKey(results.owm.apiKey);
	}).catch((error) => {
		console.log("error in retrieve keys", error);
	});
};

module.exports = {retrieveKeys};
},{"./owm":5}],2:[function(require,module,exports){
"use strict";

const domString = (weatherArray) => {
	//console.log("weatherArray", weatherArray);
	let domStrang = '';
	  	domStrang += `<div class="col-sm-6 col-md-4 col-md-offset-4">`;
	    domStrang += 	`<div class="thumbnail">`;
	    domStrang +=  `<div class="caption">`;
	    domStrang +=    `<h3>${weatherArray.name}</h3>`;
	    domStrang +=    `<p>${weatherArray.main.temp}</p>`;// Temperature
	   	domStrang +=    `<p>${weatherArray.weather["0"].description}</p>`;// Conditions
	    domStrang +=    `<p>${weatherArray.main.pressure}</p>`;// Air pressure
	    domStrang +=    `<p>${weatherArray.wind.speed}</p>`;// Wind speed
	    domStrang +=	`<a href="#" class="btn btn-primary" id="three" role="button">3 Day Forecast</a><a href="#" class="btn btn-primary" id="five" role="button">5 Day Forecast</a>`;
	    domStrang +=  		`</div>`;
	  	domStrang +=  `</div>`;
		domStrang += `</div>`;
		printToDom(domStrang);
};

const printToDom = (strang) => {
	$("#weather").append(strang);
};

const clearDom = () => {
	$('#weather').empty();
};

const dayString = (forecastArray, days) => {
	console.log("forecastArray", forecastArray);
	let dayStrang = '';
	var stop = 40;
	if (days === 3 ) {
		stop = 32;
	}
	for(let i = 8; i < stop; i=i+8) {
	  	dayStrang += `<div id="forcast-current" class="current col-sm-12 col-md-12 text-center">`;
	    dayStrang +=    `<h3>${forecastArray[i].city.name}</h3>`;
	    dayStrang +=    `<p>${forecastArray[i].main.temp}</p>`;// Temperature
	   	dayStrang +=    `<p>${forecastArray[i].weather["0"].description}</p>`;// Conditions
	    dayStrang +=    `<p>${forecastArray[i].main.pressure}</p>`;// Air pressure
	    dayStrang +=    `<p>${forecastArray[i].wind.speed}</p>`;// Wind speed
	    dayStrang +=  		`</div>`;
	}
		printToDom2(dayStrang);
};

const printToDom2 = (strang) => {
	$("#forecast").append(strang);
};

module.exports = {domString, dayString, clearDom};
},{}],3:[function(require,module,exports){
"use strict";

const owm = require('./owm');
let zip;

//const zipCodes =/(^\d{5}$)|(^\d{5}-\d{4}$)/;

const pressEnter = () => {
	$(document).keypress((e) => {
		if(e.key === 'Enter'){
			console.log("inside enter");
			let searchText = $('#searchBar').val();
			let zip = searchText;
			console.log("zip", zip);
			owm.searchZipCodes(zip);
		}
	});
};

const pressSubmit = () => {
	$("#submitBtn").on("click",(e) => {
		console.log("event", e.target);
		let searchText = $('#searchBar').val();
		let zip = searchText;
		owm.searchZipCodes(zip);		
	});
};

// add event listeners to forecast buttons
$(document).on('click', '#three', (e) => { 
	let searchText = $('#searchBar').val();
	let zip = searchText;
	owm.searchForecast(zip);
});

$(document).on('click', '#five', (e) => { 
	let searchText = $('#searchBar').val();
	let zip = searchText;
	owm.searchForecast(zip);
});

module.exports = {pressEnter, pressSubmit};
},{"./owm":5}],4:[function(require,module,exports){
"use strict";

//let dom = require("./dom");

let events = require('./events');
let apiKeys = require('./apiKeys');
let owm = require('./owm');

apiKeys.retrieveKeys();

// $(document).click(() => {
// 	owm.searchOWM(37217);
// });

 events.pressEnter();
 events.pressSubmit();
 //events.forecast();
},{"./apiKeys":1,"./events":3,"./owm":5}],5:[function(require,module,exports){
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


},{"./dom":2,"./events":3}]},{},[4]);
