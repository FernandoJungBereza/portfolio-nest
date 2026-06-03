import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule, EnvService } from './config/env';
import { createTypeOrmConfig } from './config/typeorm.config';
import { PortfolioModule } from './modules/portfolio/portfolio.module';

@Module({
	imports: [
		EnvModule,
		TypeOrmModule.forRootAsync({
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: createTypeOrmConfig,
		}),
		PortfolioModule,
	],
})
export class AppModule {}
