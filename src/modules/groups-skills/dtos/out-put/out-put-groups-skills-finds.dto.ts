import { ApiProperty } from '@nestjs/swagger';
import { OutPutGroupsSkillsSkillDto } from './out-put-groups-skills-skill.dto';

export class OutPutGroupsSkillsFindsDto {
	@ApiProperty({ description: 'The id of the group skill' })
	id: string;

	@ApiProperty({ description: 'The name of the group skill' })
	name: string;

	@ApiProperty({ description: 'The skills associated with the group', type: [OutPutGroupsSkillsSkillDto] })
	skills: OutPutGroupsSkillsSkillDto[];
}
