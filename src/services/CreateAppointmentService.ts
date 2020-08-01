import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findAppointInSameDate = await appointmentsRepository.findByDate(date);

    if (findAppointInSameDate) {
      throw Error('This appointment is already booked!');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
