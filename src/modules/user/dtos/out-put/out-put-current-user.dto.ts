import { OutPutPermissionDto } from '@/modules/permissions/dtos/out-put/out-put-permission.dto';
import { ApiProperty } from '@nestjs/swagger';
import { OutPutUserFindsDto } from './out-put-user-finds.dto';

export class OutPutCurrentUserDto extends OutPutUserFindsDto {
	@ApiProperty({ description: 'Permissions assigned to the user', type: OutPutPermissionDto, isArray: true })
	permissions: OutPutPermissionDto[];
}
