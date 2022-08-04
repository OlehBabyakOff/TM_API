import pkg from 'mongoose';
const {model, Schema} = pkg;

const AuthSchema = new Schema({
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true, min: 4, max: 25}
});

export default model('Auth', AuthSchema);