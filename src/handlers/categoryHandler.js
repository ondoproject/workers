import { BaseHandler } from './baseHandler.js';
import { CategoryGetProcessor } from './processors/categoryGetProcessor.js';

export class CategoryHandler extends BaseHandler {
	#categoryGetProcessor = new CategoryGetProcessor();

	constructor() {
		super();
		this.processors = {
			"GET": this.#categoryGetProcessor.process.bind(this.#categoryGetProcessor),
		};
	}
}
