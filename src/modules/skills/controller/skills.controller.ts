import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
	@ApiResponse({ status: 200, description: 'Skills found successfully' })
	@ApiResponse({ status: 404, description: 'Skills not found' })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	@ApiResponse({ status: 406, description: 'Not acceptable' })
	@ApiResponse({ status: 409, description: 'Conflict' })
	@ApiResponse({ status: 410, description: 'Gone' })
	@ApiResponse({ status: 412, description: 'Precondition failed' })
	async getAllSkills(): Promise<OutPutSkillsFindsDto[]> {
		return this.getAllSkillsUseCase.execute();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get one skill' })
	@ApiResponse({ status: 200, description: 'Skill found successfully' })
	@ApiResponse({ status: 404, description: 'Skill not found' })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	@ApiResponse({ status: 406, description: 'Not acceptable' })
	@ApiResponse({ status: 409, description: 'Conflict' })
	@ApiResponse({ status: 410, description: 'Gone' })
	@ApiResponse({ status: 412, description: 'Precondition failed' })
	async getOneSkill(id: string): Promise<OutPutSkillsFindsDto> {
		return this.getOneSkillUseCase.execute(id);
	}

	@Post()
	@ApiOperation({ summary: 'Create skill' })
	@ApiResponse({ status: 201, description: 'Skill created successfully' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	@ApiResponse({ status: 406, description: 'Not acceptable' })
	@ApiResponse({ status: 409, description: 'Conflict' })
	@ApiResponse({ status: 410, description: 'Gone' })
	@ApiResponse({ status: 412, description: 'Precondition failed' })
	async postSkill(createSkillDto: PostSkillDto): Promise<void> {
		return this.postSkillUseCase.execute(createSkillDto);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update skill' })
	@ApiResponse({ status: 200, description: 'Skill updated successfully' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	@ApiResponse({ status: 406, description: 'Not acceptable' })
	@ApiResponse({ status: 409, description: 'Conflict' })
	@ApiResponse({ status: 410, description: 'Gone' })
	@ApiResponse({ status: 412, description: 'Precondition failed' })
	async updateSkill(id: string, updateSkillDto: UpdateSkillDto): Promise<void> {
		return this.updateSkillUseCase.execute(id, updateSkillDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete skill' })
	@ApiResponse({ status: 200, description: 'Skill deleted successfully' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	@ApiResponse({ status: 406, description: 'Not acceptable' })
	@ApiResponse({ status: 409, description: 'Conflict' })
	@ApiResponse({ status: 410, description: 'Gone' })
	@ApiResponse({ status: 412, description: 'Precondition failed' })
	async deleteSkill(id: string): Promise<void> {
		return this.deleteSkillUseCase.execute(id);
	}
}
