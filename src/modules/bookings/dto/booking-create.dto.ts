import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { BookingStatus } from 'src/common/enums/booking-status.enum';

export class CreateBookingDto {
    @ApiProperty({ description: 'User ID who is making the booking', example: '60d5f484f8a120001c8d4f6b' })
    @IsMongoId()
    user: string;

    @ApiProperty({ description: 'Ticket ID being booked', example: '60d5f484f8a120001c8d4f6c' })
    @IsMongoId()
    ticket: string;

    @ApiProperty({ description: 'Event ID associated with the booking', example: '60d5f484f8a120001c8d4f6d' })
    @IsMongoId()
    event: string;

    @ApiProperty({ description: 'Quantity of tickets booked', example: 2 })
    @IsNumber()
    quantity: number;

    @ApiProperty({ description: 'Status of the booking', enum: BookingStatus, default: BookingStatus.PENDING })
    @IsEnum(BookingStatus)
    status?: BookingStatus;
}
