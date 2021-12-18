const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");



const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();
app.use(express.json({extneded: false}));

var cors = require('cors');
app.use(cors());


var indexRouter = require('./routes/index');
var axieRouter = require('./routes/axies');
var startkitRouter = require('./routes/startkit');
//var homeRouter = require('./routes/home');
//var recommendRouter = require('./routes/recommend');

//var airdropRouter = require('./routes/airdrop');


app.use("/", indexRouter);
app.use("/axies", axieRouter);
//app.use("/home", homeRouter);
//app.use("/recommend", recommendRouter);
app.use("/startkit", startkitRouter);
//app.use("/airdrop", airdropRouter);


app.listen(PORT, ()=>{
    console.log(`server is listening at port ${PORT}`);
})






