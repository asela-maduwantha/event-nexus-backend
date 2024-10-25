import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserRole } from 'src/common/enums/role.enum';

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User{
    @Prop({required:true})
    firstName: string;

    @Prop({required:true})
    lastName: string;

    @Prop({required:true, unique:true})
    email: string;

    @Prop({required:true})
    mobileNo: string;

    @Prop({required:false})
    profImg: string;

    @Prop({required: false})
    googleId?: string;

    @Prop({required:false})
    password:string;

    @Prop({required: true, enum: UserRole})
    role: UserRole;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Event' }] })
    savedEvents: MongooseSchema.Types.ObjectId[];

    @Prop({ type: Object })
    preferences?: Record<string, any>;
    toObject: any;

}

export const UserSchema = SchemaFactory.createForClass(User);