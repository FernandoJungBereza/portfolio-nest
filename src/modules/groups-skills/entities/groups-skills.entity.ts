import { SkillsEntity } from '@/modules/skills/entities/skills.entity';
import { BaseEntity } from '@/shared/entities/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'groups_skills' })
export class GroupsSkillsEntity extends BaseEntity {
	@Column({ type: 'varchar', length: 255 })
	name: string;

	@OneToMany(() => SkillsEntity, (skill) => skill.groupSkill)
	skills: SkillsEntity[];
}
