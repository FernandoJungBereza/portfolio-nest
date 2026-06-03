import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { PostSkillInterface } from './post-skill.interface';

export class PostSkillDto implements PostSkillInterface {
	@ApiProperty({ description: 'The name of the skill' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	@MinLength(2)
	name: string;
}
