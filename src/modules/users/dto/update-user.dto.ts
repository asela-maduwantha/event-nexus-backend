import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/common/enums/role.enum';

export class UpdateUserDto {
  @ApiProperty({ description: 'First name of the user', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ description: 'Last name of the user', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ description: 'Unique email of the user', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Mobile number of the user', required: false })
  @IsOptional()
  @IsString()
  mobileNo?: string;

  @ApiProperty({ description: 'Profile image URL', required: false })
  @IsOptional()
  @IsString()
  profImg?: string;

  @ApiProperty({ description: 'User password', required: false, minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string; 

  @ApiProperty({ description: 'Role of the user', enum: UserRole, required: false })
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ description: 'User preferences', required: false })
  @IsOptional()
  preferences?: Record<string, any>;
}
