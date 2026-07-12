import { IsString, IsEmail, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  customerName!: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  customerEmail!: string;

  @ApiProperty({ example: '555-0123' })
  @IsString()
  customerPhone!: string;

  @ApiProperty({ example: 1, description: 'The ID of the service being booked' })
  @IsNumber()
  serviceId!: number;

  @ApiProperty({ example: '2026-07-20', description: 'Cannot be in the past' })
  @IsDateString()
  bookingDate!: string;

  @ApiProperty({ example: '14:30' })
  @IsString()
  bookingTime!: string;

  @ApiProperty({ required: false, example: 'Looking forward to the premium wash!' })
  @IsOptional()
  @IsString()
  notes?: string;
}