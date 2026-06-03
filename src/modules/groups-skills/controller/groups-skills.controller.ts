import { Public } from '@/modules/auth/decorator/public.decorator';
import { RequireAdmin } from '@/modules/permissions/decorators/require-permission.decorator';
import {
	ApiCreatedResponse,
	ApiDeletedResponse,
	ApiOkResponse,
	ApiStandardErrors,
	ApiUpdatedResponse,
} from '@/shared/decorators/swagger-standard-responses.decorator';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OutPutGroupsSkillsFindsDto } from '../dtos/out-put/out-put-groups-skills-finds.dto';
import { PostGroupsSkillDto } from '../dtos/post-groups-skill/post-groups-skill.dto';
import { UpdateGroupsSkillDto } from '../dtos/update-groups-skill/update-groups-skill.dto';
import { DeleteGroupsSkillUseCase } from '../use-cases/delete-groups-skill/delete-groups-skill.use-case';
import { GetAllGroupsSkillsUseCase } from '../use-cases/get-all-groups-skills/get-all-groups-skills.use-case';
import { GetOneGroupsSkillUseCase } from '../use-cases/get-one-groups-skill/get-one-groups-skill.use-case';
import { PostGroupsSkillUseCase } from '../use-cases/post-groups-skill/post-groups-skill.use-case';
import { UpdateGroupsSkillUseCase } from '../use-cases/update-groups-skill/update-groups-skill.use-case';

@ApiTags('Groups Skills')
@RequireAdmin()
@Controller('groups-skills')
export class GroupsSkillsController {
	constructor(
		private readonly getAllGroupsSkillsUseCase: GetAllGroupsSkillsUseCase,
		private readonly getOneGroupsSkillUseCase: GetOneGroupsSkillUseCase,
		private readonly postGroupsSkillUseCase: PostGroupsSkillUseCase,
		private readonly updateGroupsSkillUseCase: UpdateGroupsSkillUseCase,
		private readonly deleteGroupsSkillUseCase: DeleteGroupsSkillUseCase,
	) {}

	@Get()
	@Public()
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
	@Public()
	@ApiOperation({ summary: 'Get one group skill' })
	@ApiOkResponse({ description: 'Group skill found successfully', type: OutPutGroupsSkillsFindsDto })
	@ApiStandardErrors()
	async getOneGroupsSkill(@Param('id') id: string): Promise<OutPutGroupsSkillsFindsDto> {
		return this.getOneGroupsSkillUseCase.execute(id);
	}

	@Post()
	@RequireAdmin()
	@ApiOperation({ summary: 'Create group skill' })
	@ApiCreatedResponse('Group skill created successfully')
	@ApiStandardErrors()
	async postGroupsSkill(@Body() createGroupsSkillDto: PostGroupsSkillDto): Promise<void> {
		return this.postGroupsSkillUseCase.execute(createGroupsSkillDto);
	}

	@Patch(':id')
	@RequireAdmin()
	@ApiOperation({ summary: 'Update group skill' })
	@ApiUpdatedResponse('Group skill updated successfully')
	@ApiStandardErrors()
	async updateGroupsSkill(
		@Param('id') id: string,
		@Body() updateGroupsSkillDto: UpdateGroupsSkillDto,
	): Promise<void> {
		return this.updateGroupsSkillUseCase.execute(id, updateGroupsSkillDto);
	}

	@Delete(':id')
	@RequireAdmin()
	@ApiOperation({ summary: 'Delete group skill' })
	@ApiDeletedResponse('Group skill deleted successfully')
	@ApiStandardErrors()
	async deleteGroupsSkill(@Param('id') id: string): Promise<void> {
		return this.deleteGroupsSkillUseCase.execute(id);
	}
}
