import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PaymentStatus } from 'src/common/enums/payment-status.enum';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Booking', required: true })
    booking: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true, enum: PaymentStatus, default: PaymentStatus.PENDING })
    status: PaymentStatus;

    @Prop()
    paymentDate: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);