import { PermissionUserRepositoryAbstract } from '@/modules/permission-user/repositories/permission-user.repository.abstract';
import { Injectable } from '@nestjs/common';
import { OutPutCurrentUserDto } from '../../dtos/out-put/out-put-current-user.dto';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class GetCurrentUserUseCase {
	constructor(
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
		private readonly permissionUserRepository: PermissionUserRepositoryAbstract,
	) {}

	async execute(userId: string): Promise<OutPutCurrentUserDto> {
		const user = await this.getExistingUserUseCase.execute({ where: { id: userId } });
		const permissions = await this.permissionUserRepository.findPermissionsByUserId(userId);

		return {
			...user,
			permissions,
		};
	}
}
