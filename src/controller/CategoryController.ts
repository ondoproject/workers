// CategoryController.js
import { CategoryRepository } from '../repository/CategoryRepository';
import { Get } from '../decorator/apiDecorator';

export class CategoryController {
	#categoryRepository = new CategoryRepository();

	@Get("/v1/categories")
	async getCategories(request: Request) {
		return await this.#categoryRepository.findAll();
	}
}
