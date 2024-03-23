// import express from "express";
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { render } = require("ejs");

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
app.use(express.urlencoded({ extended: true }));

//testing
app.use((req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  next();
});
//

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a New Blog" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Blog details", blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.status(404).render("error", { title: "404" });
});
