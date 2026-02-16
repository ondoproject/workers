// mapper.js
import { RequestHandler } from './handlers/requestHandler.js';
import { StoreGetProcessor } from './handlers/processors/storeGetProcessor.js';
import { CategoryGetProcessor } from './handlers/processors/categoryGetProcessor.js';

export const handlerMapper = {
	"/v1/stores": new RequestHandler({
		"GET": new StoreGetProcessor(),
	}),
	"/v1/categories": new RequestHandler({
		"GET": new CategoryGetProcessor()
	})
};
