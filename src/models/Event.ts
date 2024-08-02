import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  totalTickets: { type: Number, required: true },
  bookedTickets: { type: Number, default: 0 },
}, { timestamps: true });

export default model('Event', eventSchema);
