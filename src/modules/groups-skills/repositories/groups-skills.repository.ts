import { SkillsEntity } from '@/modules/skills/entities/skills.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { OutPutGroupsSkillsFindsDto } from '../dtos/out-put/out-put-groups-skills-finds.dto';
import { PostGroupsSkillDto } from '../dtos/post-groups-skill/post-groups-skill.dto';
import { GroupsSkillsEntity } from '../entities/groups-skills.entity';
import { GroupsSkillsRepositoryAbstract } from './groups-skills.repository.abstract';

@Injectable()
export class GroupsSkillsRepository implements GroupsSkillsRepositoryAbstract {
	constructor(
		@InjectRepository(GroupsSkillsEntity)
		private readonly groupsSkillsRepository: Repository<GroupsSkillsEntity>,
		@InjectRepository(SkillsEntity)
		private readonly skillsRepository: Repository<SkillsEntity>,
	) {}

	async findAll(): Promise<OutPutGroupsSkillsFindsDto[]> {
		return await this.groupsSkillsRepository.find({
			relations: ['skills'],
		});
	}

	async findOne(criteria: FindOneOptions<GroupsSkillsEntity>): Promise<OutPutGroupsSkillsFindsDto | null> {
		const where = criteria.where;
		const findById =
			where && typeof where === 'object' && !Array.isArray(where) && 'id' in where && where.id;

		if (findById) {
			return await this.groupsSkillsRepository.findOne({
				...criteria,
				relations: ['skills'],
			});
		}

		return await this.groupsSkillsRepository.findOne(criteria);
	}

	async create(postGroupsSkillDto: PostGroupsSkillDto): Promise<GroupsSkillsEntity> {
		return await this.groupsSkillsRepository.save(postGroupsSkillDto);
	}

	async update(id: string, postGroupsSkillDto: PostGroupsSkillDto): Promise<UpdateResult> {
		return await this.groupsSkillsRepository.update(id, postGroupsSkillDto);
	}

	async delete(id: string): Promise<DeleteResult> {
		return await this.groupsSkillsRepository.delete(id);
	}

	async save(entity: GroupsSkillsEntity): Promise<GroupsSkillsEntity> {
		return await this.groupsSkillsRepository.save(entity);
	}

	async countSkillsByGroupId(groupSkillId: string): Promise<number> {
		return await this.skillsRepository.count({
			where: { groupSkillId },
		});
	}
}
