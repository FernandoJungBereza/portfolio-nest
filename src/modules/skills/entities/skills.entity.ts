import { GroupsSkillsEntity } from '@/modules/groups-skills/entities/groups-skills.entity';
import { BaseEntity } from '@/shared/entities/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'skills' })
export class SkillsEntity extends BaseEntity {
	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ name: 'group_skill_id', type: 'uuid' })
	groupSkillId: string;

	@ManyToOne(() => GroupsSkillsEntity, (groupSkill) => groupSkill.skills, {
		onDelete: 'RESTRICT',
	})
	@JoinColumn({ name: 'group_skill_id' })
	groupSkill: GroupsSkillsEntity;
}
