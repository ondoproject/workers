import { AppError } from '../exception/appError.js';

export class RequestHandler {
	#processors = {};

	constructor(methods = {}) {
		for (const [method, processor] of Object.entries(methods)) {
			this.#processors[method.toUpperCase()] = processor;
		}
	}

	async handle(request) {
		const method = request.method.toUpperCase();
		const processor = this.#processors[method];
		if (!processor) {
			throw new AppError(`Method ${method} Not Allowed`, 405);
		}

		return await processor.process(request);
	}
}
