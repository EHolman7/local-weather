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