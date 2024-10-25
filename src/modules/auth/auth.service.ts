import { Injectable, UnauthorizedException, InternalServerErrorException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { MongoError } from 'mongodb';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(createUserDto: CreateUserDto) {
        try {
            const existingUser = await this.usersService.findUserByEmail(createUserDto.email);
            if (existingUser) {
                throw new ConflictException('Email already exists');
            }

            const hashedPassword = await this.hashPassword(createUserDto.password);
            
            const user = await this.usersService.createUser({
                ...createUserDto,
                password: hashedPassword,
            });

            const { password, ...result } = user.toObject();
            
            const token = this.jwtService.sign({ 
                sub: user._id,
                email: user.email 
            });

            return {
                user: result,
                access_token: token
            };

        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            
            if (error instanceof MongoError && error.code === 11000) {
                throw new ConflictException('Email already exists');
            }
            console.error('SignUp Error:', error);
            
            throw new InternalServerErrorException(
                'An error occurred while creating the user'
            );
        }
    }

    async signIn(loginUserDto: LoginUserDto) {
        try {
            const user = await this.usersService.findUserByEmail(loginUserDto.email);
            
            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const isPasswordValid = await this.comparePasswords(
                loginUserDto.password,
                user.password
            );

            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const { password, ...result } = user.toObject();
            
            const token = this.jwtService.sign({ 
                sub: user._id,
                email: user.email 
            });

            return {
                user: result,
                access_token: token
            };

        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error; 
            }
            console.error('SignIn Error:', error);
            
            throw new InternalServerErrorException(
                'An error occurred during login'
            );
        }
    }

    private async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt();
            return await bcrypt.hash(password, salt);
        } catch (error) {
            console.error('Password Hash Error:', error);
            
            throw new InternalServerErrorException(
                'An error occurred while processing the password'
            );
        }
    }

    private async comparePasswords(
        plainTextPassword: string,
        hashedPassword: string
    ): Promise<boolean> {
        try {
            return await bcrypt.compare(plainTextPassword, hashedPassword);
        } catch (error) {
            console.error('Password Compare Error:', error);
            throw new InternalServerErrorException(
                'An error occurred while validating credentials'
            );
        }
    }
}