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

module.exports = {pressEnter, pressSubmit};