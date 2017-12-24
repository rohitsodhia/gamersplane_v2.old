import { APIResponse } from '../../shared/api-response.interface';

export interface RegisterPostAPIResponse extends APIResponse {
	errors?: string[];
	user?: {
		userID: number,
		username: string,
		email: string
	}
}

interface Errors {
	duplicates?: string[];
	missing?: string[];
	invalid?: string[];
	creatingUser?: boolean;
}