import { EnvModule, EnvService } from '@/config/env';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';

import { GetExistingUserUseCase } from '../user/use-cases/get-existing-user.use-case';
import { AuthController } from './controller/auth.controller';
import { JwtGuard } from './guard/jwt-guard.guard';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
import { LoginUseCase } from './use-cases/login/login.use-case';
import { LogoutUseCase } from './use-cases/logout/logout.use-case';
import { RefreshTokenUseCase } from './use-cases/refresh-token/refresh-token.use-case';

@Module({
	imports: [
		EnvModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: (env: EnvService) => ({
				secret: env.jwtSecret,
				signOptions: { expiresIn: '1h' },
			}),
		}),
		UserModule,
		GetExistingUserUseCase,
	],
	controllers: [AuthController],
	providers: [LoginUseCase, LogoutUseCase, RefreshTokenUseCase, JwtStrategy, JwtGuard],
	exports: [JwtGuard],
})
export class AuthModule {}
