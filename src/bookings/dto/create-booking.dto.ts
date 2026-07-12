import { IsString, IsEmail, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  customerName!: string;

  @IsEmail()
  customerEmail!: string;

  @IsString()
  customerPhone!: string;

  @IsNumber()
  serviceId!: number;

  @IsDateString()
  bookingDate!: string;

  @IsString()
  bookingTime!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}