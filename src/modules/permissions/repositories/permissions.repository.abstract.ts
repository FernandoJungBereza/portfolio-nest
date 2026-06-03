import { FindOneOptions } from 'typeorm';
import { OutPutPermissionDto } from '../dtos/out-put/out-put-permission.dto';
import { PermissionUserEntity } from '../entities/permission-user.entity';
import { PermissionsEntity } from '../entities/permissions.entity';

export abstract class PermissionsRepositoryAbstract {
	abstract findPermissionNamesByUserId(userId: string): Promise<string[]>;
	abstract findPermissionsByUserId(userId: string): Promise<OutPutPermissionDto[]>;
	abstract findOnePermission(criteria: FindOneOptions<PermissionsEntity>): Promise<OutPutPermissionDto | null>;
	abstract findOnePermissionUser(criteria: FindOneOptions<PermissionUserEntity>): Promise<PermissionUserEntity | null>;
	abstract assignToUser(userId: string, permissionId: string): Promise<void>;
}