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