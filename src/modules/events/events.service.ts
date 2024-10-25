import { Model, Schema as MongooseSchema } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
    constructor(@InjectModel(Event.name) private EventModel: Model<EventDocument>,){}

    //create event
    async createEvent(createEventDto: CreateEventDto): Promise<EventDocument>{
        try{
            const event = new this.EventModel(createEventDto);
            return event.save();
        }catch(error){
            throw new InternalServerErrorException('Error in creating Event');
        }
    }

    //get all events
    async findAll(): Promise<EventDocument[]>{
        return this.EventModel.find().exec();
    }

    //get event by id
    async findById(id: string): Promise<EventDocument> {
        const event = await this.EventModel.findById(id).exec();
        if (!event) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
        return event;
    }

    //update event
    async updateEvent(id: string, updateEventDto: UpdateEventDto): Promise<EventDocument> {
        const updatedEvent = await this.EventModel.findByIdAndUpdate(id, updateEventDto, { new: true }).exec();
        if (!updatedEvent) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
        return updatedEvent;
    }

    //delete event
    async deleteEvent(id: string): Promise<void> {
        const result = await this.EventModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
    }
    
    
    //find event by organizer
    async findByOrganizer(organizerId: MongooseSchema.Types.ObjectId): Promise<EventDocument[]> {
        return this.EventModel.find({ organizer: organizerId }).exec();
    }
    

    
}
