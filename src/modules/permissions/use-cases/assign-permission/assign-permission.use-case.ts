import { PermissionsRepositoryAbstract } from '@/modules/permissions/repositories/permissions.repository.abstract';
import { GetExistingPermissionUseCase } from '@/modules/permissions/use-cases/get-existing-permission.use-case';
import { GetExistingUserUseCase } from '@/modules/user/use-cases/get-existing-user.use-case';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class AssignPermissionUseCase {
	constructor(
		private readonly permissionsRepository: PermissionsRepositoryAbstract,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
		private readonly getExistingPermissionUseCase: GetExistingPermissionUseCase,
	) {}

	async execute(userId: string, permissionId: string): Promise<void> {
		await this.getExistingUserUseCase.execute({ where: { id: userId } });
		await this.getExistingPermissionUseCase.execute({ where: { id: permissionId } });

		const assigned = await this.permissionsRepository.isAssignedToUser(userId, permissionId);

		if (assigned) {
			throw new ConflictException('Permissão já atribuída a este usuário');
		}

		await this.permissionsRepository.assignToUser(userId, permissionId);
	}
}
