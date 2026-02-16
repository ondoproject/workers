// index.ts (dispatcher Servlet)
import { HandlerMapping } from './handlers/handlerMapping.js';
import { AppError } from './exception/appError.js';
import { RequestHandler } from './handlers/requestHandler';
import { storageClient } from './infrastructure/storageClient.js';
import { dbConnector } from './infrastructure/databaseConnector';

interface Env {
	SUPABASE_URL: string;
	SUPABASE_ANON_KEY: string;
	CORS_URIS: string;
	CDN_PREFIX: string;
}

export default {
	async fetch(request: Request, env: Env) {
		this.initialize(env);
		const origin = request.headers.get("Origin");

		try {
			this.checkCors(origin, env);
			if (request.method === "OPTIONS") {
				return this.handleSuccess(null, request);
			}

			const handler = this.resolveHandler(request, env);
			const result = await this.dispatch(request, handler);
			return this.handleSuccess(result, request);
		} catch (e) {
			const error = e instanceof Error ? e : new Error(String(e));
			return this.handleError(error, request);
		}
	},

	async dispatch(request: Request, handler: RequestHandler) {
		if (!handler) {
			throw new AppError("요청하신 페이지를 찾을 수 없습니다.", 404);
		}
		return await handler.handle(request);
	},

	initialize(env: Env) {
		storageClient.init(env.CDN_PREFIX);
		dbConnector.init(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
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

	resolveHandler(request: Request, env: Env) {
		const url = new URL(request.url);
		return new HandlerMapping().getHandler(url.pathname);
	},

	handleSuccess(data: any, request: Request) {
		const status = data === null ? 204 : 200;
		return this.buildResponse(data, status, request);
	},

	handleError(e: Error, request: Request) {
		const status = e instanceof AppError ? e.status : 500;
		const message = e.message || "Internal Server Error";
		return this.buildResponse({ error: message }, status, request);
	},

	buildResponse(body: any, status: number, request: Request) {
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
