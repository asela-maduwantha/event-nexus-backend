import { Controller, Get, Post, Param, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './schemas/ticket.schema';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a ticket for a specific event' })
    @ApiBody({ type: CreateTicketDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The ticket has been successfully created.', type: Ticket })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Ticket of this type already exists for the event' })
    async createTicket(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
        return this.ticketsService.createTicket(createTicketDto);
    }

    @Get('event/:eventId')
    @ApiOperation({ summary: 'Retrieve all tickets for a specific event' })
    @ApiParam({ name: 'eventId', description: 'The ID of the event for which to retrieve tickets' })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of tickets retrieved successfully', type: [Ticket] })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No tickets found for the specified event' })
    async getTicketsByEventId(@Param('eventId') eventId: string): Promise<Ticket[]> {
        return this.ticketsService.getTicketsByEventId(eventId);
    }
}
