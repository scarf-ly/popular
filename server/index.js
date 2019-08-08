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
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
  // extended: true,
// }));
//init PG Client and connect
const client = new Client({
  user: 'power_user',
  host: 'ec2-18-221-161-158.us-east-2.compute.amazonaws.com',
  database: 'postgres',
  password: "password",
  port: 5432,
})
client.connect(); 
app.get('/test', (req, res) => {
  res.send('Hello, World');
});

//get popular dish by restaurant id
app.get('/popular/:id',fetchDish);
app.get('/restaurant/:id', fetchRestaurant);

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
async function fetchRestaurant(req, res) {
  //grab id from URL
  let id = req.params.id;//grabs value
  console.log(id);
  //populate query fields
  const query = {
    name: 'fetch-restaurant',
    text: `SELECT * FROM restaurant WHERE id = $1`,
    values: [id],
  }
  //perform query
  let receipt = await client.query(query);
  console.log(receipt.rows[0]);
  //confirm success
  res.end();
};


app.listen(port,() => console.log(`Example app listening on port ${port}!`));
