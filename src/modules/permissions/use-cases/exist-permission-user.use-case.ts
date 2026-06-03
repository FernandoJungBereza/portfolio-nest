import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { ConflictException, Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { PermissionUserEntity } from '../entities/permission-user.entity';
import { PermissionsRepositoryAbstract } from '../repositories/permissions.repository.abstract';

@Injectable()
export class ExistPermissionUserUseCase {
	constructor(private readonly permissionsRepository: PermissionsRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<PermissionUserEntity>): Promise<void> {
		const permissionUser = await this.permissionsRepository.findOnePermissionUser(criteria);

		if (permissionUser) {
			const whereClause = formatWhereClause(criteria.where || []);

			throw new ConflictException(`Permissão já atribuída com os critérios: ${whereClause}`);
		}
	}
}
