import { BaseHandler } from './baseHandler.js';
import { categoryGetProcessor } from './processors/categoryGetProcessor.js';

export class CategoryHandler extends BaseHandler {
	constructor() {
		super();
		this.processors = {
			"GET": categoryGetProcessor.process,
		};
	}
}
