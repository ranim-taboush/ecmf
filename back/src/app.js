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
const allowedOrigins = ["*", "http://localhost:3000", "https://ecmf-project.vercel.app", "https://ecmf-project.vercel.app/", "https://vercel.com/trendlix", "https://vercel.com/trendlix/"];
app.use(
  cors({
    origin: function(origin, callback){
      if (!origin) {
        return callback(null, true);
      }
  
      if (allowedOrigins.includes(origin)) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },  
    credentials: true,
    exposedHeader: ["Authorization", 'Access-Control-Allow-Origin'],
  })
);
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use('/data/v1/', product);
app.use('/data/v1/', category)
app.use('/data/v1/', user)
app.use('/data/v1/', upload)
app.use('/data/v1/images', express.static('images'))

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

module.exports = app;