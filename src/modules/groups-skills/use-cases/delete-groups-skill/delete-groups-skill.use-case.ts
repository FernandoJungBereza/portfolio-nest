import { BadRequestException, Injectable } from '@nestjs/common';
import { GroupsSkillsRepositoryAbstract } from '../../repositories/groups-skills.repository.abstract';
import { GetExistingGroupsSkillUseCase } from '../get-existing-groups-skill.use-case';

@Injectable()
export class DeleteGroupsSkillUseCase {
	constructor(
		private readonly groupsSkillsRepository: GroupsSkillsRepositoryAbstract,
		private readonly getExistingGroupsSkillUseCase: GetExistingGroupsSkillUseCase,
	) {}

	async execute(id: string): Promise<void> {
		const groupSkill = await this.getExistingGroupsSkillUseCase.execute({
			where: {
				id: id,
			},
		});

		const skillsCount = await this.groupsSkillsRepository.countSkillsByGroupId(groupSkill.id);

		if (skillsCount > 0) {
			throw new BadRequestException('Não é possível excluir um grupo que possui skills associadas');
		}

		await this.groupsSkillsRepository.delete(groupSkill.id);
	}
}
