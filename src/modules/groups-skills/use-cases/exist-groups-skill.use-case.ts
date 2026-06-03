import { BadRequestException, Injectable } from '@nestjs/common';
import { GroupsSkillsRepositoryAbstract } from '../repositories/groups-skills.repository.abstract';

@Injectable()
export class ExistGroupsSkillUseCase {
	constructor(private readonly groupsSkillsRepository: GroupsSkillsRepositoryAbstract) {}

	async execute(name: string) {
		const groupSkill = await this.groupsSkillsRepository.findOneByName(name);

		if (groupSkill) {
			throw new BadRequestException(`Grupo de skill já existe com o nome: ${name}`);
		}
	}
}
