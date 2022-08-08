import pkg from 'mongoose';
const {model, Schema} = pkg;

const EventSchema = new Schema({
   user: {type: Schema.Types.ObjectId, ref: 'User', require: true},
   title: {type: String, require: true},
   description: {type: String, require: true},
   startDate: {type: Date, require: true},
   endDate: {type: Date, require: true}
});

export default model('Event', EventSchema);