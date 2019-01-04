const _	= require('lodash')
const mongoConnect = require('./mongo-connection.js')
const mongoose 	= require('mongoose')
const Campaign = buildSchema()

function buildSchema(){
	
	//build schema
	var campaignSchema = new mongoose.Schema({
		name: String,
		conversionType: String,
		bid: Number,
		country: String,
		os: String,
	});

	//compiling schema into a model
	return mongoose.model('campaing', campaignSchema);
}

function saveCampaign(campaign){

	var campaign = new Campaign(campaign)

	return new Promise(function (resolve, reject){
		campaign.save(function (err, camp) {
	    	if (err) {
	    		console.error(err)
	    		reject(err)
	    	}
	    	console.log('Campaign saved!')
	    	resolve(camp)
		})
	})
}

function fetchCampaign(fetch){

	return new Promise(function (resolve, reject){

		Campaign.find({country : fetch.geo, os : fetch.os}, function (err, campaigns) {

		   	if (err) {
		   		console.error(err)
		   		reject(err)
		   	}

		   	best_key = -1
		   	best_bid = 0
		   	_.forEach(campaigns, function(value, key){
		   		if(value.bid > best_bid) best_key = key
		   	})

		   	if(best_key == -1) resolve({})
		   	else resolve(campaigns[best_key])
		   	console.log(campaigns)
	 	})
	})
}

module.exports = {
	buildSchema,
	saveCampaign,
	fetchCampaign,
} 