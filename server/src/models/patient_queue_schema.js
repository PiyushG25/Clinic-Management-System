const mongoose = require('mongoose');

const queue_schema = new mongoose.Schema({
    time:
    {
        type:String,
        default: Date.now()
    },
    token_no:{
        type:Number
    },
    patient_id:{
        type:String,
        required:true
    },
    patient_name:{
        type:String,
        required:true,
        lowercase:true
    },
    complaint:{
        type:String,
        lowercase:true
    },
    queuetype:{
        type:String,
        lowercase:true,
        default: "waiting"
    }
});

module.exports = mongoose.model("waiting", queue_schema);