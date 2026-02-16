// index.ts (dispatcher Servlet)
import { HandlerMapping } from './handlers/handlerMapping.js';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AppError } from './exception/appError.js';

interface Env {
	SUPABASE_URL: string;
	SUPABASE_ANON_KEY: string;
	CORS_URIS: string;
	CDN_PREFIX: string;
}

type DatabaseClient = SupabaseClient;

export default {
	async fetch(request: Request, env: Env) {
		const client = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
		const origin = request.headers.get("Origin");

		try {
			this.checkCors(origin, env);
			if (request.method === "OPTIONS") {
				return this.handleSuccess(null, request, env);
			}

			const result = await this.dispatch(request, env, client);
			return this.handleSuccess(result, request, env);
		} catch (e) {
			return this.handleError(e, request, env);
		}
	},

	async dispatch(request: Request, env: Env, client: DatabaseClient) {
		const handler = this.resolveHandler(request, client);
		if (!handler) {
			throw new AppError("요청하신 페이지를 찾을 수 없습니다.", 404);
		}

		return await handler.handle(request, env);
	},

	checkCors(origin: string | null, env: Env) {
		if (!origin) {
			return;
		}

		const allowedOrigins = env.CORS_URIS?.split(',') || [];
		const isAllowed = allowedOrigins.includes(origin) || allowedOrigins.includes("*");

		if (!isAllowed) {
			throw new AppError("CORS Policy: This origin is not allowed.", 403);
		}
	},

	resolveHandler(request: Request, client: DatabaseClient) {
		const url = new URL(request.url);
		return new HandlerMapping(client).getHandler(url.pathname);
	},

	handleSuccess(data: any, request: Request, env: Env) {
		const status = data === null ? 204 : 200;
		return this.buildResponse(data, status, request, env);
	},

	handleError(e: Error, request: Request, env: Env) {
		const status = e instanceof AppError ? e.status : 500;
		const message = e.message || "Internal Server Error";
		return this.buildResponse({ error: message }, status, request, env);
	},

	buildResponse(body: any, status: number, request: Request, env: Env) {
		const origin: string | null = request.headers.get("Origin");
		const headers: Record<string, string> = {
			"Content-Type": "application/json;charset=UTF-8",
		};

		if (origin) {
			headers["Access-Control-Allow-Origin"] = origin;
			headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
			headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
		}
		return new Response(body ? JSON.stringify(body) : null, { status, headers });
	}
};
