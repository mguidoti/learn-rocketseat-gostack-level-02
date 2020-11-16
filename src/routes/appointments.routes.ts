import { Router } from 'express';
// import { uuid } from 'uuidv4';
// import { startOfHour, parseISO, isEqual } from 'date-fns';
// import { startOfHour, parseISO } from 'date-fns';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';

// import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router();

// This means that it will use the middleware for all of the routes in this file.
// We can pass this for routes individually too.
appointmentsRouter.use(ensureAuthenticated);

// const appointmentsRepository = new AppointmentsRepository();

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
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { providerId, date } = request.body;

    // Convert the provided date and fix it to only hours
    // This is part of the 'Regra de Negocio'. Splitting parseISO from startOfHour
    // is, therefore, necessary to have the services right
    // const parsedDate = startOfHour(parse(date));
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    // const appointmentDate = startOfHour(parsedDate);

    // const findAppointmentInSameDate = appointmentsRepository.findByDate(
    //   parsedDate,
    // );

    // if (findAppointmentInSameDate) {
    //   return response
    //     .status(400)
    //     .json({ message: 'This appointment is already booked' });
    // }

    // const appointment = appointmentsRepository.create({
    //   provider,
    //   date: parsedDate,
    // });

    const appointment = await createAppointment.execute({
      date: parsedDate,
      providerId,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  // const appointments = appointmentsRepository.all();
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

export default appointmentsRouter;
