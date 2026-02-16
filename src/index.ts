// index.js (DispatcherServlet 역할)
import { handlerMapping } from './handlers/handlerMapping.js';

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const handler = handlerMapping.getHandler(url.pathname);
		if (!handler) {
			return new Response("Not Found", { status: 404 });
		}

		try {
			return await handler.handle(request, env);
		} catch (e) {
			console.error(e);
			return new Response(JSON.stringify({ error: "Internal Server Error" }), {
				status: 500,
				headers: { "Content-Type": "application/json" }
			});
		}
	}
};
