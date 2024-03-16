// import express from "express";
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

//express app
const app = express();

const dbURI =
  "mongodb+srv://tasneemsakif31:blog310397@cluster-blog.7dodqmo.mongodb.net/blogs-database?retryWrites=true&w=majority&appName=Cluster-blog";

mongoose
  .connect(dbURI)
  .then((res) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//middleware static files
app.use(express.static("public"));

//mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New Blog 2",
    snippet: "about my new blog",
    body: "Deatils abot my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      comsole.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("65f57095f838f205cf10a309")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      comsole.log(err);
    });
});

//

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "X plays football",
      snippet: "lorem ipsum dolor sit amet consecetur",
    },
    {
      title: "Y catches bird",
      snippet: "lorem ipsum dolor sit amet consecetur",
    },
    {
      title: "X drives a car",
      snippet: "lorem ipsum dolor sit amet consecetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a New Blog" });
});

app.use((req, res) => {
  res.status(404).render("error", { title: "404" });
});
