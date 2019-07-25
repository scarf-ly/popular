const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('../database/seed.js');
const Faker = require("faker");

var app = express();

const port = 3002;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/popular/:id', (req, res) => {                  
  db.Dish.find({ restuarantID: req.params.id }).limit(10).exec((err, Dish) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(Dish);
    }
  });
});

app.post('/popular/:id', async (req, res) => {
  let success = await initDish()
  res.send(success);
})
app.put('/popular/:id', async (req, res) => {
  let id = req.params;
  let success = await initDish(id);
  res.send(success);
})
app.delete('/popular/:id', async (req, res) => {
  //TODO
  try {
    let itemId = req.params.id;
    let success = await db.Dish.deleteOne({_id:itemId})
    res.send(success)
  } catch (err) {
    if (err) {
      console.error(err)
      res.end()
    }
  }
})

async function initDish(data) {
  let success = undefined;
  var names = Faker.lorem.word;

  if(data) {
    let id = data;
    let dish = new db.Dish({
      name: names(),
      price: 100,
      revCount: 100,
      phoCount: 300,
      imate: "URL",
      restaurantID: id
    })
    success = dish;
  } else {
    let dish = new db.Dish({
      name: names(),
      price: 100,
      revCount: 100,
      phoCount: 300,
      imate: "URL",
      restaurantID: 0
    })
    success = dish;
  }

  return success;
}

app.listen(port,() => console.log(`Example app listening on port ${port}!`));
