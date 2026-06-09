import { OutPutPermissionDto } from '@/modules/permissions/dtos/out-put/out-put-permission.dto';
import { FindOneOptions } from 'typeorm';
import { PermissionUserEntity } from '../entities/permission-user.entity';

export abstract class PermissionUserRepositoryAbstract {
	abstract findOne(criteria: FindOneOptions<PermissionUserEntity>): Promise<PermissionUserEntity | null>;
	abstract findPermissionsByUserId(userId: string): Promise<OutPutPermissionDto[]>;
	abstract assign(userId: string, permissionId: string): Promise<void>;
}
