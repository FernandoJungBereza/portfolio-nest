import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../dtos/update-user/update-user.dto';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';
import { ExistUserUseCase } from '../exist-user.use-case';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class UpdateUserUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly getExistingUserUseCase: GetExistingUserUseCase,
		private readonly existUserUseCase: ExistUserUseCase,
	) {}

	async execute(id: string, updateUserDto: UpdateUserDto): Promise<void> {
		const user = await this.getExistingUserUseCase.execute({
			where: {
				id: id,
			},
		});

		if (updateUserDto.email !== user.email) {
			await this.existUserUseCase.execute({
				where: {
					email: updateUserDto.email,
				},
			});
		}

		await this.userRepository.update(user.id, {
			...updateUserDto,
		});
	}
}
