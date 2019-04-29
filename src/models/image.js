const mongoose = require('mongoose');
const {Schema} = mongoose;

const imageSchema = new Schema({
    name: String,
    title:{type:String},
    cat:{type:String},
    projLink:{type:String},
    description:{type:String},
    route:{type:String},
    extension:{type:String, require:true},
    code: {type:Number}
    
});

module.exports = mongoose.model('image',imageSchema);