import { BaseProcessor } from './baseProcessor.js';

export class CategoryGetProcessor extends BaseProcessor {
	async process(request, env) {
		try {
			const supabase = this.getSupabase(env);
			const { data, error } = await supabase.from('categories')
				.select('id, name')
				.order('name', { ascending: true });

			if (error) {
				console.error(error)
				throw new Error("카테고리 정보를 불러올 수 없습니다.");
			}

			return this.jsonResponse(data);
		} catch (e) {
			return this.errorResponse(e.message);
		}
	}
}
