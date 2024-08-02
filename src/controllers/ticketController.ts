import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Event from '../models/Event';

export const printTicket = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId).populate('eventId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const event = await Event.findById(booking.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json({
      message: 'Ticket',
      bookingId: booking._id,
      eventId: event._id,
      eventName: event.name,
      eventDate: event.date,
      quantity: booking.quantity,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to print ticket', error });
  }
};
