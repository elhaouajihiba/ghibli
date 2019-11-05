const express = require('express');
const hbs = require('express-handlebars');
const app = express();

app.use(express.static('public'));

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/',
}));
app.set('view engine', 'hbs');

app.get('/film', function (req, res) {
  res.render("Chihiro.hbs", {
    illustration : {
      path: "photos/Chihiro6.jpeg"
    }
  });
})

app.get('/*', function (req, res) {
  res.render("PageWeb.hbs", {});
})

app.listen(3000, function () {
  console.log('Application qui écoute sur le port 3000!');
})
