import { dbConnector } from '../infrastructure/databaseConnector';

export class StoreRepository {
	async findAll() {
		const { data, error } = await dbConnector.getConnection()
			.from('stores')
			.select(`
        *,
        store_categories(categories(name))
      `);

		if (error) {
			throw new Error("상점 정보를 불러올 수 없습니다.");
		}
		return data;
	}
}
