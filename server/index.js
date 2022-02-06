// npm install express
//node. index.js   (starts machine-based server)
//npm install cors
//npm install body-parser

//have both client (App) and server running

//imports
const data = require("./database");
//required for setup and for methods get, post, patch, del
const express = require("express");
const co = require("cors"); //middleware
const bp = require("body-parser"); //another middleware

//more options...
const app = express();

app.use(bp.json());

//want this middleware to act before the app.gets
//have to enable cors in your APIs
app.use(co()); //more security

app.get("/api", (req, res) => {
  res.json({ message: "fahim says circle brackets ..." });
});

app.get("/db", (req, res) => {
  res.send(data);
});

app.listen(3001, () => {
  console.log("server started...");
});

//**Any changes to this will require re-running node index.js unless you install nodemon*/
