export const ROUTES_KEY = Symbol('routes');

export function Get(path: string) {
	return function (target: any, propertyKey: string) {
		if (!target.constructor[ROUTES_KEY]) {
			target.constructor[ROUTES_KEY] = [];
		}
		target.constructor[ROUTES_KEY].push({
			method: 'GET',
			path,
			handlerName: propertyKey
		});
	};
}

export function Post(path: string) {
	return function (target: any, propertyKey: string) {
		if (!target.constructor[ROUTES_KEY]) {
			target.constructor[ROUTES_KEY] = [];
		}
		target.constructor[ROUTES_KEY].push({
			method: 'POST',
			path,
			handlerName: propertyKey
		});
	};
}

// DELETE, PUT도 나중에 추가
