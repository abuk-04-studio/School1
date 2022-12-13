const mongoose = require("mongoose");


mongoose.connect('mongodb://127.0.0.1:27017/kurs',  {useNewUrlParser: true, useUnifiedTopology: true});


const schema = new mongoose.Schema({
    firstName: String,
    surName:  String,
    course: String,
    localization:String,
});


module.exports = mongoose.model('Kursy', schema);