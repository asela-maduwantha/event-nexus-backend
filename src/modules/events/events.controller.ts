import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './schemas/event.schema';
import { Schema as MongooseSchema } from 'mongoose';

@ApiTags('Events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new event' })
    @ApiBody({ type: CreateEventDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The event has been successfully created.', type: Event })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
    async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
        return this.eventsService.createEvent(createEventDto);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all events' })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of events retrieved successfully', type: [Event] })
    async findAll(): Promise<Event[]> {
        return this.eventsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve an event by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the event to retrieve' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The event has been retrieved successfully', type: Event })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Event not found' })
    async findById(@Param('id') id: string): Promise<Event> {
        return this.eventsService.findById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an event by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the event to update' })
    @ApiBody({ type: UpdateEventDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'The event has been updated successfully', type: Event })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Event not found' })
    async updateEvent(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
        return this.eventsService.updateEvent(id, updateEventDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an event by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the event to delete' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The event has been deleted successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Event not found' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteEvent(@Param('id') id: string): Promise<void> {
        await this.eventsService.deleteEvent(id);
    }

    @Get('organizer/:organizerId')
    @ApiOperation({ summary: 'Retrieve events by organizer ID' })
    @ApiParam({ name: 'organizerId', description: 'Organizer Id' })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of events retrieved successfully', type: [Event] })
    async findByOrganizer(@Param('organizerId') organizerId: string): Promise<Event[]> {
        const organizerObjectId = new MongooseSchema.ObjectId(organizerId);
        return this.eventsService.findByOrganizer(organizerObjectId);
    }
}
