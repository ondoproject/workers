import { storeGetProcessor } from './processors/storeGetProcessor.js';

export const storeHandler = {
	processors: {
		"GET": storeGetProcessor.process,
	},

	async handle(method, request, env) {
		const processor = this.processors[method];
		if (!processor) {
			return new Response("Method Not Allowed", { status: 405 });
		}
		return await processor(request, env);
	}
};
