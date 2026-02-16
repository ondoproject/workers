// CategoryController.js
import { BaseController } from './BaseController.js';
import { CategoryRepository } from '../repository/CategoryRepository';

export class CategoryController extends BaseController {
	#categoryRepository = new CategoryRepository();

	async process(request) {
		return await this.#categoryRepository.findAll();
	}
}
