import { Injectable } from '@nestjs/common';
import { OutPutUserFindsDto } from '../../dtos/out-put/out-put-user-finds.dto';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class GetOneUserUseCase {
	constructor(private readonly getExistingUserUseCase: GetExistingUserUseCase) {}

	async execute(id: string): Promise<OutPutUserFindsDto> {
		return this.getExistingUserUseCase.execute({
			where: {
				id: id,
			},
		});
	}
}
