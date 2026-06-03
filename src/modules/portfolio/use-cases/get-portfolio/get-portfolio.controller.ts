import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputPortfolioDto } from '../../dtos/output-portfolio.dto';
import { GetPortfolioUseCase } from './get-portfolio.use-case';

@ApiTags('Portfolio')
@Controller('portfolio')
export class GetPortfolioController {
	constructor(private readonly getPortfolioUseCase: GetPortfolioUseCase) {}

	@Get()
	@ApiOperation({ summary: 'Retorna o conteúdo completo do portfólio (slug default)' })
	@ApiResponse({ status: 200, description: 'Conteúdo encontrado', type: OutputPortfolioDto })
	@ApiResponse({ status: 404, description: 'Conteúdo não encontrado' })
	async getDefaultPortfolio() {
		return await this.getPortfolioUseCase.execute('default');
	}

	@Get(':slug')
	@ApiOperation({ summary: 'Retorna o conteúdo do portfólio por slug' })
	@ApiResponse({ status: 200, description: 'Conteúdo encontrado', type: OutputPortfolioDto })
	@ApiResponse({ status: 404, description: 'Conteúdo não encontrado' })
	async getPortfolioBySlug(@Param('slug') slug: string) {
		return await this.getPortfolioUseCase.execute(slug);
	}
}
