import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutPutUserFindsDto } from '../dtos/out-put/out-put-user-finds.dto';
import { PostUserDto } from '../dtos/post-user/post-user.dto';
import { UpdateUserDto } from '../dtos/update-user/update-user.dto';
import { DeleteUserUseCase } from '../use-cases/delete-user/delete-user.use-case';
import { GetAllUsersUseCase } from '../use-cases/get-all-users/get-all-users.use-case';
import { GetOneUserUseCase } from '../use-cases/get-one-user/get-one-user.use-case';
import { PostUserUseCase } from '../use-cases/post-user/post-user.use-case';
import { UpdateUserUseCase } from '../use-cases/update-user/update-user.use-case';

@ApiTags('Users')
@Controller('users')
export class UserController {
	constructor(
		private readonly getAllUsersUseCase: GetAllUsersUseCase,
		private readonly getOneUserUseCase: GetOneUserUseCase,
		private readonly postUserUseCase: PostUserUseCase,
		private readonly updateUserUseCase: UpdateUserUseCase,
		private readonly deleteUserUseCase: DeleteUserUseCase,
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, description: 'Users found successfully' })
	async getAllUsers(): Promise<OutPutUserFindsDto[]> {
		return this.getAllUsersUseCase.execute();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get one user' })
	@ApiResponse({ status: 200, description: 'User found successfully' })
	@ApiResponse({ status: 404, description: 'User not found' })
	async getOneUser(@Param('id') id: string): Promise<OutPutUserFindsDto> {
		return this.getOneUserUseCase.execute(id);
	}

	@Post()
	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 201, description: 'User created successfully' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	async postUser(@Body() createUserDto: PostUserDto): Promise<void> {
		return this.postUserUseCase.execute(createUserDto);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update user' })
	@ApiResponse({ status: 200, description: 'User updated successfully' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 404, description: 'User not found' })
	async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<void> {
		return this.updateUserUseCase.execute(id, updateUserDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete user' })
	@ApiResponse({ status: 200, description: 'User deleted successfully' })
	@ApiResponse({ status: 404, description: 'User not found' })
	async deleteUser(@Param('id') id: string): Promise<void> {
		return this.deleteUserUseCase.execute(id);
	}
}
