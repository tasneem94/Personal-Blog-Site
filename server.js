import http from "http";
import fs from "fs/promises";
import _ from "lodash";
// const http = require("http");
// const fs = require("fs").promises;

const randomNum = _.random(0, 100);
console.log(randomNum);

const server = http.createServer(async (req, res) => {
  console.log(req.url, req.method);

  // Set header content type
  res.setHeader("Content-Type", "text/html");

  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;

      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;

      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("location", "/about");
      res.end();
      break;
    default:
      path += "error.html";
      res.statusCode = 404;
  }

  try {
    const data = await fs.readFile(path);
    res.end(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.end("<h1>Server Error</h1>");
  }
});

server.listen(3000, "localhost", () => {
  console.log("Listening for requests on port 3000");
});
