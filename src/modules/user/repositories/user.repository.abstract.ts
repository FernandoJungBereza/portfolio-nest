import { DeleteResult, FindOneOptions, UpdateResult } from 'typeorm';
import { OutPutUserFindsDto } from '../dtos/out-put/out-put-user-finds.dto';
import { PostUserDto } from '../dtos/post-user/post-user.dto';
import { UpdateUserDto } from '../dtos/update-user/update-user.dto';
import { UserEntity } from '../entities/user/user.entity';

export abstract class UserRepositoryAbstract {
	abstract findAll(): Promise<OutPutUserFindsDto[]>;
	abstract findOne(criteria: FindOneOptions<UserEntity>): Promise<OutPutUserFindsDto | null>;
	abstract create(postUserDto: PostUserDto): Promise<UserEntity>;
	abstract update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
	abstract delete(id: string): Promise<DeleteResult>;
	abstract save(entity: UserEntity): Promise<UserEntity>;
}
