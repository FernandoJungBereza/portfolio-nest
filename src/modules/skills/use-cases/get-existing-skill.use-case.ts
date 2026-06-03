import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { OutPutSkillsFindsDto } from '../dtos/out-put/out-put-skills-finds.dto';
import { SkillsEntity } from '../entities/skills.entity';
import { SkillsRepositoryAbstract } from '../repositories/skills.repository.abstract';

@Injectable()
export class GetExistingSkillUseCase {
	constructor(private readonly skillsRepository: SkillsRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<SkillsEntity>): Promise<OutPutSkillsFindsDto> {
		const skill = await this.skillsRepository.findOne(criteria);

		if (!skill) {
			const whereClause = formatWhereClause(criteria.where || []);

			throw new NotFoundException(`Skill não encontrada com os critérios: ${whereClause}`);
		}

		return skill;
	}
}
