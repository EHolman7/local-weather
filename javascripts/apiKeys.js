"use strict";

const owm = require('./owm');

const apiKeys = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/apiKeys.json').done((data) => {
			resolve(data.apiKeys);
		}).fail((error) => {
			//console.log('api keys error!', error);
			reject(error);
		});
	});
};

const retrieveKeys = () => {
	apiKeys().then((results) => {
		owm.setKey(results.owm.apiKey);
	}).catch((error) => {
		console.log("error in retrieve keys", error);
	});
};

module.exports = {retrieveKeys};