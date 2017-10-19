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