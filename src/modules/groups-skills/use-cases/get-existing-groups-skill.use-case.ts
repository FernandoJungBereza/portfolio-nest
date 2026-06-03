import { Injectable, NotFoundException } from '@nestjs/common';
import { OutPutGroupsSkillsFindsDto } from '../dtos/out-put/out-put-groups-skills-finds.dto';
import { GroupsSkillsRepositoryAbstract } from '../repositories/groups-skills.repository.abstract';

@Injectable()
export class GetExistingGroupsSkillUseCase {
	constructor(private readonly groupsSkillsRepository: GroupsSkillsRepositoryAbstract) {}

	async execute(id: string): Promise<OutPutGroupsSkillsFindsDto> {
		const groupSkill = await this.groupsSkillsRepository.findOne(id);

		if (!groupSkill) {
			throw new NotFoundException(`Grupo de skill não encontrado com id: ${id}`);
		}

		return groupSkill;
	}
}
