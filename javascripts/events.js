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