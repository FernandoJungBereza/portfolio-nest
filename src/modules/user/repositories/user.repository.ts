import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { OutPutUserAuthDto } from '../dtos/out-put/out-put-user-auth.dto';
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
		return await this.userRepository.find({
			select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
		});
	}

	async findOne(criteria: FindOneOptions<UserEntity>): Promise<OutPutUserFindsDto | null> {
		return await this.userRepository.findOne({
			...criteria,
			select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
		});
	}

	async findOneForAuth(criteria: FindOneOptions<UserEntity>): Promise<OutPutUserAuthDto | null> {
		return await this.userRepository.findOne(criteria);
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
}
