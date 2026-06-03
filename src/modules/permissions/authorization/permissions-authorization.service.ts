import { Injectable } from '@nestjs/common';
import { PermissionsRepositoryAbstract } from '../repositories/permissions.repository.abstract';

@Injectable()
export class PermissionsAuthorizationService {
	constructor(private readonly permissionsRepository: PermissionsRepositoryAbstract) {}

	async getPermissionNamesByUserId(userId: string): Promise<string[]> {
		return this.permissionsRepository.findPermissionNamesByUserId(userId);
	}
}
