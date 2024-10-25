import { IsArray, IsEnum, IsMongoId, IsOptional, IsString, IsDate } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { EventCategory } from 'src/common/enums/event-category.enum';
import { Schema as MongooseSchema } from 'mongoose';

export class UpdateEventDto {
    @ApiProperty({ description: 'Name of the event.', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ description: 'Event Description', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Date of the event', required: false })
    @IsOptional()
    @IsDate()
    date?: Date;

    @ApiProperty({ description: 'Start time of the event.', required: false })
    @IsOptional()
    @IsDate()
    startTime?: Date;

    @ApiProperty({ description: 'End time of the event.', required: false })
    @IsOptional()
    @IsDate()
    endTime?: Date;

    @ApiProperty({ description: 'Location of the event.', required: false })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiProperty({ description: 'Categories that event belongs to.', required: false })
    @IsOptional()
    @IsArray()
    @IsEnum(EventCategory, { each: true })
    categories?: EventCategory[];

    @ApiProperty({ description: 'Organizer ID.', required: false })
    @IsOptional()
    @IsMongoId()
    organizer?: MongooseSchema.Types.ObjectId;

    @ApiProperty({ description: 'Image URL of event photo', required: false })
    @IsOptional()
    @IsString()
    imageUrl?: string;
}
