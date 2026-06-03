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

	async findPermissionNamesByUserId(userId: string): Promise<string[]> {
		const permissions = await this.findPermissionsByUserId(userId);

		return permissions.map((permission) => permission.name);
	}

	async findPermissionsByUserId(userId: string): Promise<OutPutPermissionDto[]> {
		const rows = await this.permissionUserRepository.find({
			where: { userId },
			relations: ['permission'],
		});

		return rows.map((row) => this.toOutput(row.permission));
	}

	async findOnePermission(criteria: FindOneOptions<PermissionsEntity>): Promise<OutPutPermissionDto | null> {
		const permission = await this.permissionsRepository.findOne(criteria);

		if (!permission) {
			return null;
		}

		return this.toOutput(permission);
	}

	async findOnePermissionUser(criteria: FindOneOptions<PermissionUserEntity>): Promise<PermissionUserEntity | null> {
		return this.permissionUserRepository.findOne(criteria);
	}

	async assignToUser(userId: string, permissionId: string): Promise<void> {
		const permissionUser = this.permissionUserRepository.create({ userId, permissionId });

		await this.permissionUserRepository.save(permissionUser);
	}

	private toOutput(permission: PermissionsEntity): OutPutPermissionDto {
		return {
			id: permission.id,
			name: permission.name,
			description: permission.description,
		};
	}
}
