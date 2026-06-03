import { GroupsSkillsModule } from '@/modules/groups-skills/groups-skills.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsPrivateController } from './controller/private/skills-private.controller';
import { SkillsPublicController } from './controller/public/skills-public.controller';
import { SkillsEntity } from './entities/skills.entity';
import { SkillsRepository } from './repositories/skills.repository';
import { SkillsRepositoryAbstract } from './repositories/skills.repository.abstract';
import { DeleteSkillUseCase } from './use-cases/delete-skill/delete-skill.use-case';
import { ExistSkillUseCase } from './use-cases/exist-skill.use-case';
import { GetAllSkillsUseCase } from './use-cases/get-all-skills/get-all-skills.use-case';
import { GetExistingSkillUseCase } from './use-cases/get-existing-skill.use-case';
import { GetOneSkillUseCase } from './use-cases/get-one-skill/get-one-skill.use-case';
import { PostSkillUseCase } from './use-cases/post-skill/post-skill.use-case';
import { UpdateSkillUseCase } from './use-cases/update-skill/update-skill.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([SkillsEntity]), GroupsSkillsModule],
	controllers: [SkillsPublicController, SkillsPrivateController],
	providers: [
		PostSkillUseCase,
		GetAllSkillsUseCase,
		GetOneSkillUseCase,
		UpdateSkillUseCase,
		DeleteSkillUseCase,
		ExistSkillUseCase,
		GetExistingSkillUseCase,
		{
			provide: SkillsRepositoryAbstract,
			useClass: SkillsRepository,
		},
	],
})
export class SkillsModule {}
