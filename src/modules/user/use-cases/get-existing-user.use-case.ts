import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { OutPutUserFindsDto } from '../dtos/out-put/out-put-user-finds.dto';
import { UserEntity } from '../entities/user/user.entity';
import { UserRepositoryAbstract } from '../repositories/user.repository.abstract';

@Injectable()
export class GetExistingUserUseCase {
	constructor(private readonly userRepository: UserRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<UserEntity>): Promise<OutPutUserFindsDto> {
		const user = await this.userRepository.findOne(criteria);

		if (!user) {
			const whereClause = formatWhereClause(criteria.where || []);

			throw new NotFoundException(`Usuário não encontrado com os critérios: ${whereClause}`);
		}

		return user;
	}
}
