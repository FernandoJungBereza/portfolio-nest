import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioContentEntity } from './entities/portfolio-content.entity';
import { GetPortfolioController } from './use-cases/get-portfolio/get-portfolio.controller';
import { GetPortfolioUseCase } from './use-cases/get-portfolio/get-portfolio.use-case';
import { PortfolioRepository } from './repositories/portfolio.repository';
import { PortfolioRepositoryAbstract } from './repositories/portfolio.repository.abstract';

@Module({
	imports: [TypeOrmModule.forFeature([PortfolioContentEntity])],
	controllers: [GetPortfolioController],
	providers: [
		GetPortfolioUseCase,
		{
			provide: PortfolioRepositoryAbstract,
			useClass: PortfolioRepository,
		},
	],
})
export class PortfolioModule {}
