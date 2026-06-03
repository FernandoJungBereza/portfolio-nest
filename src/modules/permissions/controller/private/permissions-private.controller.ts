import { RequireAdmin } from '@/modules/permissions/decorators/require-permission.decorator';
import { ApiCreatedResponse, ApiStandardErrors } from '@/shared/decorators/swagger-standard-responses.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssignPermissionDto } from '../../dtos/assign-permission/assign-permission.dto';
import { AssignPermissionUseCase } from '../../use-cases/assign-permission/assign-permission.use-case';

@Controller('admin/permissions')
@ApiTags('Permissions')
@RequireAdmin()
export class PermissionsPrivateController {
	constructor(private readonly assignPermissionUseCase: AssignPermissionUseCase) {}

	@Post('assign')
	@ApiOperation({ summary: 'Assign permission to user' })
	@ApiCreatedResponse('Permission assigned successfully')
	@ApiStandardErrors()
	async assignPermission(@Body() assignPermissionDto: AssignPermissionDto): Promise<void> {
		return this.assignPermissionUseCase.execute(assignPermissionDto.userId, assignPermissionDto.permissionId);
	}
}
