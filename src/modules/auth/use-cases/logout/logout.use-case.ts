import { EnvService } from '@/config/env';
import { clearAuthCookies } from '@/modules/auth/helpers/auth-cookies.helper';
import { GetExistingUserUseCase } from '@/modules/user/use-cases/get-existing-user.use-case';

import { Injectable } from '@nestjs/common';
import type { Response } from 'express';

@Injectable()
export class LogoutUseCase {
	constructor(
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
		private readonly env: EnvService,
	) {}

	async execute(userId: string, res: Response): Promise<void> {
		await this.getExistingUserUseCase.execute({
			where: {
				id: userId,
			},
		});

		clearAuthCookies(res, { secure: this.env.isProduction });
	}
}
