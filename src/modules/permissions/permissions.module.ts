import { UserModule } from '@/modules/user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsAuthorizationService } from './authorization/permissions-authorization.service';
import { PermissionsPrivateController } from './controller/private/permissions-private.controller';
import { PermissionUserEntity } from './entities/permission-user.entity';
import { PermissionsEntity } from './entities/permissions.entity';
import { PermissionsGuard } from './guards/permissions.guard';
import { PermissionsRepository } from './repositories/permissions.repository';
import { PermissionsRepositoryAbstract } from './repositories/permissions.repository.abstract';
import { AssignPermissionUseCase } from './use-cases/assign-permission/assign-permission.use-case';
import { GetExistingPermissionUseCase } from './use-cases/get-existing-permission.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([PermissionsEntity, PermissionUserEntity]), forwardRef(() => UserModule)],
	controllers: [PermissionsPrivateController],
	providers: [
		PermissionsAuthorizationService,
		PermissionsGuard,
		GetExistingPermissionUseCase,
		AssignPermissionUseCase,
		{
			provide: PermissionsRepositoryAbstract,
			useClass: PermissionsRepository,
		},
	],
	exports: [PermissionsAuthorizationService, PermissionsGuard, PermissionsRepositoryAbstract, GetExistingPermissionUseCase],
})
export class PermissionsModule {}
