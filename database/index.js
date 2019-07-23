var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/munch-popular', {useNewUrlParser: true});

db.on('error', console.error.bind(console, 'connection error:'));