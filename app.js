// import express from "express";
const express = require("express");
const mongoose = require("mongoose");

const { render } = require("ejs");
const blogRoutes = require("./routes/blogRoutes");

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

//nlog routes
app.use("/blogs", blogRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("error", { title: "404" });
});
