export interface RegisterPostAPIResponse {
	success: boolean;
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