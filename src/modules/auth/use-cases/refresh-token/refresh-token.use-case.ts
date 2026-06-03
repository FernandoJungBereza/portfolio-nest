import { EnvService } from '@/config/env';
import { GetExistingUserUseCase } from '@/modules/user/use-cases/get-existing-user.use-case';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../strategies/jwt/jwt-payload.interface';

@Injectable()
export class RefreshTokenUseCase {
	constructor(
		private readonly jwtService: JwtService,
		private readonly env: EnvService,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
	) {}

	async execute(refreshToken: string): Promise<{
		access_token: string;
		refresh_token: string;
	}> {
		const decoded = this.jwtService.verify<JwtPayload>(refreshToken, {
			secret: this.env.jwtRefreshSecret,
		});
		if (!decoded) {
			throw new UnauthorizedException('Invalid refresh token');
		}

		const user = await this.getExistingUserUseCase.execute({
			where: {
				id: decoded.userId,
			},
		});

		return {
			access_token: this.jwtService.sign({ userId: user.id }, { expiresIn: '1h' }),
			refresh_token: this.jwtService.sign(
				{ userId: user.id },
				{ secret: this.env.jwtRefreshSecret, expiresIn: '7d' },
			),
		};
	}
}
