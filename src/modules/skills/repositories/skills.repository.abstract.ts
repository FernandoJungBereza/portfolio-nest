import { DeleteResult, FindOneOptions, UpdateResult } from 'typeorm';
import { OutPutSkillsFindsDto } from '../dtos/out-put/out-put-skills-finds.dto';
import { PostSkillDto } from '../dtos/post-skill/post-skill.dto';
import { SkillsEntity } from '../entities/skills.entity';

export abstract class SkillsRepositoryAbstract {
	abstract findAll(): Promise<OutPutSkillsFindsDto[]>;
	abstract findOne(criteria: FindOneOptions<SkillsEntity>): Promise<OutPutSkillsFindsDto | null>;
	abstract create(postSkillDto: PostSkillDto): Promise<SkillsEntity>;
	abstract update(id: string, postSkillDto: PostSkillDto): Promise<UpdateResult>;
	abstract delete(id: string): Promise<DeleteResult>;
	abstract save(entity: SkillsEntity): Promise<SkillsEntity>;
}
