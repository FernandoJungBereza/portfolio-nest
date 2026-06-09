import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { ConflictException, Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { PermissionUserEntity } from '../entities/permission-user.entity';
import { PermissionUserRepositoryAbstract } from '../repositories/permission-user.repository.abstract';

@Injectable()
export class ExistPermissionUserUseCase {
	constructor(private readonly permissionUserRepository: PermissionUserRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<PermissionUserEntity>): Promise<void> {
		const permissionUser = await this.permissionUserRepository.findOne(criteria);

		if (permissionUser) {
			const whereClause = formatWhereClause(criteria.where || []);

			throw new ConflictException(`Permissão já atribuída com os critérios: ${whereClause}`);
		}
	}
}
