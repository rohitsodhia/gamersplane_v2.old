import { APIResponse } from './api-response.interface';
import { ReferralLink } from './referral-link.interface';

export interface ReferralLinksGetApiResponse extends APIResponse {
	errors?: string[];
	referralLinks: ReferralLink[]
}
