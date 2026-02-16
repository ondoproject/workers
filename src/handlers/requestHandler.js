// requestHandler.js
export class RequestHandler {
	#processors = {};

	constructor(methods = {}) {
		for (const [method, processor] of Object.entries(methods)) {
			this.#processors[method.toUpperCase()] = processor;
		}
	}

	async handle(method, request, env) {
		const processor = this.#processors[method.toUpperCase()];
		if (!processor) {
			return new Response(`Method ${method} Not Allowed`, { status: 405 });
		}
		return await processor.process(request, env);
	}
}
