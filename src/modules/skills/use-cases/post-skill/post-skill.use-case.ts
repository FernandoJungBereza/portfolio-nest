import { GetExistingGroupsSkillUseCase } from '@/modules/groups-skills/use-cases/get-existing-groups-skill.use-case';
import { Injectable } from '@nestjs/common';
import { PostSkillDto } from '../../dtos/post-skill/post-skill.dto';
import { SkillsRepositoryAbstract } from '../../repositories/skills.repository.abstract';
import { ExistSkillUseCase } from '../exist-skill.use-case';

@Injectable()
export class PostSkillUseCase {
	constructor(
		private readonly skillsRepository: SkillsRepositoryAbstract,
		private readonly existSkillUseCase: ExistSkillUseCase,
		private readonly getExistingGroupsSkillUseCase: GetExistingGroupsSkillUseCase,
	) {}

	async execute(postSkillDto: PostSkillDto): Promise<void> {
		await this.getExistingGroupsSkillUseCase.execute(postSkillDto.groupSkillId);

		await this.existSkillUseCase.execute(postSkillDto.name);

		const skill = await this.skillsRepository.create({
			...postSkillDto,
		});

		await this.skillsRepository.save(skill);
	}
}
