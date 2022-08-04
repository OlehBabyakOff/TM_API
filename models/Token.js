import pkg from 'mongoose';
const {model, Schema} = pkg;

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    refreshToken: {type: String}
});

export default model('Token', TokenSchema);