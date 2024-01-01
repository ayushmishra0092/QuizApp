const mongoose = require('mongoose');
const mongoURI="mongodb+srv://deepakpatidar1257:Deepak1257@cluster0.3ajnym5.mongodb.net/quiz_app";
require("dotenv").config();
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully ");
    })
}
module.exports = connectToMongo;