const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"general"
    }
},
{
    timestamps:true
});

module.exports=mongoose.model("Note",notesSchema);