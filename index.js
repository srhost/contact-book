var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// DB setting
console.log(process.env.MONGODB);
mongoose.connect(process.env.MONGODB, { useMongoClient: true });
var db = mongoose.connection;
db.once('open', function() {
  console.log("DB connected");
});
db.on('error', function(err) {
  console.log("DB ERROR : ", err);
});

// Other Setting
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contact'));

app.listen(process.env.PORT || 3000, function() {
  console.log('server on!!');
});