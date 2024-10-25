import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TicketType } from 'src/common/enums/ticket-type.enum';
import {Schema as MongooseSchema } from 'mongoose';


export class CreateTicketDto {
    @ApiProperty({ description: 'Type of ticket', enum: TicketType })
    @IsEnum(TicketType)
    @IsNotEmpty()
    type: TicketType;

    @ApiProperty({ description: 'Price of the ticket', example: 50 })
    @IsNumber()
    price: number;

    @ApiProperty({ description: 'Total quantity of tickets available', example: 100 })
    @IsNumber()
    quantity: number;

    @ApiProperty({ description: 'Available quantity of tickets available', example: 100 })
    @IsNumber()
    availableQuantity: number;

    @ApiProperty({description: 'Event ID of the event that tickets belongs'})
    @IsString()
    event: MongooseSchema.Types.ObjectId;
}
