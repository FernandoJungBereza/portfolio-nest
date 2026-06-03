import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { OutPutSkillsFindsDto } from '../dtos/out-put/out-put-skills-finds.dto';
import { PostSkillDto } from '../dtos/post-skill/post-skill.dto';
import { SkillsEntity } from '../entities/skills.entity';
import { SkillsRepositoryAbstract } from './skills.repository.abstract';

@Injectable()
export class SkillsRepository implements SkillsRepositoryAbstract {
	constructor(
		@InjectRepository(SkillsEntity)
		private readonly skillsRepository: Repository<SkillsEntity>,
	) {}

	async findAll(): Promise<OutPutSkillsFindsDto[]> {
		return await this.skillsRepository.find();
	}

	async findOne(criteria: FindOneOptions<SkillsEntity>): Promise<OutPutSkillsFindsDto | null> {
		return await this.skillsRepository.findOne(criteria);
	}

	async create(postSkillDto: PostSkillDto): Promise<SkillsEntity> {
		return await this.skillsRepository.save(postSkillDto);
	}

	async update(id: string, postSkillDto: PostSkillDto): Promise<UpdateResult> {
		return await this.skillsRepository.update(id, postSkillDto);
	}

	async delete(id: string): Promise<DeleteResult> {
		return await this.skillsRepository.delete(id);
	}

	async save(entity: SkillsEntity): Promise<SkillsEntity> {
		return await this.skillsRepository.save(entity);
	}
}
