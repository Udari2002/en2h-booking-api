import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './booking.entity';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    ServicesModule // This allows us to check if the service exists!
  ],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}