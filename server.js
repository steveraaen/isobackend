'use strict';
const yelp = require('yelp-fusion');
const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser')
/*const getYelp = require('./yelpers.js')*/
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


app.get('/hotels', function(req, res) {
	 console.log(req.query.city, req.query.chain);	
	client.search({
	  term: JSON.stringify(req.query.chain),
	  location: JSON.stringify(req.query.city),
	  categories: 'hotels'

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

	client.search({	  
	  longitude: req.query.longitude,
	  latitude: req.query.latitude,
	  radius: 1000,
	  limit: 50,
	  categories: 'restaurants',
	  rating: '3, 4, 5',
	  sort_by: 'distance'
		})
	.then(response => {
			var val = response.jsonBody.businesses
		 
		  res.json(val)
		})
	.catch(e => {
		  console.log(e);
});
})
const port = process.env.PORT || 5001;
app.listen(port);
console.log(`Listening on ${port}`);




















