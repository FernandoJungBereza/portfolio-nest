import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';
import { LoginInterface } from './login.interface';

export class LoginDto implements LoginInterface {
	@ApiProperty({ description: 'The email of the user' })
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(255)
	@IsEmail()
	email: string;

	@ApiProperty({ description: 'The password of the user' })
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(255)
	password: string;
}
