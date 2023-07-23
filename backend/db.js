const env = require('dotenv').config();
const mongoose = require('mongoose');


const CONNECTION_STRING=process.env.CONNECTION_STRING;

const connectData=()=>{
    mongoose.connect(`${process.env.CONNECTION_STRING}`).then(()=>{
    console.log("connected successfully")
}).catch((err)=>{
    console.log(err);
});
}

module.exports=connectData;