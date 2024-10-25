import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
    constructor(@InjectModel(Ticket.name) private TicketModel: Model<TicketDocument>){}

    //create tickets for event
    async createTicket(createTicketDto: CreateTicketDto): Promise<TicketDocument> {
        const { type, eventId } = createTicketDto;

        const existingTicket = await this.TicketModel.findOne({ type, eventId });
        if (existingTicket) {
            throw new BadRequestException(`Ticket of type '${type}' already exists for this event.`);
        }

        const newTicket = new this.TicketModel(createTicketDto);
        return newTicket.save();
    }

    //get tickets by event Id
    async getTicketsByEventId(eventId: string): Promise<TicketDocument[]> {
        const tickets = await this.TicketModel.find({ event: eventId }).exec();
        
        if (!tickets || tickets.length === 0) {
            throw new NotFoundException(`No tickets found for event with ID ${eventId}`);
        }

        return tickets;
    }
}
