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
let homeContent = "Get Started. Post your content and view replies and suggestions. Watch your friends comment on your latest blogs and create your own conversation on Tenner Blog.";
let contactContent = "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";
let port = 4000;
let options = {};
let posts = [];


app.get('/', (req, res) => {
  options = {
    homeContent: homeContent,
    pageTitle: "Tenner | Home",
    titleContent: "Get the best content on Tenner",
    // Title of a longer featured blog post
    posts: posts
  };
  res.render('home', options);
});

app.get('/posts/:topic', (req, res) => {
  let requestedTopic = req.params.topic;

  posts.forEach((post) => {
    let requiredTitle = post.title;
    if (_.kebabCase(requestedTopic) == _.kebabCase(requiredTitle)) {
      options = {
        pageTitle: "Posts | Tenner",
        topic: requestedTopic,
        content: post.content
      }
      res.render('post', options);
    } else {
      console.log('Error: Could not render post. Requested Topic: ' + post.title + " Required Topic: " + requiredTitle);
      res.redirect('/');
    }
  });
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
  let summary = req.body.summary;
  options = {
    month: 'short',
    day: 'numeric'
  }

  let day = new Date();
  let now = day.toLocaleDateString('en-US', options);

  let post = {
    title: title,
    content: content,
    category: category,
    summary: summary,
    date: now
  };

  posts.push(post);

  res.redirect('/');
});


app.listen(port, () => console.log("Server listening on port " + port));
