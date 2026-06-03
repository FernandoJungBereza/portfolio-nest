import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OutPutGroupsSkillsSummaryDto } from '@/modules/groups-skills/dtos/out-put/out-put-groups-skills-summary.dto';

export class OutPutSkillsFindsDto {
	@ApiProperty({ description: 'The id of the skill' })
	id: string;

	@ApiProperty({ description: 'The name of the skill' })
	name: string;

	@ApiProperty({ description: 'The id of the group skill' })
	groupSkillId: string;

	@ApiPropertyOptional({ description: 'The group skill associated with the skill', type: OutPutGroupsSkillsSummaryDto })
	groupSkill?: OutPutGroupsSkillsSummaryDto;
}
