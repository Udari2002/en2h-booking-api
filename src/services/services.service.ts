import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = this.servicesRepository.create(createServiceDto);
    return this.servicesRepository.save(newService);
  }

  // GET ALL
  async findAll(): Promise<Service[]> {
    return this.servicesRepository.find();
  }

  // GET BY ID
  async findOne(id: number): Promise<Service> {
    const service = await this.servicesRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  // UPDATE
  async update(id: number, updateData: Partial<CreateServiceDto>): Promise<Service> {
    await this.servicesRepository.update(id, updateData);
    return this.findOne(id); // Returns the updated service
  }

  // DELETE
  async remove(id: number): Promise<void> {
    await this.servicesRepository.delete(id);
  }
}