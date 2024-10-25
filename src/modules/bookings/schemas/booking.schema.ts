import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BookingStatus } from '../../../common/enums/booking-status.enum';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ticket', required: true })
    ticket: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Event', required: true })
    event: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true, enum: BookingStatus, default: BookingStatus.PENDING })
    status: BookingStatus;

    @Prop({ required: true })
    totalAmount: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);