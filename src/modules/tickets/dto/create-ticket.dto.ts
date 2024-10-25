// tickets/dto/create-ticket.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { TicketType } from 'src/common/enums/ticket-type.enum';

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
}
