import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { OutPutGroupsSkillsFindsDto } from '../dtos/out-put/out-put-groups-skills-finds.dto';
import { GroupsSkillsEntity } from '../entities/groups-skills.entity';
import { GroupsSkillsRepositoryAbstract } from '../repositories/groups-skills.repository.abstract';

@Injectable()
export class GetExistingGroupsSkillUseCase {
	constructor(private readonly groupsSkillsRepository: GroupsSkillsRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<GroupsSkillsEntity>): Promise<OutPutGroupsSkillsFindsDto> {
		const groupSkill = await this.groupsSkillsRepository.findOne(criteria);

		if (!groupSkill) {
			const whereClause = formatWhereClause(criteria.where || []);

			throw new NotFoundException(`Grupo de skill não encontrado com os critérios: ${whereClause}`);
		}

		return groupSkill;
	}
}
