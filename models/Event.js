import pkg from 'mongoose';
const {model, Schema} = pkg;

const EventSchema = new Schema({
   user: {type: Schema.Types.ObjectId, require: true},
   title: {type: String, require: true},
   description: {type: String, require: true},
   startDate: {type: Date, require: true, default: new Date()},
   endDate: {type: Date, require: true, default: new Date("05/05/2022")}
});

export default model('Event', EventSchema);