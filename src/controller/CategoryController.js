// CategoryController.js
import { BaseController } from './BaseController.js';

export class CategoryController extends BaseController {
	#categoryRepository;

	constructor(categoryRepository) {
		super();
		this.#categoryRepository = categoryRepository;
	}

	async process(request, env) {
		try {
			const data = await this.#categoryRepository.findAll();
			return this.jsonResponse(data);
		} catch (e) {
			return this.errorResponse(e.message);
		}
	}
}
