import { StoreHandler } from './handlers/storeHandler.js';
import { CategoryHandler } from './handlers/categoryHandler.js';

const storeHandler = new StoreHandler();
const categoryHandler = new CategoryHandler();

export const handlerMapper = {
	"/v1/stores": storeHandler,
	"/v1/categories": categoryHandler
};
