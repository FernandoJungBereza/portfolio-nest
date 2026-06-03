import { Public } from '@/modules/auth/decorator/public.decorator';
import { ApiOkResponse, ApiStandardErrors } from '@/shared/decorators/swagger-standard-responses.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OutPutSkillsFindsDto } from '../../dtos/out-put/out-put-skills-finds.dto';
import { GetAllSkillsUseCase } from '../../use-cases/get-all-skills/get-all-skills.use-case';
import { GetOneSkillUseCase } from '../../use-cases/get-one-skill/get-one-skill.use-case';

@Controller('skills')
@ApiTags('Skills')
@Public()
export class SkillsPublicController {
	constructor(
		private readonly getAllSkillsUseCase: GetAllSkillsUseCase,
		private readonly getOneSkillUseCase: GetOneSkillUseCase,
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
}
