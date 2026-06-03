import { PermissionsRepositoryAbstract } from '@/modules/permissions/repositories/permissions.repository.abstract';
import { ExistPermissionUserUseCase } from '@/modules/permissions/use-cases/exist-permission-user.use-case';
import { GetExistingPermissionUseCase } from '@/modules/permissions/use-cases/get-existing-permission.use-case';
import { GetExistingUserUseCase } from '@/modules/user/use-cases/get-existing-user.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssignPermissionUseCase {
	constructor(
		private readonly permissionsRepository: PermissionsRepositoryAbstract,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
		private readonly getExistingPermissionUseCase: GetExistingPermissionUseCase,
		private readonly existPermissionUserUseCase: ExistPermissionUserUseCase,
	) {}

	async execute(userId: string, permissionId: string): Promise<void> {
		await this.getExistingUserUseCase.execute({ where: { id: userId } });
		await this.getExistingPermissionUseCase.execute({ where: { id: permissionId } });
		await this.existPermissionUserUseCase.execute({ where: { userId, permissionId } });

		await this.permissionsRepository.assignToUser(userId, permissionId);
	}
}
