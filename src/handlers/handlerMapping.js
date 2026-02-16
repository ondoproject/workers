// handlerMapping.js (HandlerMapping 역할)
import { RequestHandler } from './requestHandler.js';
import { StoreController } from '../controller/StoreController.js';
import { CategoryController } from '../controller/CategoryController.js';
import { CategoryRepository } from '../repository/CategoryRepository.js';
import { StoreRepository } from '../repository/StoreRepository.js';

export class HandlerMapping {
	#mappings = {};

	constructor(client) {
		const storeRepo = new StoreRepository(client);
		const categoryRepo = new CategoryRepository(client);

		this.#mappings = {
			"/v1/stores": new RequestHandler({ "GET": new StoreController(storeRepo) }),
			"/v1/categories": new RequestHandler({ "GET": new CategoryController(categoryRepo) })
		};
	}

	getHandler(pathname) {
		return this.#mappings[pathname] || null;
	}
}
