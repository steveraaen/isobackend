'use strict';
const yelp = require('yelp-fusion');
const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require('mysql');
const keys = require('./keys.js')
const app = express();
const client = yelp.client(keys.ylp);
// ------ Setup middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// ------ Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors())
app.get('/hotels', function(req, res) {
	 console.log(req.query.city, req.query.chain);	
	client.search({
/*	  term: JSON.stringify(req.query.chain),*/
	  location: JSON.stringify(req.query.city),
	  categories: 'hotels',
	  limit:50

		})
	.then(response => {
			var val = response.jsonBody.businesses
		  res.json(val)
		})
	.catch(e => {
		  console.log(e);
});
})
app.get('/details', function(req, res) {
	 console.log(req.query.longitude, req.query.latitude);
var test = req.query
	client.search({	  
	  longitude: req.query.longitude,
	  latitude: req.query.latitude,
	  radius: 1000,
	  limit: 50,
	  categories: 'restaurants',
	  rating: '3,4,5',
	  price: '1,2,3,4'
		})
	.then(response => {
			var val = response.jsonBody.businesses
		 console.log(req.query)
		  res.json(val)
		})
	.catch(e => {
		  console.log(e);
});
})

const port = process.env.PORT || 5001;
app.listen(port);
console.log(`Listening on ${port}`);
//-----------------------------------
