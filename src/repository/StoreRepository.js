import { BaseRepository } from './BaseRepository.js';

export class StoreRepository extends BaseRepository {
	async findAll() {
		const { data, error } = await this.db
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
