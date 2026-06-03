import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { OutPutPermissionDto } from '../dtos/out-put/out-put-permission.dto';
import { PermissionsEntity } from '../entities/permissions.entity';
import { PermissionsRepositoryAbstract } from '../repositories/permissions.repository.abstract';

@Injectable()
export class GetExistingPermissionUseCase {
	constructor(private readonly permissionsRepository: PermissionsRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<PermissionsEntity>): Promise<OutPutPermissionDto> {
		const permission = await this.permissionsRepository.findOnePermission(criteria);

		if (!permission) {
			const whereClause = formatWhereClause(criteria.where || []);

			throw new NotFoundException(`Permissão não encontrada com os critérios: ${whereClause}`);
		}

		return permission;
	}
}
