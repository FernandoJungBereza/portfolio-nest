import { Injectable, NotFoundException } from '@nestjs/common';
import { PortfolioRepositoryAbstract } from '../../repositories/portfolio.repository.abstract';
import type { PortfolioPayload } from '../../types/portfolio-payload.type';

@Injectable()
export class GetPortfolioUseCase {
	constructor(private readonly portfolioRepository: PortfolioRepositoryAbstract) {}

	async execute(slug = 'default'): Promise<PortfolioPayload> {
		const content = await this.portfolioRepository.findBySlug(slug);

		if (!content) {
			throw new NotFoundException('Conteúdo do portfólio não encontrado. Execute npm run seed.');
		}

		return content.payload;
	}
}
