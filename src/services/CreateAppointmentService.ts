import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import { startOfHour } from "date-fns";

/**
 * [X] Recebimento das informaçoẽs
 * [X] Tratativa de errros/excessões
 * [X] Acesso ao repositório
 */

interface Request {
  provider: string;
  date: Date;
}

/**
 * Dependency Inversion (SOLID)
 */

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointInSameDate) {
      throw Error("This appointment is already booked!");
    }

    console.log(findAppointInSameDate);

    const appointment = this.appointmentsRepository.create({
      provider,
      date,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
