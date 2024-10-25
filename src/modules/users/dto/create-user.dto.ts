import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Provider } from 'src/common/enums/provider.enum';
import { UserRole } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'First name of the user' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Unique email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Mobile number of the user' })
  @IsString()
  mobileNo: string;

  @ApiProperty({ description: 'Profile image URL', required: false })
  @IsOptional()
  @IsString()
  profImg?: string;

  @ApiProperty({ description: 'User password', required: false, minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string; 

  @ApiProperty({ description: 'Google ID (used when signing up with Google)', required: false })
  @IsOptional()
  @IsString()
  googleId?: string; 

  @ApiProperty({ description: 'Role of the user', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ description: 'Signup method (email or google)', enum: Provider })
  @IsString()
  provider: Provider;
}
