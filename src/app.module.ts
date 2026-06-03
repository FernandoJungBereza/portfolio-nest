import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule, EnvService } from './config/env';
import { createTypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { GroupsSkillsModule } from './modules/groups-skills/groups-skills.module';
import { SkillsModule } from './modules/skills/skills.module';
import { UserModule } from './modules/user/user.module';

@Module({
	imports: [
		EnvModule,
		TypeOrmModule.forRootAsync({
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: createTypeOrmConfig,
		}),
		UserModule,
		GroupsSkillsModule,
		SkillsModule,
		AuthModule,
	],
})
export class AppModule {}
