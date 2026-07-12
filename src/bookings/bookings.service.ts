import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ServicesService } from '../services/services.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private servicesService: ServicesService,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    // Rule 1: A booking must belong to an existing service
    const service = await this.servicesService.findOne(createBookingDto.serviceId);
    if (!service) {
      throw new NotFoundException('The requested service does not exist.');
    }

    // Rule 2: Booking dates cannot be in the past
    const bookingDate = new Date(createBookingDto.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate day comparison

    if (bookingDate < today) {
      throw new BadRequestException('Booking dates cannot be in the past.');
    }

    const newBooking = this.bookingsRepository.create(createBookingDto);
    return this.bookingsRepository.save(newBooking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find();
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async updateStatus(id: number, status: BookingStatus): Promise<Booking> {
    const booking = await this.findOne(id);

    // Rule 3: Cancelled bookings cannot be marked as completed
    if (booking.status === BookingStatus.CANCELLED && status === BookingStatus.COMPLETED) {
      throw new BadRequestException('Cancelled bookings cannot be marked as completed.');
    }

    booking.status = status;
    return this.bookingsRepository.save(booking);
  }
}