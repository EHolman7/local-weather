"use strict";

const domString = (weatherArray) => {
	console.log("weatherArray", weatherArray);
	let domStrang = '';
	for(let i =0; i < weatherArray.length; i++) {
		if (i % 3 === 0){
			domStrang += `<div class ="row">`;
		}
	  	domStrang += `<div class="col-sm-6 col-md-4">`;
	    domStrang += 	`<div class="thumbnail">`;
	    domStrang +=  `<div class="caption">`;
	    domStrang +=    `<h3>${weatherArray[i].name}</h3>`;
	    domStrang +=    `<p>${weatherArray[i].temp}</p>`;// Temperature
	   	domStrang +=    `<p>${weatherArray[i].conditions}</p>`;// Conditions
	    domStrang +=    `<p>${weatherArray[i].pressure}</p>`;// Air pressure
	    domStrang +=    `<p>${weatherArray[i].wind}</p>`;// Wind speed
// An affordance to view the forecast for the current day, the next three days, or the next 7 days
	    domStrang +=    `<p><a href="#" class="btn btn-primary" role="button">3 day forecast</a> <a href="#" class="btn btn-default" role="button">5 day forecast</a></p>`;
	    domStrang +=  		`</div>`;
	  	domStrang +=  `</div>`;
		domStrang += `</div>`;
	}
		printToDom(domStrang);
};

const printToDom = (strang) => {
	$("#weather").append(strang);
};

const clearDom = () => {
	$('#weather').empty();
};


module.exports = {domStrang, clearDom};