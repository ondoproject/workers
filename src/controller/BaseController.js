// BaseController.js
export class BaseController {
	async process(request, env) {
		throw new Error("process 메서드가 구현되어 있지 않습니다.");
	}
}
