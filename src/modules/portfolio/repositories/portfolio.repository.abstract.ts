import { PortfolioContentEntity } from '../entities/portfolio-content.entity';
import type { PortfolioPayload } from '../types/portfolio-payload.type';

export abstract class PortfolioRepositoryAbstract {
	abstract findBySlug(slug: string): Promise<PortfolioContentEntity | null>;
	abstract savePayload(slug: string, payload: PortfolioPayload): Promise<PortfolioContentEntity>;
}
