export abstract class PermissionsRepositoryAbstract {
	abstract findPermissionNamesByUserId(userId: string): Promise<string[]>;
}
