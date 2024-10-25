import { 
    ConflictException, 
    Injectable, 
    InternalServerErrorException, 
    NotFoundException 
} from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoError } from 'mongodb';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        try {
            const user = new this.UserModel(createUserDto);
            return await user.save();
        } catch (error) {
            if (error instanceof MongoError) {
                if (error.code === 11000) {
                    throw new ConflictException('Email already exists');
                }
            }
            
            throw new InternalServerErrorException(
                'An error occurred while creating the user'
            );
        }
    }

    async findUserByEmail(email: string): Promise<UserDocument | null> {
        try {
            return await this.UserModel
                .findOne({ email })
                .select('+password')
                .exec();
        } catch (error) {
            
            throw new InternalServerErrorException(
                'An error occurred while searching for the user'
            );
        }
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const existingUser = await this.UserModel.findById(userId);
            if (!existingUser) {
                throw new NotFoundException('User not found');
            }

            if (updateUserDto.email) {
                const emailExists = await this.UserModel.findOne({ 
                    email: updateUserDto.email,
                    _id: { $ne: userId } 
                });
                if (emailExists) {
                    throw new ConflictException('Email already exists');
                }
            }

            const updatedUser = await this.UserModel
                .findByIdAndUpdate(userId, updateUserDto, { new: true })
                .exec();

            if (!updatedUser) {
                throw new NotFoundException('User not found');
            }

            return updatedUser;
        } catch (error) {
            if (error instanceof NotFoundException || 
                error instanceof ConflictException) {
                throw error;
            }

            if (error instanceof MongoError && error.code === 11000) {
                throw new ConflictException('Email already exists');
            }

            
            throw new InternalServerErrorException(
                'An error occurred while updating the user'
            );
        }
    }
}