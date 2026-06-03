import { SkillsEntity } from '@/modules/skills/entities/skills.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';
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
		const groupsSkillsQueryBuilder = this.createGroupsSkillsWithSkillsQueryBuilder();
		return await groupsSkillsQueryBuilder.getMany();
	}

	async findOne(id: string): Promise<OutPutGroupsSkillsFindsDto | null> {
		const groupsSkillsQueryBuilder = this.createGroupsSkillsWithSkillsQueryBuilder();
		groupsSkillsQueryBuilder.where('groupSkill.id = :id', { id });
		return await groupsSkillsQueryBuilder.getOne();
	}

	async findOneByName(name: string): Promise<OutPutGroupsSkillsFindsDto | null> {
		return await this.groupsSkillsRepository
			.createQueryBuilder('groupSkill')
			.select(['groupSkill.id', 'groupSkill.name'])
			.where('groupSkill.name = :name', { name })
			.getOne();
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
		return await this.skillsRepository
			.createQueryBuilder('skill')
			.where('skill.groupSkillId = :groupSkillId', { groupSkillId })
			.getCount();
	}

	private createGroupsSkillsWithSkillsQueryBuilder(): SelectQueryBuilder<GroupsSkillsEntity> {
		const groupsSkillsQueryBuilder = this.groupsSkillsRepository.createQueryBuilder('groupSkill');
		groupsSkillsQueryBuilder.leftJoinAndSelect('groupSkill.skills', 'skills');
		groupsSkillsQueryBuilder.select(['groupSkill.id', 'groupSkill.name', 'skills.id', 'skills.name']);
		return groupsSkillsQueryBuilder;
	}
}
