export class BaseHandler {
	async handle(method, request, env) {
		const processor = this.processors[method];
		if (!processor) {
			return new Response(`Method ${method} Not Allowed`, { status: 405 });
		}

		return await processor.call(this, request, env);
	}
}
