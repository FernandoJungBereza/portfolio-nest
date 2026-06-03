import { SkillsEntity } from '@/modules/skills/entities/skills.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsSkillsPrivateController } from './controller/private/groups-skills-private.controller';
import { GroupsSkillsPublicController } from './controller/public/groups-skills-public.controller';
import { GroupsSkillsEntity } from './entities/groups-skills.entity';
import { GroupsSkillsRepository } from './repositories/groups-skills.repository';
import { GroupsSkillsRepositoryAbstract } from './repositories/groups-skills.repository.abstract';
import { DeleteGroupsSkillUseCase } from './use-cases/delete-groups-skill/delete-groups-skill.use-case';
import { ExistGroupsSkillUseCase } from './use-cases/exist-groups-skill.use-case';
import { GetAllGroupsSkillsUseCase } from './use-cases/get-all-groups-skills/get-all-groups-skills.use-case';
import { GetExistingGroupsSkillUseCase } from './use-cases/get-existing-groups-skill.use-case';
import { GetOneGroupsSkillUseCase } from './use-cases/get-one-groups-skill/get-one-groups-skill.use-case';
import { PostGroupsSkillUseCase } from './use-cases/post-groups-skill/post-groups-skill.use-case';
import { UpdateGroupsSkillUseCase } from './use-cases/update-groups-skill/update-groups-skill.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([GroupsSkillsEntity, SkillsEntity])],
	controllers: [GroupsSkillsPublicController, GroupsSkillsPrivateController],
	providers: [
		PostGroupsSkillUseCase,
		GetAllGroupsSkillsUseCase,
		GetOneGroupsSkillUseCase,
		UpdateGroupsSkillUseCase,
		DeleteGroupsSkillUseCase,
		ExistGroupsSkillUseCase,
		GetExistingGroupsSkillUseCase,
		{
			provide: GroupsSkillsRepositoryAbstract,
			useClass: GroupsSkillsRepository,
		},
	],
	exports: [GetExistingGroupsSkillUseCase],
})
export class GroupsSkillsModule {}
