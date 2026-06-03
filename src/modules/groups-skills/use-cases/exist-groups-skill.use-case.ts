import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { GroupsSkillsEntity } from '../entities/groups-skills.entity';
import { GroupsSkillsRepositoryAbstract } from '../repositories/groups-skills.repository.abstract';

@Injectable()
export class ExistGroupsSkillUseCase {
	constructor(private readonly groupsSkillsRepository: GroupsSkillsRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<GroupsSkillsEntity>) {
		const groupSkill = await this.groupsSkillsRepository.findOne(criteria);

		if (groupSkill) {
			const whereClause = formatWhereClause(criteria.where || []);

			throw new BadRequestException(`Grupo de skill já existe com os critérios: ${whereClause}`);
		}
	}
}
