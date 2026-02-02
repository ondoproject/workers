import { createClient } from '@supabase/supabase-js';

export class BaseProcessor {
	jsonResponse(data, status = 200) {
		return new Response(JSON.stringify(data), {
			status,
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"Access-Control-Allow-Origin": "*"
			}
		});
	}

	getSupabase(env) {
		return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
	}

	errorResponse(message, status = 500) {
		return this.jsonResponse({ error: message }, status);
	}

	async process(request, env) {
		throw new Error("process 메서드가 구현되어 있지 않습니다.");
	}
}
