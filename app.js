// import express from "express";
const express = require("express");

//express app
const app = express();

//register view engine
app.set("view engine", "ejs");

//listen for request
app.listen(3000);

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
