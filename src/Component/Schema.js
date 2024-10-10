const mongoose = require('mongoose');
const schema= mongoose.Schema({
    id: { type: String, required: true, unique: true },  
    id:String,
    name:String,
    description:String,
    url:String,
    category:String,
    language:String,
    country:String
});

module.exports= mongoose.model("news",schema)