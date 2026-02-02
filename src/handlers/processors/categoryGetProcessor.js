export const categoryGetProcessor = {
	async process(request, env) {
		const supabaseUrl = `${env.SUPABASE_URL}/rest/v1/categories?select=id,name&order=name.asc`;

		const response = await fetch(supabaseUrl, {
			headers: {
				"apikey": env.SUPABASE_ANON_KEY,
				"Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`
			}
		});

		const data = await response.json();
		const categories = data.map(item => ({
			id: item.id,
			name: item.name
		}));

		return new Response(JSON.stringify(categories), {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"Access-Control-Allow-Origin": "*"
			}
		});
	}
};
