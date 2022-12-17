const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
var db;

const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs');
app.use(express.static('public'));

MongoClient.connect("mongodb+srv://tkdsk0:hallym@cluster0.umjnnut.mongodb.net/?retryWrites=true&w=majority", function (err, client) {
  if (err) return console.log(err)
  db = client.db('nodejs');
  console.log('DB connected')

  app.listen(8080, function () {
    console.log('listening on 8080')
  })
})

app.get('/', function (req, res) {
  res.render('index.ejs', { })
})

app.get('/map', function (req, res) {
  db.collection('review').find().toArray(function (err, result) {
    console.log(result);
    res.render('map.ejs', { loginfo: result })
  })
})

app.get('/about', function (req, res) {
  res.render('about.ejs', { })
})

app.post('/add', function (req, res) {
  db.collection('review').insertOne({ name: req.body.name, content: req.body.review, rating: req.body.rating }, function (err, result) {
    if (err) return console.log(err)
    console.log('save complete')
    res.render('after_review.ejs', {})
  });
});

app.get('/review', function (req, res) {
  db.collection('review').find().toArray(function (err, result) {
    console.log(result);
    res.render('reviews.ejs', { loginfo: result })
  })
})