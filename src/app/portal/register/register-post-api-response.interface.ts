import { APIResponse } from '../../shared/api-response.interface';

export interface RegisterPostAPIResponse extends APIResponse {
	data?: {
		user: {
			userID: number,
			username: string
		}
	},
	errors?: {
		recaptcha?: boolean
		duplicates?: string[];
		missing?: string[];
		invalid?: string[];
		// creatingUser?: boolean;
	}
}
