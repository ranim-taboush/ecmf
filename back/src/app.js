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

app.use(
  cors({
    origin: ["http://localhost:3000", "https://ecmf-project.vercel.app"],
    credentials: true,
    exposedHeader: ['set-cookie']
  })
);
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use('/', product);
app.use('/', category)
app.use('/', user)
app.use('/', upload)
app.use('/images', express.static('images'))

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

module.exports = app;