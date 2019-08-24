// jshint esversion: 6

// external modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


//Pre-defined content
let homeContent = "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.";
let contactContent = "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";
let port = 4000;
let options = {};
let posts = [];


app.get('/', (req, res) => {
  options = {
    homeContent: homeContent,
    pageTitle: "Tenner | Home",
    titleContent: "Title of a longer featured blog post",
    posts: posts
  };
  res.render('home', options);
});

app.get('/compose', (req, res) => {
  options = {
    pageTitle: "Tenner | Compose",
    titleContent: "Compose"
  }

  res.render('compose', options);
});

app.post('/compose', (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let category = req.body.category;

  let day = new Date();
  let now = day.toLocaleDateString('en-US', options);

  options = {
    month: 'long',
    day: 'numeric'
  }

  let post = {
    title: title,
    content: content,
    category: category,
    date: now
  };

  posts.push(post);

  res.redirect('/');
});


app.listen(port, () => console.log("Server listening on port " + port));
