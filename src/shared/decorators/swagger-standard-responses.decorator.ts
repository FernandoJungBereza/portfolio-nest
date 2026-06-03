import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiStandardErrors(): MethodDecorator {
	return applyDecorators(
		ApiResponse({ status: 400, description: 'Bad request' }),
		ApiResponse({ status: 401, description: 'Unauthorized' }),
		ApiResponse({ status: 403, description: 'Forbidden' }),
		ApiResponse({ status: 404, description: 'Not found' }),
		ApiResponse({ status: 406, description: 'Not acceptable' }),
		ApiResponse({ status: 409, description: 'Conflict' }),
		ApiResponse({ status: 410, description: 'Gone' }),
		ApiResponse({ status: 412, description: 'Precondition failed' }),
		ApiResponse({ status: 500, description: 'Internal server error' }),
	);
}

export function ApiOkResponse(options: {
	description: string;
	type: Type<unknown>;
	isArray?: boolean;
}): MethodDecorator {
	return applyDecorators(
		ApiResponse({
			status: 200,
			description: options.description,
			type: options.type,
			isArray: options.isArray,
		}),
	);
}

export function ApiCreatedResponse(description: string): MethodDecorator {
	return applyDecorators(ApiResponse({ status: 201, description }));
}

export function ApiUpdatedResponse(description: string): MethodDecorator {
	return applyDecorators(ApiResponse({ status: 200, description }));
}

export function ApiDeletedResponse(description: string): MethodDecorator {
	return applyDecorators(ApiResponse({ status: 200, description }));
}
