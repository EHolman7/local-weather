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