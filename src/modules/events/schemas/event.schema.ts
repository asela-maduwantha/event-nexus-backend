import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { EventCategory } from 'src/common/enums/event-category.enum';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, type: Date })
    date: Date;

    @Prop({ required: true, type: Date })
    startTime: Date;

    @Prop({ required: true, type: Date })
    endTime: Date;

    @Prop({ required: true })
    location: string;

    @Prop({ type: [String], enum: EventCategory, required: true })
    categories: EventCategory[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    organizer: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    imageUrl: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
