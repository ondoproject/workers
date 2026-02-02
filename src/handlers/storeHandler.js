import { BaseHandler } from './baseHandler.js';
import { storeGetProcessor } from './processors/storeGetProcessor.js';

export class StoreHandler extends BaseHandler {
	constructor() {
		super();
		this.processors = {
			"GET": storeGetProcessor.process,
		};
	}
}
