"use strict";

const domString = (weatherArray) => {
	//console.log("weatherArray", weatherArray);
	let domStrang = '';
	  	domStrang += `<div class="col-sm-6 col-md-4">`;
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

// const dayString = (forecastArray, days) => {
// 	console.log("forecastArray", forecastArray);
// 	let dayStrang = '';
// 	var stop = 40;
// 	if (days === 3 ) {
// 		stop = 32;
// 	}
// 	for(let i = 8; i < stop; i=i+8) {
// 	  	dayStrang += `<div id="forcast-current" class="current col-sm-12 col-md-12 text-center">`;
// 	    dayStrang +=    `<h3>${forecastArray[i].name}</h3>`;
// 	    dayStrang +=    `<p>${forecastArray[i].main.temp}</p>`;// Temperature
// 	   	dayStrang +=    `<p>${forecastArray[i].weather["0"].description}</p>`;// Conditions
// 	    dayStrang +=    `<p>${forecastArray[i].main.pressure}</p>`;// Air pressure
// 	    dayStrang +=    `<p>${forecastArray[i].wind.speed}</p>`;// Wind speed
// 	    dayStrang +=  		`</div>`;
// 	}
// 		printToDom2(dayStrang);
// };

const dayString = (forecastArray, days) => { console.log("forecastArray", forecastArray, days);
	console.log(forecastArray.list["0"].dt_txt);
	console.log("from dom", forecastArray.length);
	let dayStrang = '';
	var stop = 40;

	if (days === 3 ) {
		stop = 32;
	}
	for(let i = 8; i < stop; i=i+8) {
		//console.log(forecastArray[i].dt_txt.slice(0, 10));
// 		forecastArray[i].dt_txt
						
		dayStrang += `<div class="col-sm-6 col-md-4 ">`;
	    dayStrang += 	`<div class="thumbnail">`;  
	    dayStrang +=  		`<div class="caption">`;
	    dayStrang += 			`<p>${forecastArray[i].dt_txt.slice(0, 10)}</p>`;
	    dayStrang +=			`<p>${forecastArray[i].main.temp}</p>`;
	    dayStrang += 		 `</div>`;
	    dayStrang +=  	`</div>`;
	    dayStrang +=  `</div>`;
	    // dayStrang +=  `</div>`;
	 }
	
		printToDom2(dayString);
		console.log(dayString);

};

const printToDom2 = (strang2) => {
	$("#forecast").append(strang2);
};

module.exports = {domString, dayString, clearDom};