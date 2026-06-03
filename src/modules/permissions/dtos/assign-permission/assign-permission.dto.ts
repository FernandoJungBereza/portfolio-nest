import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { AssignPermissionInterface } from './assign-permission.interface';

export class AssignPermissionDto implements AssignPermissionInterface {
	@ApiProperty({ description: 'User id to receive the permission' })
	@IsUUID()
	@IsNotEmpty()
	userId: string;

	@ApiProperty({ description: 'Permission id to assign' })
	@IsUUID()
	@IsNotEmpty()
	permissionId: string;
}
