// requestHandler.js
export class RequestHandler {
	#processors = {};

	constructor(methods = {}) {
		for (const [method, processor] of Object.entries(methods)) {
			this.#processors[method.toUpperCase()] = processor;
		}
	}

	async handle(request, env) {
		const processor = this.#processors[request.method.toUpperCase()];
		if (!processor) {
			return new Response(`Method ${request.method} Not Allowed`, { status: 405 });
		}
		return await processor.process(request, env);
	}
}
