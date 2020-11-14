import { Router } from 'express';
// import { uuid } from 'uuidv4';
// import { startOfHour, parseISO, isEqual } from 'date-fns';
import { startOfHour, parseISO } from 'date-fns';

// import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

// interface Appointment {
//   id: string;
//   provider: string;
//   date: Date;
// }

// This is telling that the type of appointments is an array of the interface
// Appointment
// const appointments: Appointment[] = [];

// Because on index.ts we have a route /appointments, which call this very
// Router() object here. Here, because the route is just /appointments, it
// is redirect to the root route
appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  // Convert the provided date and fix it to only hours
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;
