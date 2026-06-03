import { PermissionUserEntity } from '@/modules/permission-user/entities/permission-user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsAuthorizationService } from './authorization/permissions-authorization.service';
import { PermissionsEntity } from './entities/permissions.entity';
import { PermissionsGuard } from './guards/permissions.guard';
import { PermissionsRepository } from './repositories/permissions.repository';
import { PermissionsRepositoryAbstract } from './repositories/permissions.repository.abstract';

@Module({
	imports: [TypeOrmModule.forFeature([PermissionsEntity, PermissionUserEntity])],
	providers: [
		PermissionsAuthorizationService,
		PermissionsGuard,
		{
			provide: PermissionsRepositoryAbstract,
			useClass: PermissionsRepository,
		},
	],
	exports: [PermissionsAuthorizationService, PermissionsGuard],
})
export class PermissionsModule {}
