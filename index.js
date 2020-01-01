const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const movies=require("./movies.js");

app.use(express.static('public'));

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/',
}));
app.set('view engine', 'hbs');

app.get('/Home', function (req, res) {
  res.render("PageWeb.hbs", {});
})

app.get('/login',function (req, res) {
  res.render("form.hbs", {});
})


app.get('/film/:name', function (req, res) {
  let movieName = req.params.name;

  console.log(movies[movieName]);

  if (movies[movieName] == undefined) {
    res.sendStatus(404);
    return ;
  }
  res.render("movie.hbs", movies[movieName]);
})

app.get('/*', function (req, res) {
  res.render("pageweb.hbs", {});
})

app.listen(3000, function () {
  console.log('Application qui écoute sur le port 3000!');
})
