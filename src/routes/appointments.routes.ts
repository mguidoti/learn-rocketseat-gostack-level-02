import { Router } from 'express';
// import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

// interface Appointment {
//   id: string;
//   provider: string;
//   date: Date;
// }

// This is telling that the type of appointments is an array of the interface
// Appointment
const appointments: Appointment[] = [];

// Because on index.ts we have a route /appointments, which call this very
// Router() object here. Here, because the route is just /appointments, it
// is redirect to the root route
appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  // Convert the provided date and fix it to only hours
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
