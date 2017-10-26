"use strict";

//let dom = require("./dom");

let events = require('./events');
let apiKeys = require('./apiKeys');
let owm = require('./owm');

apiKeys.retrieveKeys();

// $(document).click(() => {
// 	owm.searchOWM(37217);
// });

 events.pressEnter();
 events.pressSubmit();
 //events.forecast();