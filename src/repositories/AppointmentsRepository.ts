import { isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  // This variable isn't accessible outside the class, that's why the 'private'
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  // The : Appointment is indicating that the return type will be Appointment
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  // Return types Appointment OR null
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public all(): Appointment[] {
    return this.appointments;
  }
}

export default AppointmentsRepository;
