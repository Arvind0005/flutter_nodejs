const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = Schema({
    name:
    {
        type: String,
        required:true,
    },
    password:
    {
        type:String,
        required:true,
    }
}
);

const User = mongoose.model('users',authSchema);

module.exports = User;