import { Request, Response } from 'express';
import Event from '../models/Event';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, date, totalTickets } = req.body;
    const event = new Event({ name, date, totalTickets });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event', error });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve events', error });
  }
};

export const getEventDetails = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve event details', error });
  }
};
