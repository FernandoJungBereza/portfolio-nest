import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioContentEntity } from '../entities/portfolio-content.entity';
import type { PortfolioPayload } from '../types/portfolio-payload.type';
import { PortfolioRepositoryAbstract } from './portfolio.repository.abstract';

@Injectable()
export class PortfolioRepository extends PortfolioRepositoryAbstract {
	constructor(
		@InjectRepository(PortfolioContentEntity)
		private readonly repository: Repository<PortfolioContentEntity>,
	) {
		super();
	}

	async findBySlug(slug: string): Promise<PortfolioContentEntity | null> {
		return this.repository.findOne({ where: { slug } });
	}

	async savePayload(slug: string, payload: PortfolioPayload): Promise<PortfolioContentEntity> {
		const existing = await this.findBySlug(slug);

		if (existing) {
			existing.payload = payload;
			return this.repository.save(existing);
		}

		const created = this.repository.create({ slug, payload });
		return this.repository.save(created);
	}
}
