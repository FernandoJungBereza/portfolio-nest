import { DeleteResult, FindOneOptions, UpdateResult } from 'typeorm';
import { OutPutSkillsFindsDto } from '../dtos/out-put/out-put-skills-finds.dto';
import { PostSkillDto } from '../dtos/post-skill/post-skill.dto';
import { UpdateSkillDto } from '../dtos/update-skill/update-skill.dto';
import { SkillsEntity } from '../entities/skills.entity';

export abstract class SkillsRepositoryAbstract {
	abstract findAll(): Promise<OutPutSkillsFindsDto[]>;
	abstract findOne(criteria: FindOneOptions<SkillsEntity>): Promise<OutPutSkillsFindsDto | null>;
	abstract create(postSkillDto: PostSkillDto): Promise<SkillsEntity>;
	abstract update(id: string, updateSkillDto: UpdateSkillDto): Promise<UpdateResult>;
	abstract delete(id: string): Promise<DeleteResult>;
	abstract save(entity: SkillsEntity): Promise<SkillsEntity>;
}
