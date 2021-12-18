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
var axieRouter = require('./routes/game');
var kingdomRouter = require('./routes/game2');
var startkitRouter = require('./routes/startkit');
//var recommendRouter = require('./routes/recommend');


app.use("/", indexRouter);
app.use("/game", axieRouter);
//app.use("/recommend", recommendRouter);
app.use("/startkit", startkitRouter);
app.use("/game2",kingdomRouter);


app.listen(PORT, ()=>{
    console.log(`server is listening at port ${PORT}`);
})






