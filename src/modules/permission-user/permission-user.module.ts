import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionUserEntity } from './entities/permission-user.entity';
import { PermissionUserRepository } from './repositories/permission-user.repository';
import { PermissionUserRepositoryAbstract } from './repositories/permission-user.repository.abstract';
import { ExistPermissionUserUseCase } from './use-cases/exist-permission-user.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([PermissionUserEntity])],
	providers: [
		ExistPermissionUserUseCase,
		{
			provide: PermissionUserRepositoryAbstract,
			useClass: PermissionUserRepository,
		},
	],
	exports: [PermissionUserRepositoryAbstract, ExistPermissionUserUseCase],
})
export class PermissionUserModule {}
