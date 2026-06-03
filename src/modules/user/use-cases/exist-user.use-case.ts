import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { UserEntity } from '../entities/user/user.entity';
import { UserRepositoryAbstract } from '../repositories/user.repository.abstract';

@Injectable()
export class ExistUserUseCase {
	constructor(private readonly userRepository: UserRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<UserEntity>) {
		const user = await this.userRepository.findOne(criteria);

		if (user) {
			const whereClause = formatWhereClause(criteria.where || []);

			throw new BadRequestException(`Usuário já existe com os critérios: ${whereClause}`);
		}
	}
}
