// mapper.js
import { RequestHandler } from './handlers/requestHandler.js';
import { StoreController } from './controller/StoreController.js';
import { CategoryController } from './controller/CategoryController.js';

export const handlerMapper = {
	"/v1/stores": new RequestHandler({
		"GET": new StoreController(),
	}),
	"/v1/categories": new RequestHandler({
		"GET": new CategoryController()
	})
};
