const cors = require("cors");
const express = require("express");
const app = express();
require('dotenv').config()
require("../config/dbConnection");

const category = require('./../routes/categoryRouter')
const product = require('./../routes/productRouter')
const user = require('./../routes/userRouter')
const upload = require('./../routes/uploadRouter')

const port = process.env.PORT || 5000;
const allowedOrigins = ["http://localhost:3000", "https://ecmf-project.vercel.app", "https://ecmf-project.vercel.app/", "https://vercel.com/trendlix", "https://vercel.com/trendlix/"];
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ecmf-project.vercel.app", "https://ecmf-project.vercel.app/", "https://vercel.com/trendlix", "https://vercel.com/trendlix/"],  
    credentials: true,
    exposedHeader: ["Authorization", 'Access-Control-Allow-Origin'],
  })
);
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Credentials", true);
  // res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use('/', product);
app.use('/', category)
app.use('/', user)
app.use('/', upload)
app.use('/public', express.static('public'))

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});
app.listen(port, console.log('working...'))

module.exports = app;