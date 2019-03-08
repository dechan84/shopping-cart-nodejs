var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//encrypt the password
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema ({
    email:{
        type:String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }
});

//Encrypt the password and return it
userSchema.methods.encryptPassword = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}
//It will compare the encypted password algorithm sync with the one from user
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);