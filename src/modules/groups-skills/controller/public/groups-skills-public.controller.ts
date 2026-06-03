import { Public } from '@/modules/auth/decorator/public.decorator';
import { ApiOkResponse, ApiStandardErrors } from '@/shared/decorators/swagger-standard-responses.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OutPutGroupsSkillsFindsDto } from '../../dtos/out-put/out-put-groups-skills-finds.dto';
import { GetAllGroupsSkillsUseCase } from '../../use-cases/get-all-groups-skills/get-all-groups-skills.use-case';
import { GetOneGroupsSkillUseCase } from '../../use-cases/get-one-groups-skill/get-one-groups-skill.use-case';

@Controller('groups-skills')
@ApiTags('Groups Skills')
@Public()
export class GroupsSkillsPublicController {
	constructor(
		private readonly getAllGroupsSkillsUseCase: GetAllGroupsSkillsUseCase,
		private readonly getOneGroupsSkillUseCase: GetOneGroupsSkillUseCase,
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all groups skills' })
	@ApiOkResponse({
		description: 'Groups skills found successfully',
		type: OutPutGroupsSkillsFindsDto,
		isArray: true,
	})
	@ApiStandardErrors()
	async getAllGroupsSkills(): Promise<OutPutGroupsSkillsFindsDto[]> {
		return this.getAllGroupsSkillsUseCase.execute();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get one group skill' })
	@ApiOkResponse({ description: 'Group skill found successfully', type: OutPutGroupsSkillsFindsDto })
	@ApiStandardErrors()
	async getOneGroupsSkill(@Param('id') id: string): Promise<OutPutGroupsSkillsFindsDto> {
		return this.getOneGroupsSkillUseCase.execute(id);
	}
}
