const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// username, password, fname, lname,
const ContactSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    phone: { type: String, required: true },
});

module.exports = mongoose.model('Contact', ContactSchema);


