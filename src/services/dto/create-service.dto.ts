import { IsString, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Premium Car Wash' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Full exterior and interior detail' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 60 })
  @IsNumber()
  @Min(1)
  duration!: number;

  @ApiProperty({ example: 49.99 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ required: false, example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}