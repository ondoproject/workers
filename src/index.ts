import { handlerMapper } from './mapper.js';

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const handler = handlerMapper[url.pathname];
		console.log("SUPABASE_URL:", env.SUPABASE_URL);
		console.log("SUPABASE_ANON_KEY:", env.SUPABASE_ANON_KEY ? "EXISTS" : "MISSING");
		if (handler) {
			return await handler.handle(request.method, request, env);
		}
		return new Response("Not Found", { status: 404 });
	}
};
