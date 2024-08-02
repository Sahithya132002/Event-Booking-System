import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Event from '../models/Event';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, eventId, quantity } = req.body;
    if (quantity > 15) return res.status(400).json({ message: 'Cannot book more than 15 tickets at once' });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.totalTickets - event.bookedTickets < quantity) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    event.bookedTickets += quantity;
    await event.save();

    const booking = new Booking({ userId, eventId, quantity });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const event = await Event.findById(booking.eventId);
    if (event) {
      event.bookedTickets -= booking.quantity;
      await event.save();
    }

    res.json({ message: 'Booking canceled' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel booking', error });
  }
};
