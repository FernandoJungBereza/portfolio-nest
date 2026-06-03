import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UpdateUserInterface } from './update-user.interface';

export class UpdateUserDto implements UpdateUserInterface {
	@ApiProperty({ description: 'The name of the user' })
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(255)
	name: string;

	@ApiProperty({ description: 'The email of the user' })
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(255)
	@IsEmail()
	email: string;
}
