import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'eventNexus', 
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }, 
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
