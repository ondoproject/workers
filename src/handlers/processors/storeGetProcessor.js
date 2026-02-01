export const storeGetProcessor = {
	async process(request, env) {
		const supabaseUrl = `${env.SUPABASE_URL}/rest/v1/stores?select=*,store_categories(categories(name))`;

		const response = await fetch(supabaseUrl, {
			headers: {
				"apikey": env.SUPABASE_ANON_KEY,
				"Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`
			}
		});

		const data = await response.json();
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

		return new Response(JSON.stringify(cleanData), {
			headers: { "Content-Type": "application/json" }
		});
	}
};
