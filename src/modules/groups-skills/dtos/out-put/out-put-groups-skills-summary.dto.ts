import { ApiProperty } from '@nestjs/swagger';

export class OutPutGroupsSkillsSummaryDto {
	@ApiProperty({ description: 'The id of the group skill' })
	id: string;

	@ApiProperty({ description: 'The name of the group skill' })
	name: string;
}
