import { BaseEntity } from '@/shared/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'skills' })
export class SkillsEntity extends BaseEntity {
	@Column({ type: 'varchar', length: 255 })
	name: string;
}
