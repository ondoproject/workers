import { dbConnector } from '../infrastructure/databaseConnector';

export class CategoryRepository {
	async findAll() {
		const { data, error } = await dbConnector.getConnection()
			.from('categories')
			.select('id, name')
			.order('name', { ascending: true });

		if (error) {
			throw new Error("카테고리 데이터를 불러올 수 없습니다.");
		}
		return data;
	}
}
