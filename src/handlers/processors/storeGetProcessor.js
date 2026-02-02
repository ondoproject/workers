import { BaseProcessor } from './baseProcessor.js';

export class StoreGetProcessor extends BaseProcessor {
	async process(request, env) {
		try {
			const supabase = this.getSupabase(env);

			const { data, error } = await supabase.from('stores')
				.select(`
          *,
          store_categories(
            categories(name)
          )
        `);

			if (error) {
				console.error(error.message);
				throw new Error("상점 정보를 불러올 수 없습니다.");
			}

			const cleanData = data.map(item => ({
				sid: item.sid,
				name: item.name,
				address: item.address,
				description: item.description,
				latitude: item.latitude,
				longitude: item.longitude,
				thumbnailUri: item.thumbnail_key ? `${env.CDN_PREFIX}${item.thumbnail_key}` : null,
				categories: item.store_categories?.map(sc => sc.categories?.name) || []
			}));

			return this.jsonResponse(cleanData);
		} catch (e) {
			return this.errorResponse(e.message);
		}
	}
}
