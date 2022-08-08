import pkg from 'mongoose';
const {model, Schema} = pkg;

const UserSchema = new Schema({
   firstName: {type: String, require: true},
   lastName: {type: String, require: true},
   email: {type: String, unique: true, require: true},
   phoneNumber: {type: String, unique: true, require: true},
   events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});

export default model('User', UserSchema);