import pkg from 'mongoose';
const {model, Schema} = pkg;

const UserSchema = new Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    phoneNumber: {type: String, unique: true, require: true},
    password: {type: String, require: true, min: 4, max: 25}
});

export default model('User', UserSchema);