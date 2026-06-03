import { ApiProperty } from '@nestjs/swagger';

export class OutPutUserFindsDto {
	@ApiProperty({ description: 'The id of the user' })
	id: string;

	@ApiProperty({ description: 'The name of the user' })
	name: string;

	@ApiProperty({ description: 'The email of the user' })
	email: string;

	@ApiProperty({ description: 'The created at date of the user' })
	createdAt: Date;

	@ApiProperty({ description: 'The updated at date of the user' })
	updatedAt: Date;
}
