import { jwtDecode } from "$lib/server/jwt";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies }) => {
    const accessToken = cookies.get("access-token");

    if (!accessToken) return;

    const data = jwtDecode(accessToken);

    if (!data) return;

    return {
        username: data.username
    }
}