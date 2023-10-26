const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');


mongoose.connect("mongodb+srv://gbUser:vi3hUNMrcYbeyvIV@meanstackcluster.yw9vmv7.mongodb.net/node-angular?retryWrites=true&w=majority").then(()=>{
  console.log("Connected to DB!");
})
.catch(()=>{
  console.log("Connection failed!");
})
app.use(bodyParser.json());

app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', "GET, POSTS, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts', (req, res, next) => {
  const posts = new Post({
    title : req.body.title,
    content : req.body.content
  });

  posts.save().then(result => {
    res.status(201).json({
      message : "Post submission successful!",
      postId : result._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
 Post.find().then(documents=>{
  res.status(200).json({
    message : 'Posts fetched successfully',
      response : documents
    });
 });
});

app.delete("/api/posts/:id",(req, res, next) => {
  console.log("postId in backened file")
  console.log("id",req.params.id);
  Post.deleteOne({_id : req.params.id }).then(result => {
    console.log("Post Deleted in backened file")
    res.status(200).json({
      message  : 'Post Deleted'
    });
  })
});

module.exports = app;