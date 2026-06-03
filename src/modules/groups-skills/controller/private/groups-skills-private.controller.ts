import { RequireAdmin } from '@/modules/permissions/decorators/require-permission.decorator';
import {
	ApiCreatedResponse,
	ApiDeletedResponse,
	ApiStandardErrors,
	ApiUpdatedResponse,
} from '@/shared/decorators/swagger-standard-responses.decorator';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostGroupsSkillDto } from '../../dtos/post-groups-skill/post-groups-skill.dto';
import { UpdateGroupsSkillDto } from '../../dtos/update-groups-skill/update-groups-skill.dto';
import { DeleteGroupsSkillUseCase } from '../../use-cases/delete-groups-skill/delete-groups-skill.use-case';
import { PostGroupsSkillUseCase } from '../../use-cases/post-groups-skill/post-groups-skill.use-case';
import { UpdateGroupsSkillUseCase } from '../../use-cases/update-groups-skill/update-groups-skill.use-case';

@Controller('admin/groups-skills')
@ApiTags('Groups Skills')
@RequireAdmin()
export class GroupsSkillsPrivateController {
	constructor(
		private readonly postGroupsSkillUseCase: PostGroupsSkillUseCase,
		private readonly updateGroupsSkillUseCase: UpdateGroupsSkillUseCase,
		private readonly deleteGroupsSkillUseCase: DeleteGroupsSkillUseCase,
	) {}

	@Post()
	@ApiOperation({ summary: 'Create group skill' })
	@ApiCreatedResponse('Group skill created successfully')
	@ApiStandardErrors()
	async postGroupsSkill(@Body() createGroupsSkillDto: PostGroupsSkillDto): Promise<void> {
		return this.postGroupsSkillUseCase.execute(createGroupsSkillDto);
	}

	@Patch(':id')
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
	@ApiOperation({ summary: 'Delete group skill' })
	@ApiDeletedResponse('Group skill deleted successfully')
	@ApiStandardErrors()
	async deleteGroupsSkill(@Param('id') id: string): Promise<void> {
		return this.deleteGroupsSkillUseCase.execute(id);
	}
}
