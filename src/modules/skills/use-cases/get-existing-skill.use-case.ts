import { Injectable, NotFoundException } from '@nestjs/common';
import { OutPutSkillsFindsDto } from '../dtos/out-put/out-put-skills-finds.dto';
import { SkillsRepositoryAbstract } from '../repositories/skills.repository.abstract';

@Injectable()
export class GetExistingSkillUseCase {
	constructor(private readonly skillsRepository: SkillsRepositoryAbstract) {}

	async execute(id: string): Promise<OutPutSkillsFindsDto> {
		const skill = await this.skillsRepository.findOne(id);

		if (!skill) {
			throw new NotFoundException(`Skill não encontrada com id: ${id}`);
		}

		return skill;
	}
}
