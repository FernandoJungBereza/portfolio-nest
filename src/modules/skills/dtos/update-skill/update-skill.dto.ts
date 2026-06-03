import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { UpdateSkillInterface } from './update-skill.interface';

export class UpdateSkillDto implements UpdateSkillInterface {
	@ApiProperty({ description: 'The name of the skill' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	@MinLength(2)
	name: string;
}
