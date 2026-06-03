import { Injectable } from '@nestjs/common';
import { PostGroupsSkillDto } from '../../dtos/post-groups-skill/post-groups-skill.dto';
import { GroupsSkillsRepositoryAbstract } from '../../repositories/groups-skills.repository.abstract';
import { ExistGroupsSkillUseCase } from '../exist-groups-skill.use-case';

@Injectable()
export class PostGroupsSkillUseCase {
	constructor(
		private readonly groupsSkillsRepository: GroupsSkillsRepositoryAbstract,
		private readonly existGroupsSkillUseCase: ExistGroupsSkillUseCase,
	) {}

	async execute(postGroupsSkillDto: PostGroupsSkillDto): Promise<void> {
		await this.existGroupsSkillUseCase.execute(postGroupsSkillDto.name);

		const groupSkill = await this.groupsSkillsRepository.create({
			...postGroupsSkillDto,
		});

		await this.groupsSkillsRepository.save(groupSkill);
	}
}
