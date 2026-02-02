import { BaseProcessor } from './baseProcessor.js';

export class CategoryGetProcessor extends BaseProcessor {
	async process(request, env) {
		try {
			const url = `${env.SUPABASE_URL}/rest/v1/categories?select=id,name&order=name.asc`;
			const response = await fetch(url, {
				headers: {
					"apikey": env.SUPABASE_ANON_KEY,
					"Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`
				}
			});

			if (!response.ok) {
				throw new Error("카테고리 정보를 불러올 수 없습니다.");
			}

			const data = await response.json();
			const categories = data.map(item => ({ id: item.id, name: item.name }));

			return this.jsonResponse(categories);
		} catch (e) {
			return this.errorResponse(e.message);
		}
	}
}
