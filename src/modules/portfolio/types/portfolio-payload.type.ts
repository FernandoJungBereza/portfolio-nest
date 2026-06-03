export type ProjectCategory = 'work' | 'personal';

export type ProjectBentoDecorData =
	| { type: 'marquee'; items: { title: string; subtitle?: string }[]; reverse?: boolean }
	| { type: 'list'; items: { title: string; detail: string }[]; delay?: number }
	| { type: 'orbit'; labels: string[] }
	| { type: 'map' };

export type PortfolioProjectPayload = {
	name: string;
	summary: string;
	role: string;
	technologies: string[];
	href: string;
	cta: string;
	className: string;
	iconName: string;
	accentClass: string;
	category: ProjectCategory;
	bentoDecoration?: ProjectBentoDecorData | null;
};

export type PortfolioPayload = {
	profileImageSrc: string;
	profileImageAlt: string;
	githubProfileUrl: string;
	hero: {
		eyebrow: string;
		name: string;
		role: string;
		intro: string;
	};
	about: {
		location: string;
		bio: string;
		contacts: { label: string; href: string; external?: boolean }[];
	};
	education: {
		degree: string;
		institution: string;
		period: string;
	};
	experience: {
		role: string;
		company: string;
		period: string;
		location: string;
		items: string[];
	}[];
	projectsIntro: string;
	projectsBentoGroups: {
		work: { title: string; subtitle: string };
		personal: { title: string; subtitle: string };
	};
	workProjects: PortfolioProjectPayload[];
	personalProjects: PortfolioProjectPayload[];
	projectBentoDecorations: Record<string, ProjectBentoDecorData>;
	skillsIntro: string;
	skillGroups: { title: string; skills: string[] }[];
	contact: {
		title: string;
		description: string;
		email: string;
		emailHref: string;
		linkedinLabel: string;
		linkedinHref: string;
	};
};
