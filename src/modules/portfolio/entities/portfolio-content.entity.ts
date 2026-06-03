import { TimestampedEntity } from '@/shared/entities/timestamped-entity';
import { Column, Entity, Index } from 'typeorm';
import type { PortfolioPayload } from '../types/portfolio-payload.type';

@Entity('portfolio_contents')
export class PortfolioContentEntity extends TimestampedEntity {
	@Index({ unique: true })
	@Column({ type: 'varchar', length: 64, default: 'default' })
	slug: string;

	@Column({ type: 'jsonb' })
	payload: PortfolioPayload;
}
