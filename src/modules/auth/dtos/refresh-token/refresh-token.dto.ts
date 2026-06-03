import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { RefreshTokenInterface } from './refresh-token.interface';

export class RefreshTokenDto implements RefreshTokenInterface {
	@ApiProperty({ description: 'The refresh token' })
	@IsString()
	@IsNotEmpty()
	refreshToken: string;
}
