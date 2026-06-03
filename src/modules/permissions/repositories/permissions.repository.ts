import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { OutPutPermissionDto } from '../dtos/out-put/out-put-permission.dto';
import { PermissionUserEntity } from '../entities/permission-user.entity';
import { PermissionsEntity } from '../entities/permissions.entity';
import { PermissionsRepositoryAbstract } from './permissions.repository.abstract';

@Injectable()
export class PermissionsRepository implements PermissionsRepositoryAbstract {
	constructor(
		@InjectRepository(PermissionUserEntity)
		private readonly permissionUserRepository: Repository<PermissionUserEntity>,
		@InjectRepository(PermissionsEntity)
		private readonly permissionsRepository: Repository<PermissionsEntity>,
	) {}

	async findPermissionsByUserId(userId: string): Promise<OutPutPermissionDto[]> {
		const rows = await this.permissionUserRepository.find({
			where: { userId },
			relations: ['permission'],
		});

		return rows.map((row) => ({
			id: row.permission.id,
			name: row.permission.name,
			description: row.permission.description,
		}));
	}

	async findOnePermission(criteria: FindOneOptions<PermissionsEntity>): Promise<OutPutPermissionDto | null> {
		return await this.permissionsRepository.findOne(criteria);
	}

	async findOnePermissionUser(criteria: FindOneOptions<PermissionUserEntity>): Promise<PermissionUserEntity | null> {
		return this.permissionUserRepository.findOne(criteria);
	}

	async assignToUser(userId: string, permissionId: string): Promise<void> {
		const permissionUser = this.permissionUserRepository.create({ userId, permissionId });

		await this.permissionUserRepository.save(permissionUser);
	}
}
