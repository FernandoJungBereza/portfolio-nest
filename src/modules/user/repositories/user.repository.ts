import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { OutPutUserFindsDto } from '../dtos/out-put/out-put-user-finds.dto';
import { PostUserDto } from '../dtos/post-user/post-user.dto';
import { UpdateUserDto } from '../dtos/update-user/update-user.dto';
import { UserEntity } from '../entities/user/user.entity';
import { UserRepositoryAbstract } from './user.repository.abstract';

@Injectable()
export class UserRepository implements UserRepositoryAbstract {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	async findAll(): Promise<OutPutUserFindsDto[]> {
		const userQueryBuilder = this.createUserQueryBuilder();
		return await userQueryBuilder.getMany();
	}

	async findOne(criteria: FindOneOptions<UserEntity>): Promise<OutPutUserFindsDto | null> {
		const userQueryBuilder = this.createUserQueryBuilder();
		const where = criteria.where;

		if (where && typeof where === 'object' && !Array.isArray(where)) {
			if ('id' in where && where.id) {
				userQueryBuilder.where('user.id = :id', { id: where.id });
			}

			if ('email' in where && where.email) {
				userQueryBuilder.where('user.email = :email', { email: where.email });
			}
		}

		return await userQueryBuilder.getOne();
	}

	async create(postUserDto: PostUserDto): Promise<UserEntity> {
		return await this.userRepository.save(postUserDto);
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
		return await this.userRepository.update(id, updateUserDto);
	}

	async delete(id: string): Promise<DeleteResult> {
		return await this.userRepository.delete(id);
	}

	async save(entity: UserEntity): Promise<UserEntity> {
		return await this.userRepository.save(entity);
	}

	private createUserQueryBuilder(): SelectQueryBuilder<UserEntity> {
		const userQueryBuilder = this.userRepository.createQueryBuilder('user');
		userQueryBuilder.select(['user.id', 'user.name', 'user.email', 'user.createdAt', 'user.updatedAt']);
		return userQueryBuilder;
	}
}
