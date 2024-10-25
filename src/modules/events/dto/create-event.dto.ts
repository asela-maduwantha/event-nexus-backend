import { IsArray, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { EventCategory } from 'src/common/enums/event-category.enum';
import {Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';
export class CreateEventDto{
    @ApiProperty({description:'Name of the event.'})
    @IsString()
    name: string;

    @ApiProperty({description:'Event Description'})
    @IsString()
    description: string;

    @ApiProperty({description:'Date of the event'})
    date: Date;

    @ApiProperty({description:'Start time of the event.'})
    startTime: Date;

    @ApiProperty({description:'End time of the event.'})
    endTime: Date;

    @ApiProperty({description:'Location of the event.'})
    @IsString()
    location: string;

    @ApiProperty({description:'Categories that even belong..'})
    @IsArray()
    @IsEnum(EventCategory, { each: true })
    categories: EventCategory[];

    @ApiProperty({description:'Categories that even belong..'})
    @IsString()
    organizer: MongooseSchema.Types.ObjectId;

    @ApiProperty({description:'Image url of event photo'})
    @IsString()
    imageUrl: string

}