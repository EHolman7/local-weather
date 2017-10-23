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
	let domString = '';
	for(let i =0; i < weatherArray.length; i++) {
		if (i % 3 === 0){
			domString += `<div class ="row">`;
		}
	  	domString += `<div class="col-sm-6 col-md-4">`;
	    domString += 	`<div class="thumbnail">`;
	    domString +=  `<div class="caption">`;
	    domString +=    `<h3>${weatherArray[i].name}</h3>`;
	    domString +=    `<p>${weatherArray[i].temp}</p>`;// Temperature
	   	domString +=    `<p>${weatherArray[i].conditions}</p>`;// Conditions
	    domString +=    `<p>${weatherArray[i].pressure}</p>`;// Air pressure
	    domString +=    `<p>${weatherArray[i].wind}</p>`;// Wind speed
// An affordance to view the forecast for the current day, the next three days, or the next 7 days
	    domString +=    `<p><a href="#" class="btn btn-primary" role="button">3 day forecast</a> <a href="#" class="btn btn-default" role="button">5 day forecast</a></p>`;
	    domString +=  		`</div>`;
	  	domString +=  `</div>`;
		domString += `</div>`;
	}
		printToDom(domString);
};

const printToDom = (strang) => {
	$("#weather").append(strang);
};

const clearDom = () => {
	$('#weather').empty();
};


module.exports = {domString, clearDom};
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
			owm.searchOWM(zip);
		}
	});
};

module.exports = {pressEnter};
},{"./owm":5}],4:[function(require,module,exports){
"use strict";

let dom = require("./dom");

let events = require('./events');
let apiKeys = require('./apiKeys');

apiKeys.retrieveKeys();

// $(document).click(() => {
// 	owm.searchOWM(37217);
// });



 events.pressEnter();
},{"./apiKeys":1,"./dom":2,"./events":3}],5:[function(require,module,exports){
"use strict";

let owmKey;
const dom = require('./dom');
const events = require('./events');

const searchOWM = (zip) => {
	// promise search zip codes
	return new Promise((resolve, reject) => {
		$.ajax(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=${owmKey}&units=imperial`).done((data) => {
			console.log(data);
			resolve(data.results);
		}).fail((error) => {
			reject(error);
		});
	});
};

// const searchZipCodes = (zip) => {
// 	// execute searchOWM
// 	searchOWM(zip).then((data) => {
// 		console.log("data", data);
// 		//showResults(data);
// 	}).catch((error) => {
// 		console.log("error in search Zip Codes", error);
// 	});
// };

const setKey = (apiKey) => {
	// sets owmKey
	owmKey = apiKey;
	console.log("owmKey", owmKey);
};

const showResults = (weatherArray) => {
	dom.clearDom();
	dom.domString(weatherArray);
};

module.exports = {setKey, searchOWM};
},{"./dom":2,"./events":3}]},{},[4]);
