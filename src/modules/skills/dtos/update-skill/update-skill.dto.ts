import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { UpdateSkillInterface } from './update-skill.interface';

export class UpdateSkillDto implements UpdateSkillInterface {
	@ApiProperty({ description: 'The name of the skill' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	@MinLength(2)
	name: string;

	@ApiProperty({ description: 'The id of the group skill' })
	@IsUUID()
	@IsNotEmpty()
	groupSkillId: string;
}
