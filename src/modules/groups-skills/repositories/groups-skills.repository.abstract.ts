import { DeleteResult, UpdateResult } from 'typeorm';
import { OutPutGroupsSkillsFindsDto } from '../dtos/out-put/out-put-groups-skills-finds.dto';
import { PostGroupsSkillDto } from '../dtos/post-groups-skill/post-groups-skill.dto';
import { GroupsSkillsEntity } from '../entities/groups-skills.entity';

export abstract class GroupsSkillsRepositoryAbstract {
	abstract findAll(): Promise<OutPutGroupsSkillsFindsDto[]>;
	abstract findOne(id: string): Promise<OutPutGroupsSkillsFindsDto | null>;
	abstract findOneByName(name: string): Promise<OutPutGroupsSkillsFindsDto | null>;
	abstract create(postGroupsSkillDto: PostGroupsSkillDto): Promise<GroupsSkillsEntity>;
	abstract update(id: string, postGroupsSkillDto: PostGroupsSkillDto): Promise<UpdateResult>;
	abstract delete(id: string): Promise<DeleteResult>;
	abstract save(entity: GroupsSkillsEntity): Promise<GroupsSkillsEntity>;
	abstract countSkillsByGroupId(groupSkillId: string): Promise<number>;
}
