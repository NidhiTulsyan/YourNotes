const mongoose = require('mongoose');

const CONNECTION_STRING='mongodb+srv://admin:admin@cluster0.l0qqagu.mongodb.net/iNoteBookDb?retryWrites=true&w=majority'
const connectData=()=>{
    mongoose.connect(CONNECTION_STRING).then(()=>{
    console.log("connected successfully")
}).catch((err)=>{
    console.log(err);
});
}

module.exports=connectData;