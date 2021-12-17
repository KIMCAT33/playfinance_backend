const mongoose = require('mongoose')
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        // useCreateIndex: true,  (Error)
        });   
        console.log('MongoDB connected...');
    }catch(error){
        console.log("connection failed");
    };
}

module.exports = connectDB;