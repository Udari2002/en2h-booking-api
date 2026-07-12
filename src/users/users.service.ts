import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // This creates a new user and hashes their password
  async create(email: string, pass: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  // This will be used by the Login system to check credentials
  async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}