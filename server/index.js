const newrelic = require('newrelic');
//SERVER - Express
const express = require('express');
//NOode - Path
const path = require('path');
//Logger - Morgan
// const morgan = require('morgan');
//Request - Parser
const bodyParser = require('body-parser');
//PG Interface(s)
const { Pool, Client } = require('pg')
//Caching agent - Redis
// const redis = require('redis');

//init serv
var app = express();
//assign port
const port = 3002;
//init moddleware
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
//init PG Client and connect
const client = new Client({
  user: 'jacksongalan',
  host: 'localhost',
  database: 'popularDishes',
  port: 5432,
})
client.connect(); 
//connect to redis process client
// const redisClient = redis.createClient();

//ROUTES
//serve static resources at /:id
// app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));//values after : appear in req.params
//test -- server can respond to a request
app.get('/test', (req, res) => {
    res.send("TEST!");
});
//get popular dish by restaurant id
app.get('/popular/:id',fetchDish);
//handle web requests

async function fetchDish(req, res) {
  //grab id from URL
  let id = req.params.id;//grabs value
  //populate query fields
  const query = {
    name: 'fetch-dish',
    text: `SELECT * FROM dish WHERE restaurantid = $1`,
    values: [id],
  }
  //perform query
  let receipt = await client.query(query);
  console.log(receipt.rows[0]);
  //confirm success
  res.end();
};

app.listen(port,() => console.log(`Example app listening on port ${port}!`));
