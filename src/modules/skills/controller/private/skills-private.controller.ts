import { RequireAdmin } from '@/modules/permissions/decorators/require-permission.decorator';
import {
	ApiDeletedResponse,
	ApiStandardErrors,
	ApiUpdatedResponse,
} from '@/shared/decorators/swagger-standard-responses.decorator';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostSkillDto } from '../../dtos/post-skill/post-skill.dto';
import { UpdateSkillDto } from '../../dtos/update-skill/update-skill.dto';
import { DeleteSkillUseCase } from '../../use-cases/delete-skill/delete-skill.use-case';
import { PostSkillUseCase } from '../../use-cases/post-skill/post-skill.use-case';
import { UpdateSkillUseCase } from '../../use-cases/update-skill/update-skill.use-case';

@Controller('admin/skills')
@ApiTags('Skills')
@RequireAdmin()
export class SkillsPrivateController {
	constructor(
		private readonly postSkillUseCase: PostSkillUseCase,
		private readonly updateSkillUseCase: UpdateSkillUseCase,
		private readonly deleteSkillUseCase: DeleteSkillUseCase,
	) {}

	@Post('')
	@ApiOperation({ summary: 'Create skill' })
	@ApiDeletedResponse('Skill created successfully')
	@ApiStandardErrors()
	async postSkill(@Body() createSkillDto: PostSkillDto): Promise<void> {
		return this.postSkillUseCase.execute(createSkillDto);
	}

	@Patch('/:id')
	@ApiOperation({ summary: 'Update skill' })
	@ApiUpdatedResponse('Skill updated successfully')
	@ApiStandardErrors()
	async updateSkill(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto): Promise<void> {
		return this.updateSkillUseCase.execute(id, updateSkillDto);
	}

	@Delete('/:id')
	@ApiOperation({ summary: 'Delete skill' })
	@ApiDeletedResponse('Skill deleted successfully')
	@ApiStandardErrors()
	async deleteSkill(@Param('id') id: string): Promise<void> {
		return this.deleteSkillUseCase.execute(id);
	}
}
