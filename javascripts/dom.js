// "use strict";

// const domString = (weatherArray) => {
// 	console.log("weatherArray", weatherArray);
// 	let domStrang = "";
// 		if (i % 3 === 0){
// 			domStrang += `<div class="row">`;	
// 		}
// 		domStrang += `<div class="col-sm-6 col-md-4">`;
// 		domStrang += 	`<div class="thumbnail">`;
// 		domStrang += 		`<img src="${imgConfig.base_url}/w342/${movieArray[i].poster_path}" alt="...">`;
// 		domStrang += 		`<div class="caption">`;
// 		domStrang += 			`<h3>${movieArray[i].original_title}</h3>`;
// 		domStrang += 			`<p>${movieArray[i].overview}</p>`;
// 		domStrang += 			`<p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default" role="button">Watchlist</a></p>`;
// 		domStrang += 			`</div>`;
// 		domStrang += 		`</div>`;
// 		domStrang += 	`</div>`;
// 		if (i % 3 === 2 || i === movieArray.length - 1){
// 		domStrang += `</div>`;	
// 		}
// 	printToDom(domStrang);
// };

// const printToDom = (strang) => {
// 	$("#weather").append(strang);
// };

// const clearDom = () => {
// $('#weather').empty();
// };

// module.exports = {domString, clearDom};