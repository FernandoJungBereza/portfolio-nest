import { RequireAdmin } from '@/modules/permissions/decorators/require-permission.decorator';
import { ApiCreatedResponse, ApiOkResponse, ApiStandardErrors } from '@/shared/decorators/swagger-standard-responses.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssignPermissionDto } from '../../dtos/assign-permission/assign-permission.dto';
import { OutPutPermissionDto } from '../../dtos/out-put/out-put-permission.dto';
import { AssignPermissionUseCase } from '../../use-cases/assign-permission/assign-permission.use-case';
import { GetAllPermissionsUseCase } from '../../use-cases/get-all-permissions/get-all-permissions.use-case';

@Controller('admin/permissions')
@ApiTags('Permissions')
@RequireAdmin()
export class PermissionsPrivateController {
	constructor(
		private readonly getAllPermissionsUseCase: GetAllPermissionsUseCase,
		private readonly assignPermissionUseCase: AssignPermissionUseCase,
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all permissions' })
	@ApiOkResponse({ description: 'Permissions found successfully', type: OutPutPermissionDto, isArray: true })
	@ApiStandardErrors()
	async getAllPermissions(): Promise<OutPutPermissionDto[]> {
		return this.getAllPermissionsUseCase.execute();
	}

	@Post('assign')
	@ApiOperation({ summary: 'Assign permission to user' })
	@ApiCreatedResponse('Permission assigned successfully')
	@ApiStandardErrors()
	async assignPermission(@Body() assignPermissionDto: AssignPermissionDto): Promise<void> {
		return this.assignPermissionUseCase.execute(assignPermissionDto.userId, assignPermissionDto.permissionId);
	}
}
