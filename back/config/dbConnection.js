const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(`mongodb+srv://LgTv:${process.env.Mongodb_Pass}@ecmf.serebvg.mongodb.net/?retryWrites=true&w=majority`);