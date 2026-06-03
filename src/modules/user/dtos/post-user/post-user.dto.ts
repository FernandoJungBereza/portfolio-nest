import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { PostUserInterface } from './post-user.interface';

export class PostUserDto implements PostUserInterface {
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

	@ApiProperty({ description: 'The password of the user' })
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(255)
	password: string;
}
