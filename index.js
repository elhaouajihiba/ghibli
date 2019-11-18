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

app.get('/Miyazaki', function (req, res) {
  res.render("ModelePage.hbs", {
    illustration : {
      path: "photos/Chihiro6.jpeg"
    },
    content : {
      text : ["paragraphe1", "paragraphe2"]
    }
  });
})

app.get('/Chihiro', function (req, res) {
  res.render("ModelePage.hbs", {
    illustration : {
      path: "photos/Chihiro6.jpeg"
    },
    content : {
      text : ["paragraphe1", "paragraphe2"]
    }
  });
})

app.get('/Chateau', function (req, res) {
  res.render("ModelePage.hbs", {
    illustration : {
      path: "photos/Chihiro6.jpeg"
    },
    content : {
      text : ["paragraphe1", "paragraphe2"]
    }
  });
})

app.get('/Totoro', function (req, res) {
  res.render("ModelePage.hbs", {
    illustration : {
      path: "photos/Chihiro6.jpeg"
    },
    content : {
      text : ["paragraphe1", "paragraphe2"]
    }
  });
})

app.get('/Mononoke', function (req, res) {
  res.render("ModelePage.hbs", {
    illustration : {
      path: "photos/Chihiro6.jpeg"
    },
    content : {
      text : ["paragraphe1", "paragraphe2"]
    }
  });
})

app.get('/Ponyo', function (req, res) {
  res.render("ModelePage.hbs", {
    illustration : {
      path: "photos/Chihiro6.jpeg"
    },
    content : {
      text : ["paragraphe1", "paragraphe2"]
    }
  });
})

app.get('/Terremer', function (req, res) {
  res.render("ModelePage.hbs", {
    illustration : {
      path: "photos/Chihiro6.jpeg"
    },
    content : {
      text : ["paragraphe1", "paragraphe2"]
    }
  });
})


app.get('/*', function (req, res) {
  res.render("PageWeb.hbs", {});
})

app.listen(3000, function () {
  console.log('Application qui écoute sur le port 3000!');
})
