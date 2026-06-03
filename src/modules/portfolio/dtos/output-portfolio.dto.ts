import { ApiProperty } from '@nestjs/swagger';
import type { PortfolioPayload } from '../types/portfolio-payload.type';

export class OutputPortfolioDto implements PortfolioPayload {
	@ApiProperty()
	profileImageSrc: string;

	@ApiProperty()
	profileImageAlt: string;

	@ApiProperty()
	githubProfileUrl: string;

	@ApiProperty()
	hero: PortfolioPayload['hero'];

	@ApiProperty()
	about: PortfolioPayload['about'];

	@ApiProperty()
	education: PortfolioPayload['education'];

	@ApiProperty()
	experience: PortfolioPayload['experience'];

	@ApiProperty()
	projectsIntro: string;

	@ApiProperty()
	projectsBentoGroups: PortfolioPayload['projectsBentoGroups'];

	@ApiProperty()
	workProjects: PortfolioPayload['workProjects'];

	@ApiProperty()
	personalProjects: PortfolioPayload['personalProjects'];

	@ApiProperty()
	projectBentoDecorations: PortfolioPayload['projectBentoDecorations'];

	@ApiProperty()
	skillsIntro: string;

	@ApiProperty()
	skillGroups: PortfolioPayload['skillGroups'];

	@ApiProperty()
	contact: PortfolioPayload['contact'];
}
