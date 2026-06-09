import { OutPutPermissionDto } from '@/modules/permissions/dtos/out-put/out-put-permission.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { PermissionUserEntity } from '../entities/permission-user.entity';
import { PermissionUserRepositoryAbstract } from './permission-user.repository.abstract';

@Injectable()
export class PermissionUserRepository implements PermissionUserRepositoryAbstract {
	constructor(
		@InjectRepository(PermissionUserEntity)
		private readonly permissionUserRepository: Repository<PermissionUserEntity>,
	) {}

	async findOne(criteria: FindOneOptions<PermissionUserEntity>): Promise<PermissionUserEntity | null> {
		return this.permissionUserRepository.findOne(criteria);
	}

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

	async assign(userId: string, permissionId: string): Promise<void> {
		const permissionUser = this.permissionUserRepository.create({ userId, permissionId });

		await this.permissionUserRepository.save(permissionUser);
	}
}
