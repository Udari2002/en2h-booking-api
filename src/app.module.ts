import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Load the .env file globally
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    // Configure the Database Connection
   TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      // Tell TypeScript to treat this as a string, or fall back to '5432'
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}