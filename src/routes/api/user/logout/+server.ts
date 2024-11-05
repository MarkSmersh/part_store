import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = ({ cookies }) => {
    const accessToken = cookies.get("access-token");

    if (!accessToken) {
        return new Response("Not logged in", { status: 404 })
    }

    cookies.delete("access-token", { path: "/" });

    return new Response();
}