import 'dotenv/config';
import { readFileSync } from 'fs';
import path from 'path';
import dataSource from '../typeorm.datasource';
import { PortfolioContentEntity } from '@/modules/portfolio/entities/portfolio-content.entity';
import type { PortfolioPayload } from '@/modules/portfolio/types/portfolio-payload.type';

async function runSeed() {
	await dataSource.initialize();

	const payloadPath = path.resolve(__dirname, 'portfolio.default-payload.json');
	const payload = JSON.parse(readFileSync(payloadPath, 'utf8')) as PortfolioPayload;

	const repository = dataSource.getRepository(PortfolioContentEntity);
	const existing = await repository.findOne({ where: { slug: 'default' } });

	if (existing) {
		existing.payload = payload;
		await repository.save(existing);
		console.log('Seed atualizado (slug: default)');
	} else {
		await repository.save(repository.create({ slug: 'default', payload }));
		console.log('Seed criado (slug: default)');
	}

	await dataSource.destroy();
}

runSeed().catch((error) => {
	console.error(error);
	process.exit(1);
});
