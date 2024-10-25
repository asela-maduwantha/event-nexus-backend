import { DatabaseConfig } from './config/database.config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthService } from './modules/auth/auth.service';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),    
    DatabaseConfig,UsersModule, AuthModule, EventsModule, TicketsModule, BookingsModule, PaymentsModule, AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
