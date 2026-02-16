// handlerMapping.js (HandlerMapping 역할)
import { RequestHandler } from './requestHandler.js';
import { StoreController } from '../controller/StoreController.js';
import { CategoryController } from '../controller/CategoryController.js';

export class HandlerMapping {
	#mappings = {};

	constructor() {
		this.#mappings = {
			"/v1/stores": new RequestHandler({ "GET": new StoreController() }),
			"/v1/categories": new RequestHandler({ "GET": new CategoryController() })
		};
	}

	getHandler(pathname) {
		return this.#mappings[pathname] || null;
	}
}
