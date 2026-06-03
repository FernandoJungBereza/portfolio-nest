import { Injectable } from '@nestjs/common';
import { OutPutGroupsSkillsFindsDto } from '../../dtos/out-put/out-put-groups-skills-finds.dto';
import { GroupsSkillsRepositoryAbstract } from '../../repositories/groups-skills.repository.abstract';

@Injectable()
export class GetAllGroupsSkillsUseCase {
	constructor(private readonly groupsSkillsRepository: GroupsSkillsRepositoryAbstract) {}

	async execute(): Promise<OutPutGroupsSkillsFindsDto[]> {
		return this.groupsSkillsRepository.findAll();
	}
}
