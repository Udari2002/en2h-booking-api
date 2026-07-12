import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from './booking.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // PUBLIC ENDPOINT - Anyone can book!
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  // PROTECTED ENDPOINTS - Only admins/staff
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: BookingStatus,
  ) {
    return this.bookingsService.updateStatus(+id, status);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/cancel')
  cancelBooking(@Param('id') id: string) {
    return this.bookingsService.updateStatus(+id, BookingStatus.CANCELLED);
  }
}