import { Injectable } from '@nestjs/common';
import { OutPutSkillsFindsDto } from '../../dtos/out-put/out-put-skills-finds.dto';
import { GetExistingSkillUseCase } from '../get-existing-skill.use-case';

@Injectable()
export class GetOneSkillUseCase {
	constructor(private readonly getExistingSkillUseCase: GetExistingSkillUseCase) {}

	async execute(id: string): Promise<OutPutSkillsFindsDto> {
		const skill = await this.getExistingSkillUseCase.execute({
			where: {
				id: id,
			},
		});

		return skill;
	}
}
