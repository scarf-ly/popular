const db = require('./index.js');
const faker = require('faker');
const mongoose = require('mongoose');

var popularDish = new mongoose.Schema({
    name: String,
    price: Number,
    revCount: Number,
    phoCount: Number,
    image: String,
  restuarantID: Number
});

var Dish = mongoose.model('Dish', popularDish);

var seed = function seedData() {

  var ranNum = function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
  };

  for (let i = 1; i < 100; i++) {
    var names = faker.lorem.word;
    var image1 = `https://popularlist.s3-us-w¬est-1.amazonaws.com/munch${ranNum(100)}.jpg`;

    var popDish = new Dish ({
        name: names(),
        price: ranNum(35),
        revCount: ranNum(30),
        phoCount: ranNum(200),
        image: image1,
        restuarantID: `${i}`
    });

    popDish.save(function (err){
      if (err) return console.error(err);
    })
  };
};

module.exports.Dish = Dish
