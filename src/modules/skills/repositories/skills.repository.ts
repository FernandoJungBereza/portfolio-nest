import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { OutPutSkillsFindsDto } from '../dtos/out-put/out-put-skills-finds.dto';
import { PostSkillDto } from '../dtos/post-skill/post-skill.dto';
import { UpdateSkillDto } from '../dtos/update-skill/update-skill.dto';
import { SkillsEntity } from '../entities/skills.entity';
import { SkillsRepositoryAbstract } from './skills.repository.abstract';

@Injectable()
export class SkillsRepository implements SkillsRepositoryAbstract {
	constructor(
		@InjectRepository(SkillsEntity)
		private readonly skillsRepository: Repository<SkillsEntity>,
	) {}

	async findAll(): Promise<OutPutSkillsFindsDto[]> {
		const skillsQueryBuilder = this.createSkillsWithGroupSkillQueryBuilder();
		return await skillsQueryBuilder.getMany();
	}

	async findOne(criteria: FindOneOptions<SkillsEntity>): Promise<OutPutSkillsFindsDto | null> {
		const skillsQueryBuilder = this.createSkillsWithGroupSkillQueryBuilder();
		const where = criteria.where;

		if (where && typeof where === 'object' && !Array.isArray(where)) {
			if ('id' in where && where.id) {
				skillsQueryBuilder.where('skill.id = :id', { id: where.id });
			}

			if ('name' in where && where.name) {
				skillsQueryBuilder.where('skill.name = :name', { name: where.name });
			}
		}

		return await skillsQueryBuilder.getOne();
	}

	async create(postSkillDto: PostSkillDto): Promise<SkillsEntity> {
		return await this.skillsRepository.save(postSkillDto);
	}

	async update(id: string, updateSkillDto: UpdateSkillDto): Promise<UpdateResult> {
		return await this.skillsRepository.update(id, updateSkillDto);
	}

	async delete(id: string): Promise<DeleteResult> {
		return await this.skillsRepository.delete(id);
	}

	async save(entity: SkillsEntity): Promise<SkillsEntity> {
		return await this.skillsRepository.save(entity);
	}

	private createSkillsWithGroupSkillQueryBuilder(): SelectQueryBuilder<SkillsEntity> {
		const skillsQueryBuilder = this.skillsRepository.createQueryBuilder('skill');
		skillsQueryBuilder.leftJoinAndSelect('skill.groupSkill', 'groupSkill');
		skillsQueryBuilder.select([
			'skill.id',
			'skill.name',
			'skill.groupSkillId',
			'groupSkill.id',
			'groupSkill.name',
		]);
		return skillsQueryBuilder;
	}
}
