import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TicketType } from '../../../common/enums/ticket-type.enum';

export type TicketDocument = Ticket & Document;

@Schema({ timestamps: true })
export class Ticket {
    @Prop({ required: true, enum: TicketType })
    type: TicketType;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    availableQuantity: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Event', required: true })
    event: MongooseSchema.Types.ObjectId;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
