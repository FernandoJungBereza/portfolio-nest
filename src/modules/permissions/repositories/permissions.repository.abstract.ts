import { FindOneOptions } from 'typeorm';
import { OutPutPermissionDto } from '../dtos/out-put/out-put-permission.dto';
import { PermissionsEntity } from '../entities/permissions.entity';

export abstract class PermissionsRepositoryAbstract {
	abstract findAll(): Promise<OutPutPermissionDto[]>;
	abstract findOnePermission(criteria: FindOneOptions<PermissionsEntity>): Promise<OutPutPermissionDto | null>;
}
