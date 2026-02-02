import { BaseHandler } from './baseHandler.js';
import { StoreGetProcessor } from './processors/storeGetProcessor.js';

export class StoreHandler extends BaseHandler {
	#storeGetProcessor = new StoreGetProcessor();

	constructor() {
		super();
		this.processors = {
			"GET": this.#storeGetProcessor.process.bind(this.#storeGetProcessor),
		};
	}
}
