import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { OutPutPermissionDto } from '../dtos/out-put/out-put-permission.dto';
import { PermissionsEntity } from '../entities/permissions.entity';
import { PermissionsRepositoryAbstract } from './permissions.repository.abstract';

@Injectable()
export class PermissionsRepository implements PermissionsRepositoryAbstract {
	constructor(
		@InjectRepository(PermissionsEntity)
		private readonly permissionsRepository: Repository<PermissionsEntity>,
	) {}

	async findAll(): Promise<OutPutPermissionDto[]> {
		const permissions = await this.permissionsRepository.find({
			order: { name: 'ASC' },
		});

		return permissions.map((permission) => ({
			id: permission.id,
			name: permission.name,
			description: permission.description,
		}));
	}

	async findOnePermission(criteria: FindOneOptions<PermissionsEntity>): Promise<OutPutPermissionDto | null> {
		const permission = await this.permissionsRepository.findOne(criteria);

		if (!permission) {
			return null;
		}

		return {
			id: permission.id,
			name: permission.name,
			description: permission.description,
		};
	}
}
