import { ROUTES_KEY } from '../decorator/apiDecorator';
import { CategoryController } from '../controller/CategoryController';
import { StoreController } from '../controller/StoreController';

export class HandlerMapping {
	#routeMap = new Map();

	constructor() {
		const controllers = [
			new StoreController(),
			new CategoryController()
		];

		controllers.forEach(controller => {
			const routes = controller.constructor[ROUTES_KEY] || [];
			routes.forEach(route => {
				const key = `${route.method}:${route.path}`;
				this.#routeMap.set(key, controller[route.handlerName].bind(controller));
			});
		});
	}

	getHandler(method, pathname) {
		const key = `${method.toUpperCase()}:${pathname}`;
		return this.#routeMap.get(key) || null;
	}
}
