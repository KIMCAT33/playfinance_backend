const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();
app.use(express.json({extneded: false}))


var cors = require('cors');
app.use(cors());


var indexRouter = require('./routes/index');
//var homeRouter = require('./routes/home');
//var recommendRouter = require('./routes/recommend');
//var startkitRouter = require('./routes/startkit');
//var airdropRouter = require('./routes/airdrop');


app.use("/", indexRouter);
//app.use("/home", homeRouter);
//app.use("/recommend", recommendRouter);
//app.use("/startkitRouter", startkitRouter);
//app.use("/airdrop", airdropRouter);


app.listen(PORT, ()=>{
    console.log(`server is listening at port ${PORT}`);
})






