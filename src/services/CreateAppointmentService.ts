import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import AppError from '../errors/AppError';

interface RequestDTO {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  // private appointmentsRepository: AppointmentsRepository;

  // constructor(appointmentsRepository: AppointmentsRepository) {
  //   this.appointmentsRepository = appointmentsRepository;
  // }

  public async execute({ date, providerId }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
