import { Injectable } from '@nestjs/common';
import { SkillsRepositoryAbstract } from '../../repositories/skills.repository.abstract';
import { GetExistingSkillUseCase } from '../get-existing-skill.use-case';

@Injectable()
export class DeleteSkillUseCase {
	constructor(
		private readonly skillsRepository: SkillsRepositoryAbstract,
		private readonly getExistingSkillUseCase: GetExistingSkillUseCase,
	) {}

	async execute(id: string): Promise<void> {
		const skill = await this.getExistingSkillUseCase.execute({
			where: {
				id: id,
			},
		});

		await this.skillsRepository.delete(skill.id);
	}
}
