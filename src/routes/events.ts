import express from 'express';
import eventRoutes from '../routes/events';
import { createEvent, getEvents, getEventDetails } from '../controllers/eventController';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id', getEventDetails);

export default router;
