import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  userId: { type: String, required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  quantity: { type: Number, required: true },
}, { timestamps: true });

export default model('Booking', bookingSchema);
