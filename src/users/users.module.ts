import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register the User entity here
  providers: [UsersService],
  exports: [UsersService], // Export it so the Auth module can use it later!
})
export class UsersModule {}