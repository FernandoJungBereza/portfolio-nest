import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
	ApiCreatedResponse,
	ApiDeletedResponse,
	ApiOkResponse,
	ApiStandardErrors,
	ApiUpdatedResponse,
} from '@/shared/decorators/swagger-standard-responses.decorator';
import { OutPutSkillsFindsDto } from '../dtos/out-put/out-put-skills-finds.dto';
import { PostSkillDto } from '../dtos/post-skill/post-skill.dto';
import { UpdateSkillDto } from '../dtos/update-skill/update-skill.dto';
import { DeleteSkillUseCase } from '../use-cases/delete-skill/delete-skill.use-case';
import { GetAllSkillsUseCase } from '../use-cases/get-all-skills/get-all-skills.use-case';
import { GetOneSkillUseCase } from '../use-cases/get-one-skill/get-one-skill.use-case';
import { PostSkillUseCase } from '../use-cases/post-skill/post-skill.use-case';
import { UpdateSkillUseCase } from '../use-cases/update-skill/update-skill.use-case';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
	constructor(
		private readonly getAllSkillsUseCase: GetAllSkillsUseCase,
		private readonly getOneSkillUseCase: GetOneSkillUseCase,
		private readonly postSkillUseCase: PostSkillUseCase,
		private readonly updateSkillUseCase: UpdateSkillUseCase,
		private readonly deleteSkillUseCase: DeleteSkillUseCase,
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all skills' })
	@ApiOkResponse({ description: 'Skills found successfully', type: OutPutSkillsFindsDto, isArray: true })
	@ApiStandardErrors()
	async getAllSkills(): Promise<OutPutSkillsFindsDto[]> {
		return this.getAllSkillsUseCase.execute();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get one skill' })
	@ApiOkResponse({ description: 'Skill found successfully', type: OutPutSkillsFindsDto })
	@ApiStandardErrors()
	async getOneSkill(@Param('id') id: string): Promise<OutPutSkillsFindsDto> {
		return this.getOneSkillUseCase.execute(id);
	}

	@Post()
	@ApiOperation({ summary: 'Create skill' })
	@ApiCreatedResponse('Skill created successfully')
	@ApiStandardErrors()
	async postSkill(@Body() createSkillDto: PostSkillDto): Promise<void> {
		return this.postSkillUseCase.execute(createSkillDto);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update skill' })
	@ApiUpdatedResponse('Skill updated successfully')
	@ApiStandardErrors()
	async updateSkill(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto): Promise<void> {
		return this.updateSkillUseCase.execute(id, updateSkillDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete skill' })
	@ApiDeletedResponse('Skill deleted successfully')
	@ApiStandardErrors()
	async deleteSkill(@Param('id') id: string): Promise<void> {
		return this.deleteSkillUseCase.execute(id);
	}
}
