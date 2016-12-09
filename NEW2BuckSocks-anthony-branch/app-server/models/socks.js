var mongoose = require('mongoose');

module.exports = mongoose.model('Sock', {
    title: String,
    Picture: String,
    Description: String
    // id: String
});