import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule, EnvService } from './config/env';
import { createTypeOrmConfig } from './config/typeorm.config';
import { GroupsSkillsModule } from './modules/groups-skills/groups-skills.module';
import { SkillsModule } from './modules/skills/skills.module';

@Module({
	imports: [
		EnvModule,
		TypeOrmModule.forRootAsync({
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: createTypeOrmConfig,
		}),
		GroupsSkillsModule,
		SkillsModule,
	],
})
export class AppModule {}
