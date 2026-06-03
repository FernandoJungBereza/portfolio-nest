import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UpdateGroupsSkillInterface } from './update-groups-skill.interface';

export class UpdateGroupsSkillDto implements UpdateGroupsSkillInterface {
	@ApiProperty({ description: 'The name of the group skill' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	@MinLength(2)
	name: string;
}
