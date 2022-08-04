import pkg from 'mongoose';
const {model, Schema} = pkg;

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "Auth"},
    refreshToken: {type: String}
});

export default model('Token', TokenSchema);