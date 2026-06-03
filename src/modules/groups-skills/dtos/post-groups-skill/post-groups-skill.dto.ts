import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { PostGroupsSkillInterface } from './post-groups-skill.interface';

export class PostGroupsSkillDto implements PostGroupsSkillInterface {
	@ApiProperty({ description: 'The name of the group skill' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	@MinLength(2)
	name: string;
}
