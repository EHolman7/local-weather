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
	console.log("weatherArray", weatherArray);
	let domStrang = '';
	  	domStrang += `<div class="col-sm-6 col-md-4">`;
	    domStrang += 	`<div class="thumbnail">`;
	    domStrang +=  `<div class="caption">`;
	    domStrang +=    `<h3>${weatherArray.name}</h3>`;
	    domStrang +=    `<p>${weatherArray.main.temp}</p>`;// Temperature
	   	domStrang +=    `<p>${weatherArray.weather["0"].description}</p>`;// Conditions
	    domStrang +=    `<p>${weatherArray.main.pressure}</p>`;// Air pressure
	    domStrang +=    `<p>${weatherArray.wind.speed}</p>`;// Wind speed
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

const dayString = (weatherArray) => {
	console.log("weatherArray", weatherArray);
	let dayStrang = '';
	for(let i =0; i < weatherArray.length; i++) {
		if (i % 3 === 0){
			dayStrang += `<div class ="row">`;
		}
	  	dayStrang += `<div class="col-sm-6 col-md-4">`;
	    dayStrang += 	`<div class="thumbnail">`;
	    dayStrang +=  `<div class="caption">`;
	    dayStrang +=    `<h3>${weatherArray.name}</h3>`;
	    dayStrang +=    `<p>${weatherArray.main.temp}</p>`;// Temperature
	   	dayStrang +=    `<p>${weatherArray.weather["0"].description}</p>`;// Conditions
	    dayStrang +=    `<p>${weatherArray.main.pressure}</p>`;// Air pressure
	    dayStrang +=    `<p>${weatherArray.wind.speed}</p>`;// Wind speed
	    dayStrang +=  		`</div>`;
	  	dayStrang +=  `</div>`;
		dayStrang += `</div>`;
	}
		printToDom2(dayStrang);
};

const printToDom2 = (strang2) => {
	$("#forecast").append(strang2);
};


module.exports = {domString, dayString, clearDom};
},{}],3:[function(require,module,exports){
"use strict";

const owm = require('./owm');

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


// const forecast = () => {
// 	$("#forecast").click(() => {
// 		console.log("click");
// 		let searchText = $('#searchBar').val();
// 		let zip = searchText;
// 		owm.weatherForecast(zip).then((results) => {
// 		console.log(results);
// 		dom.forecast(results);		
// 	}).catch((error) => {
// 		console.log("error from forecast", error);
// 	});
// 	});
// };

module.exports = {pressEnter};
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
			//console.log(data);
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
};

//weather forecast
const weatherForecast = (zip) => {
	return new Promise((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=${owmKey}&units=imperial`).done((data) => {
			resolve(data);
			//console.log(data);
		}).fail((error) => {
			reject(error);
		});
	});
};

const searchZipCodes = (zip) => {
	// execute searchOWM
	searchOWM(zip).then((data) => {
		console.log("data", data);
		showResults(data);
	}).catch((error) => {
		console.log("error in search Zip Codes", error);
	});
};

const searchForecast = (zip) => {
	// execute weatherForecast
	weatherForecast(zip).then((data) => {
		console.log("data", data);
		showResults(data);
	}).catch((error) => {
		console.log("error in search Zip Codes", error);
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

module.exports = {setKey, searchZipCodes, searchForecast};
},{"./dom":2,"./events":3}]},{},[4]);
