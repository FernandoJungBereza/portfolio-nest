import { GetExistingGroupsSkillUseCase } from '@/modules/groups-skills/use-cases/get-existing-groups-skill.use-case';
import { Injectable } from '@nestjs/common';
import { UpdateSkillDto } from '../../dtos/update-skill/update-skill.dto';
import { SkillsRepositoryAbstract } from '../../repositories/skills.repository.abstract';
import { ExistSkillUseCase } from '../exist-skill.use-case';
import { GetExistingSkillUseCase } from '../get-existing-skill.use-case';

@Injectable()
export class UpdateSkillUseCase {
	constructor(
		private readonly skillsRepository: SkillsRepositoryAbstract,
		private readonly getExistingSkillUseCase: GetExistingSkillUseCase,
		private readonly existSkillUseCase: ExistSkillUseCase,
		private readonly getExistingGroupsSkillUseCase: GetExistingGroupsSkillUseCase,
	) {}

	async execute(id: string, updateSkillDto: UpdateSkillDto): Promise<void> {
		const skill = await this.getExistingSkillUseCase.execute({
			where: {
				id: id,
			},
		});

		await this.getExistingGroupsSkillUseCase.execute({
			where: {
				id: updateSkillDto.groupSkillId,
			},
		});

		if (updateSkillDto.name !== skill.name) {
			await this.existSkillUseCase.execute({
				where: {
					name: updateSkillDto.name,
				},
			});
		}

		await this.skillsRepository.update(skill.id, {
			...updateSkillDto,
		});
	}
}
