import { Injectable } from '@nestjs/common';
import { OutPutUserFindsDto } from '../../dtos/out-put/out-put-user-finds.dto';
import { UserRepositoryAbstract } from '../../repositories/user.repository.abstract';

@Injectable()
export class GetAllUsersUseCase {
	constructor(private readonly userRepository: UserRepositoryAbstract) {}

	async execute(): Promise<OutPutUserFindsDto[]> {
		return this.userRepository.findAll();
	}
}
