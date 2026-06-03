import { RequireAdmin } from '@/modules/permissions/decorators/require-permission.decorator';
import {
	ApiCreatedResponse,
	ApiDeletedResponse,
	ApiOkResponse,
	ApiStandardErrors,
	ApiUpdatedResponse,
} from '@/shared/decorators/swagger-standard-responses.decorator';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OutPutUserFindsDto } from '../../dtos/out-put/out-put-user-finds.dto';
import { PostUserDto } from '../../dtos/post-user/post-user.dto';
import { UpdateUserDto } from '../../dtos/update-user/update-user.dto';
import { DeleteUserUseCase } from '../../use-cases/delete-user/delete-user.use-case';
import { GetAllUsersUseCase } from '../../use-cases/get-all-users/get-all-users.use-case';
import { GetOneUserUseCase } from '../../use-cases/get-one-user/get-one-user.use-case';
import { PostUserUseCase } from '../../use-cases/post-user/post-user.use-case';
import { UpdateUserUseCase } from '../../use-cases/update-user/update-user.use-case';

@Controller('admin/users')
@ApiTags('Users')
@RequireAdmin()
export class UsersPrivateController {
	constructor(
		private readonly getAllUsersUseCase: GetAllUsersUseCase,
		private readonly getOneUserUseCase: GetOneUserUseCase,
		private readonly postUserUseCase: PostUserUseCase,
		private readonly updateUserUseCase: UpdateUserUseCase,
		private readonly deleteUserUseCase: DeleteUserUseCase,
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all users' })
	@ApiOkResponse({ description: 'Users found successfully', type: OutPutUserFindsDto, isArray: true })
	@ApiStandardErrors()
	async getAllUsers(): Promise<OutPutUserFindsDto[]> {
		return this.getAllUsersUseCase.execute();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get one user' })
	@ApiOkResponse({ description: 'User found successfully', type: OutPutUserFindsDto })
	@ApiStandardErrors()
	async getOneUser(@Param('id') id: string): Promise<OutPutUserFindsDto> {
		return this.getOneUserUseCase.execute(id);
	}

	@Post()
	@ApiOperation({ summary: 'Create user' })
	@ApiCreatedResponse('User created successfully')
	@ApiStandardErrors()
	async postUser(@Body() createUserDto: PostUserDto): Promise<void> {
		return this.postUserUseCase.execute(createUserDto);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update user' })
	@ApiUpdatedResponse('User updated successfully')
	@ApiStandardErrors()
	async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<void> {
		return this.updateUserUseCase.execute(id, updateUserDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete user' })
	@ApiDeletedResponse('User deleted successfully')
	@ApiStandardErrors()
	async deleteUser(@Param('id') id: string): Promise<void> {
		return this.deleteUserUseCase.execute(id);
	}
}
