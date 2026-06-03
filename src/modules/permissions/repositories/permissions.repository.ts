import { PermissionUserEntity } from '../entities/permission-user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionsRepositoryAbstract } from './permissions.repository.abstract';

@Injectable()
export class PermissionsRepository implements PermissionsRepositoryAbstract {
	constructor(
		@InjectRepository(PermissionUserEntity)
		private readonly permissionUserRepository: Repository<PermissionUserEntity>,
	) {}

	async findPermissionNamesByUserId(userId: string): Promise<string[]> {
		const rows = await this.permissionUserRepository.find({
			where: { userId },
			relations: ['permission'],
			select: {
				id: true,
				permission: {
					name: true,
				},
			},
		});

		return rows.map((row) => row.permission.name);
	}
}
