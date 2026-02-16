// CategoryController.js
import { BaseController } from './BaseController.js';

export class CategoryController extends BaseController {
	#categoryRepository;

	constructor(categoryRepository) {
		super();
		this.#categoryRepository = categoryRepository;
	}

	async process(request) {
		return await this.#categoryRepository.findAll();
	}
}
