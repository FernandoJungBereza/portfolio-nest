import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PostUserDto } from '../../dtos/post-user/post-user.dto';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';
import { ExistUserUseCase } from '../exist-user.use-case';

@Injectable()
export class PostUserUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly existUserUseCase: ExistUserUseCase,
	) {}

	async execute(postUserDto: PostUserDto): Promise<void> {
		await this.existUserUseCase.execute({
			where: {
				email: postUserDto.email,
			},
		});

		const passwordHash = await hash(postUserDto.password, 10);

		const user = await this.userRepository.create({
			...postUserDto,
			password: passwordHash,
		});

		await this.userRepository.save(user);
	}
}
