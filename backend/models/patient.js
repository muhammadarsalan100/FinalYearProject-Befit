var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var Patient = new Schema({
    name: {
        type: String,
        required:true
    },
    email:{
        type:String
    },
    phoneNo:Number,
    cnic: {
        type: Number
    },
    address:{
        type:String
    },
    gender:{
        type:String
    },
    Dob:{
        type:Date
    },
    Age:{
        type:Number
    }
});

module.exports = mongoose.model('Patient', Patient);