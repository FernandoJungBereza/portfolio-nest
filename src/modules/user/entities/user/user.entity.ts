import { TimestampedEntity } from '@/shared/entities/timestamped-entity';
import { Column, Entity } from 'typeorm';
import { UserEntityInterface } from './user.interface';

@Entity({ name: 'users' })
export class UserEntity extends TimestampedEntity implements UserEntityInterface {
	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 255, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 255 })
	password: string;
}
