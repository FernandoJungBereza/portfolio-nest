import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { Public } from '../decorator/public.decorator';
import { LoginDto } from '../dtos/login/login.dto';
import { RefreshTokenDto } from '../dtos/refresh-token/refresh-token.dto';
import type { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';
import { LoginUseCase } from '../use-cases/login/login.use-case';
import { LogoutUseCase } from '../use-cases/logout/logout.use-case';
import { RefreshTokenUseCase } from '../use-cases/refresh-token/refresh-token.use-case';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(
		private readonly loginUseCase: LoginUseCase,
		private readonly logoutUseCase: LogoutUseCase,
		private readonly refreshTokenUseCase: RefreshTokenUseCase,
	) {}

	@Post('login')
	@Public()
	@ApiOperation({ summary: 'Login the user' })
	@ApiResponse({ status: 200, description: 'User logged in' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	async login(@Body() loginDto: LoginDto): Promise<{
		user: { id: string; name: string; email: string };
		access_token: string;
		refresh_token: string;
	}> {
		return this.loginUseCase.execute(loginDto);
	}

	@Post('logout')
	@ApiOperation({ summary: 'Logout the current user' })
	@ApiResponse({ status: 200, description: 'User logged out' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	async logout(@Req() req: AuthenticatedRequest, @Res({ passthrough: true }) res: Response) {
		await this.logoutUseCase.execute(req.user.userId, res);
	}

	@Post('refresh-token')
	@Public()
	@ApiOperation({ summary: 'Refresh the user token' })
	@ApiResponse({ status: 200, description: 'User token refreshed' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<{
		access_token: string;
		refresh_token: string;
	}> {
		return this.refreshTokenUseCase.execute(refreshTokenDto.refreshToken);
	}
}
