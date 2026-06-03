import { BadRequestException, Injectable } from '@nestjs/common';
import { SkillsRepositoryAbstract } from '../repositories/skills.repository.abstract';

@Injectable()
export class ExistSkillUseCase {
	constructor(private readonly skillsRepository: SkillsRepositoryAbstract) {}

	async execute(name: string) {
		const skill = await this.skillsRepository.findOneByName(name);

		if (skill) {
			throw new BadRequestException(`Skill já existe com o nome: ${name}`);
		}
	}
}
