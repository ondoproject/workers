// StoreController.ts
import { storageClient } from '../infrastructure/storageClient.js';
import { StoreRepository } from '../repository/StoreRepository';
import { Get } from '../decorator/apiDecorator';

export class StoreController {
	#storeRepository = new StoreRepository();

	@Get("/v1/stores")
	async getStores(request: Request) {
		const data: any = await this.#storeRepository.findAll();
		return data.map((item: any) => ({
			sid: item.sid,
			name: item.name,
			address: item.address,
			description: item.description,
			latitude: item.latitude,
			longitude: item.longitude,
			thumbnailUri: item.thumbnail_key ? `${storageClient.getFullUri(item.thumbnail_key)}` : null,
			categories: item.store_categories?.map((sc: any) => sc.categories?.name) || []
		}));
	}
}
