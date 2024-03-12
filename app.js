// import express from "express";
const express = require("express");

//express app
const app = express();

//register view engine
app.set("view engine", "ejs");

//listen for request
app.listen(3000);

app.get("/", (req, res) => {
  //   res.send("<p>This is home page</p>");
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  //   res.send("<p>This is home page</p>");
  res.sendFile("./views/about.html", { root: __dirname });
});

app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  res.status(404).sendFile("./views/error.html", { root: __dirname });
});
