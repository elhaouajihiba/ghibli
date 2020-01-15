const express = require('express');
const hbs = require('express-handlebars');
const movies = require("./movies.js");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");

// Initialiser le serveur Mongo
InitiateMongoServer();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());


app.use(express.static('public'));



app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/',
}));

app.set('view engine', 'hbs');

app.get('/Home', function (req, res) {
  res.render("pageweb.hbs", {});
})
app.get('/galerie', function (req, res) {
  res.render("galerie.hbs", {});
})
app.get('/apropos', function (req, res) {
  res.render("apropos.hbs", {});
})
app.get('/film/apropos', function (req, res) {
  res.render("apropos.hbs", {});
})
app.get('/film/galerie', function (req, res) {
  res.render("galerie.hbs", {});
})

app.get('/login',function (req, res) {
  res.render("form.hbs", {});
})

app.get('/Miyazaki', function (req, res) {
  res.render("Miyazaki.hbs", {});
})

app.get('/film/:name', function (req, res) {
  let movieName = req.params.name;

  console.log(movies[movieName]);

  if (movies[movieName] == undefined) {
    res.sendStatus(404);
    return ;
  }
  res.render("movies.hbs", movies[movieName]);
})

app.use("/user", user);

app.get('/*', function (req, res) {
  res.render("pageweb.hbs", {});
})
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
