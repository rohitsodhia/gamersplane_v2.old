import { APIResponse } from 'app/shared/api-response.interface';

export interface UserExistsGetApiResponse extends APIResponse {
	data?: {
		exists: boolean
	}
}
