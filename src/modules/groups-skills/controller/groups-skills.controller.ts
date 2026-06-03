import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutPutGroupsSkillsFindsDto } from '../dtos/out-put/out-put-groups-skills-finds.dto';
import { PostGroupsSkillDto } from '../dtos/post-groups-skill/post-groups-skill.dto';
import { UpdateGroupsSkillDto } from '../dtos/update-groups-skill/update-groups-skill.dto';
import { DeleteGroupsSkillUseCase } from '../use-cases/delete-groups-skill/delete-groups-skill.use-case';
import { GetAllGroupsSkillsUseCase } from '../use-cases/get-all-groups-skills/get-all-groups-skills.use-case';
import { GetOneGroupsSkillUseCase } from '../use-cases/get-one-groups-skill/get-one-groups-skill.use-case';
import { PostGroupsSkillUseCase } from '../use-cases/post-groups-skill/post-groups-skill.use-case';
import { UpdateGroupsSkillUseCase } from '../use-cases/update-groups-skill/update-groups-skill.use-case';

@ApiTags('Groups Skills')
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
	@ApiOperation({ summary: 'Get all groups skills' })
	@ApiResponse({ status: 200, description: 'Groups skills found successfully' })
	async getAllGroupsSkills(): Promise<OutPutGroupsSkillsFindsDto[]> {
		return this.getAllGroupsSkillsUseCase.execute();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get one group skill' })
	@ApiResponse({ status: 200, description: 'Group skill found successfully' })
	@ApiResponse({ status: 404, description: 'Group skill not found' })
	async getOneGroupsSkill(@Param('id') id: string): Promise<OutPutGroupsSkillsFindsDto> {
		return this.getOneGroupsSkillUseCase.execute(id);
	}

	@Post()
	@ApiOperation({ summary: 'Create group skill' })
	@ApiResponse({ status: 201, description: 'Group skill created successfully' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	async postGroupsSkill(@Body() createGroupsSkillDto: PostGroupsSkillDto): Promise<void> {
		return this.postGroupsSkillUseCase.execute(createGroupsSkillDto);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update group skill' })
	@ApiResponse({ status: 200, description: 'Group skill updated successfully' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 404, description: 'Group skill not found' })
	async updateGroupsSkill(
		@Param('id') id: string,
		@Body() updateGroupsSkillDto: UpdateGroupsSkillDto,
	): Promise<void> {
		return this.updateGroupsSkillUseCase.execute(id, updateGroupsSkillDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete group skill' })
	@ApiResponse({ status: 200, description: 'Group skill deleted successfully' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 404, description: 'Group skill not found' })
	async deleteGroupsSkill(@Param('id') id: string): Promise<void> {
		return this.deleteGroupsSkillUseCase.execute(id);
	}
}
