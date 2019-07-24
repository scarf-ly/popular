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
  console.log("/popular REQ")                   
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
  //TODO
  //shape
  var names = Faker.lorem.word;

  var dish = new db.Dish ({
    name: names(),
    price: 100,
    revCount: 100,
    phoCount: 300,
    image: "URL",
    restuarantID: 43
  });
  //save
  let receipt = await dish.save();
  res.send(receipt);
})
app.put('/popular/:id', (req, res) => {
  //TODO
  let id = req.params;
  db.findOneAndUpdate({restaurantID:id})
  res.end()
})
app.delete('/popular/:id', (req, res) => {
  //TODO
  let id = req.params;
  db.deleteOne({restaurantID:id})
  res.end()
})
app.listen(port,() => console.log(`Example app listening on port ${port}!`));
