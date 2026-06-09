import { Injectable } from '@nestjs/common';
import { OutPutPermissionDto } from '../../dtos/out-put/out-put-permission.dto';
import { PermissionsRepositoryAbstract } from '../../repositories/permissions.repository.abstract';

@Injectable()
export class GetAllPermissionsUseCase {
	constructor(private readonly permissionsRepository: PermissionsRepositoryAbstract) {}

	async execute(): Promise<OutPutPermissionDto[]> {
		return this.permissionsRepository.findAll();
	}
}
