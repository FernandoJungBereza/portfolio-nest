import { formatWhereClause } from '@/shared/helpers/format-where-clause.helper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { SkillsEntity } from '../entities/skills.entity';
import { SkillsRepositoryAbstract } from '../repositories/skills.repository.abstract';

@Injectable()
export class ExistSkillUseCase {
	constructor(private readonly skillsRepository: SkillsRepositoryAbstract) {}

	async execute(criteria: FindOneOptions<SkillsEntity>) {
		const skill = await this.skillsRepository.findOne(criteria);

		if (skill) {
			const where = criteria.where || [];
			const whereClause = formatWhereClause(where);

			throw new BadRequestException(`Skill já existe com os critérios: ${whereClause}`);
		}
	}
}
