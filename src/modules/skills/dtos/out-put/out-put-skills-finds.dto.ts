import { OutPutGroupsSkillsSummaryDto } from '@/modules/groups-skills/dtos/out-put/out-put-groups-skills-summary.dto';

export class OutPutSkillsFindsDto {
	id: string;
	name: string;
	groupSkillId: string;
	groupSkill?: OutPutGroupsSkillsSummaryDto;
}
