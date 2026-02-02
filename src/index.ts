import { handlerMapper } from './mapper.js';

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const handler = handlerMapper[url.pathname];

		if (handler) {
			try {
				return await handler.handle(request.method, request, env);
			} catch (e) {
				return new Response(JSON.stringify({ error: "Internal Server Error" }), {
					status: 500,
					headers: { "Content-Type": "application/json" }
				});
			}
		}
		return new Response("Not Found", { status: 404 });
	}
};
