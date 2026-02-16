import { HandlerMapping } from './handlers/handlerMapping.js';
import { createClient } from '@supabase/supabase-js';

export default {

	async fetch(request, env) {
		const client = this.createClient(env);

		try {
			return await this.dispatch(request, env, client);
		} catch (e) {
			return this.handleError(e);
		}
	},

	async dispatch(request, env, client) {
		const handler = this.resolveHandler(request, client);
		if (!handler) {
			return new Response("Not Found", { status: 404 });
		}
		return await handler.handle(request, env);
	},

	createClient(env) {
		return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
	},

	resolveHandler(request, client) {
		const url = new URL(request.url);
		return new HandlerMapping(client).getHandler(url.pathname);
	},

	handleError(e) {
		console.error(e);
		return new Response(
			JSON.stringify({ error: "Internal Server Error" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" }
			}
		);
	}
};
