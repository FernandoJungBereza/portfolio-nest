import { GetExistingPermissionUseCase } from '@/modules/permissions/use-cases/get-existing-permission.use-case';
import { ExistPermissionUserUseCase } from '@/modules/permission-user/use-cases/exist-permission-user.use-case';
import { PermissionUserRepositoryAbstract } from '@/modules/permission-user/repositories/permission-user.repository.abstract';
import { GetExistingUserUseCase } from '@/modules/user/use-cases/get-existing-user.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssignPermissionUseCase {
	constructor(
		private readonly permissionUserRepository: PermissionUserRepositoryAbstract,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
		private readonly getExistingPermissionUseCase: GetExistingPermissionUseCase,
		private readonly existPermissionUserUseCase: ExistPermissionUserUseCase,
	) {}

	async execute(userId: string, permissionId: string): Promise<void> {
		await this.getExistingUserUseCase.execute({ where: { id: userId } });
		await this.getExistingPermissionUseCase.execute({ where: { id: permissionId } });
		await this.existPermissionUserUseCase.execute({ where: { userId, permissionId } });

		await this.permissionUserRepository.assign(userId, permissionId);
	}
}
