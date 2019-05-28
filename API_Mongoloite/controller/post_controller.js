const express = require("express");
const Post = require("../models/post_model.js"); //include post schema
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.json());

module.exports.showIndex = (req, res, next) => {
  res.send("running node api");
};

module.exports.addPost = (req, res, next) => {
  const post = new Post({
    title: "po",
    description: "dd",
    image: "qq"
  });
  post.save(function(err, post) {
    if (err) return console.error(err);
    res.send(post);
  });
};

exports.showPost = (req, res, next) => {
  Post.find() //fetches all the posts
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.singlePost = (req, res, next) => {
  Post.findById(req.params.id) //filters the posts by Id
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.updatePost = (req, res, next) => {
  Post.findById(req.body.id)
    .then(result => {
      result.title = req.body.title;
      result.description = req.body.description;
      result.image = req.body.image;
    })
    .then(() => {
      res.send("post updated successfully");
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.deletePost = (req, res, next) => {
  Post.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send("post deleted");
    })
    .catch(err => res.status(400).send(err));
};
