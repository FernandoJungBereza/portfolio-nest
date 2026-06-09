import { PermissionUserRepositoryAbstract } from '@/modules/permission-user/repositories/permission-user.repository.abstract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionsAuthorizationService {
	constructor(private readonly permissionUserRepository: PermissionUserRepositoryAbstract) {}

	async getPermissionNamesByUserId(userId: string): Promise<string[]> {
		const permissions = await this.permissionUserRepository.findPermissionsByUserId(userId);

		return permissions.map((permission) => permission.name);
	}
}
