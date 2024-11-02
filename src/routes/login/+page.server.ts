import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	// const isLog = cookies.get("access-token")
	// if (isLog) {
	//     redirect(302, "/")
	// }
};
