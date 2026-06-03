import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersPrivateController } from './controller/private/users-private.controller';
import { UsersCurrentController } from './controller/public/users-public.controller';
import { UserEntity } from './entities/user/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserRepositoryAbstract } from './repositories/user.repository.abstract';
import { DeleteUserUseCase } from './use-cases/delete-user/delete-user.use-case';
import { ExistUserUseCase } from './use-cases/exist-user.use-case';
import { GetAllUsersUseCase } from './use-cases/get-all-users/get-all-users.use-case';
import { GetCurrentUserUseCase } from './use-cases/get-current-user/get-current-user.use-case';
import { GetExistingUserUseCase } from './use-cases/get-existing-user.use-case';
import { GetOneUserUseCase } from './use-cases/get-one-user/get-one-user.use-case';
import { PostUserUseCase } from './use-cases/post-user/post-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user/update-user.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UsersCurrentController, UsersPrivateController],
	providers: [
		PostUserUseCase,
		GetAllUsersUseCase,
		GetOneUserUseCase,
		GetCurrentUserUseCase,
		UpdateUserUseCase,
		DeleteUserUseCase,
		ExistUserUseCase,
		GetExistingUserUseCase,
		{
			provide: UserRepositoryAbstract,
			useClass: UserRepository,
		},
	],
	exports: [UserRepositoryAbstract, GetExistingUserUseCase],
})
export class UserModule {}
