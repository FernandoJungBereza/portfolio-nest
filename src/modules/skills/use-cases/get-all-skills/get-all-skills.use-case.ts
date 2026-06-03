import { Injectable } from '@nestjs/common';
import { SkillsRepositoryAbstract } from '../../repositories/skills.repository.abstract';
import { OutPutSkillsFindsDto } from '../../dtos/out-put/out-put-skills-finds.dto';

@Injectable()
export class GetAllSkillsUseCase {
	constructor(private readonly skillsRepository: SkillsRepositoryAbstract) {}

	async execute(): Promise<OutPutSkillsFindsDto[]> {
		return this.skillsRepository.findAll();
	}
}
