import { ApiProperty } from '@nestjs/swagger';

export class OutPutGroupsSkillsSkillDto {
	@ApiProperty({ description: 'The id of the skill' })
	id: string;

	@ApiProperty({ description: 'The name of the skill' })
	name: string;
}
