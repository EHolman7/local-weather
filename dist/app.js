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
},{"./owm":4}],2:[function(require,module,exports){
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
},{"./owm":4}],3:[function(require,module,exports){
"use strict";

// let dom = require("./dom");

// "main":{
// "temp":306.15, //current temperature 
// "pressure":1013,
// "humidity":44,
// "temp_min":306, //min current temperature in the city
// "temp_max":306 //max current temperature in the city
// },

let events = require('./events');
let apiKeys = require('./apiKeys');

apiKeys.retrieveKeys();

// $(document).click(() => {
// 	owm.searchOWM(37217);
// });



 events.pressEnter();
},{"./apiKeys":1,"./events":2}],4:[function(require,module,exports){
"use strict";

let owmKey;
//const dom = require('./dom');
const events = require('./events');

const searchOWM = (zip) => {
	// promise search zip codes
	return new Promise((resolve, reject) => {
		$.ajax(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=${owmKey}`).done((data) => {
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

// const showResults = (weatherArray) => {
// 	dom.clearDom();
// 	dom.domString(weatherArray);
// };

module.exports = {setKey, searchOWM};
},{"./events":2}]},{},[3]);
