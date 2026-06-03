import { Injectable } from '@nestjs/common';
import { PermissionsRepositoryAbstract } from '../repositories/permissions.repository.abstract';

@Injectable()
export class PermissionsAuthorizationService {
	constructor(private readonly permissionsRepository: PermissionsRepositoryAbstract) {}

	async getPermissionNamesByUserId(userId: string): Promise<string[]> {
		const permissions = await this.permissionsRepository.findPermissionsByUserId(userId);

		return permissions.map((permission) => permission.name);
	}
}
