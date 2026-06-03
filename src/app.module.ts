import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule, EnvService } from './config/env';
import { createTypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtGuard } from './modules/auth/guard/jwt-guard.guard';
import { GroupsSkillsModule } from './modules/groups-skills/groups-skills.module';
import { PermissionsGuard } from './modules/permissions/guards/permissions.guard';
import { PermissionsModule } from './modules/permissions/permissions.module';
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
		PermissionsModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtGuard,
		},
		{
			provide: APP_GUARD,
			useClass: PermissionsGuard,
		},
	],
})
export class AppModule {}
