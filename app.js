var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();


app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {

   console.log(req.query)
    var queryString = req.query.term;
    // ENCODE THE QUERY STRING TO REMOVE WHITE SPACES AND RESTRICTED CHARACTERS
    var term = encodeURIComponent(queryString);
    // PUT THE SEARCH TERM INTO THE GIPHY API SEARCH URL
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

    http.get(url, function(response) {
      response.setEncoding('utf8');

      var body = '';

      response.on('data', function(d){
        body += d;
      });

    response.on('end', function() {
      var parsed = JSON.parse(body);
      res.render('home', {gifs: parsed.data})
      });
    });
  });

  app.get('/', function (req, res) {
    giphy.search(req.query.term, function (err, response) {
      res.render('home', {gifs: response.data})
    });
  });

  app.get('/', function (req, res) {
    giphy.search(req.query.term, function (err, response) {
      res.render('home', {gifs: response.data})
    });
  });

app.get('/greetings/:name', function (req, res){
  var name = req.params.name;
  res.render('greetings', {name: name});
})

app.get('/hello-gif', function (req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl})
})

app.listen(3000, function() {
  console.log('Gif Search listening on port localhost:3000!');
});