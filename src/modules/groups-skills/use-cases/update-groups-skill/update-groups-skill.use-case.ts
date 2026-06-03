import { Injectable } from '@nestjs/common';
import { UpdateGroupsSkillDto } from '../../dtos/update-groups-skill/update-groups-skill.dto';
import { GroupsSkillsRepositoryAbstract } from '../../repositories/groups-skills.repository.abstract';
import { ExistGroupsSkillUseCase } from '../exist-groups-skill.use-case';
import { GetExistingGroupsSkillUseCase } from '../get-existing-groups-skill.use-case';

@Injectable()
export class UpdateGroupsSkillUseCase {
	constructor(
		private readonly groupsSkillsRepository: GroupsSkillsRepositoryAbstract,
		private readonly getExistingGroupsSkillUseCase: GetExistingGroupsSkillUseCase,
		private readonly existGroupsSkillUseCase: ExistGroupsSkillUseCase,
	) {}

	async execute(id: string, updateGroupsSkillDto: UpdateGroupsSkillDto): Promise<void> {
		const groupSkill = await this.getExistingGroupsSkillUseCase.execute({
			where: {
				id: id,
			},
		});

		if (updateGroupsSkillDto.name !== groupSkill.name) {
			await this.existGroupsSkillUseCase.execute({
				where: {
					name: updateGroupsSkillDto.name,
				},
			});
		}

		await this.groupsSkillsRepository.update(groupSkill.id, {
			...updateGroupsSkillDto,
		});
	}
}
