import type { AuthenticatedRequest } from '@/modules/auth/interfaces/authenticated-request.interface';
import { ApiOkResponse, ApiStandardErrors } from '@/shared/decorators/swagger-standard-responses.decorator';
import { Controller, Get, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OutPutCurrentUserDto } from '../../dtos/out-put/out-put-current-user.dto';
import { GetCurrentUserUseCase } from '../../use-cases/get-current-user/get-current-user.use-case';

@Controller('users/me')
@ApiTags('Users')
export class UsersCurrentController {
	constructor(private readonly getCurrentUserUseCase: GetCurrentUserUseCase) {}

	@Get()
	@ApiOperation({ summary: 'Get current user' })
	@ApiOkResponse({ description: 'Current user found successfully', type: OutPutCurrentUserDto })
	@ApiStandardErrors()
	async getCurrentUser(@Req() req: AuthenticatedRequest): Promise<OutPutCurrentUserDto> {
		return this.getCurrentUserUseCase.execute(req.user.userId);
	}
}
