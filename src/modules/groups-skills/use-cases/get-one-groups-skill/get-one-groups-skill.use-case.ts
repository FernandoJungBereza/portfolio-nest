import { Injectable } from '@nestjs/common';
import { OutPutGroupsSkillsFindsDto } from '../../dtos/out-put/out-put-groups-skills-finds.dto';
import { GetExistingGroupsSkillUseCase } from '../get-existing-groups-skill.use-case';

@Injectable()
export class GetOneGroupsSkillUseCase {
	constructor(private readonly getExistingGroupsSkillUseCase: GetExistingGroupsSkillUseCase) {}

	async execute(id: string): Promise<OutPutGroupsSkillsFindsDto> {
		return this.getExistingGroupsSkillUseCase.execute(id);
	}
}
