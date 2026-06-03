import { Public } from '@/modules/auth/decorator/public.decorator';
import { ApiCreatedResponse, ApiStandardErrors } from '@/shared/decorators/swagger-standard-responses.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostUserDto } from '../../dtos/post-user/post-user.dto';
import { PostUserUseCase } from '../../use-cases/post-user/post-user.use-case';

@Controller('users')
@ApiTags('Users')
@Public()
export class UsersPublicController {
	constructor(private readonly postUserUseCase: PostUserUseCase) {}

	@Post()
	@ApiOperation({ summary: 'Register user' })
	@ApiCreatedResponse('User created successfully')
	@ApiStandardErrors()
	async postUser(@Body() createUserDto: PostUserDto): Promise<void> {
		return this.postUserUseCase.execute(createUserDto);
	}
}
