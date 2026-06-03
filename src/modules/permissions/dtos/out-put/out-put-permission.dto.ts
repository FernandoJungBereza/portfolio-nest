import { ApiProperty } from '@nestjs/swagger';

export class OutPutPermissionDto {
	@ApiProperty({ description: 'The id of the permission' })
	id: string;

	@ApiProperty({ description: 'Permission name (matches Permission enum)', example: 'admin' })
	name: string;

	@ApiProperty({ description: 'The description of the permission' })
	description: string;
}
