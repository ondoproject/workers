// StoreController.js
import { BaseController } from './BaseController.js';
import { storageClient } from '../infrastructure/storageClient.js';
import { StoreRepository } from '../repository/StoreRepository';

export class StoreController extends BaseController {
	#storeRepository = new StoreRepository();

	async process(request) {
		const data = await this.#storeRepository.findAll();
		return data.map(item => ({
			sid: item.sid,
			name: item.name,
			address: item.address,
			description: item.description,
			latitude: item.latitude,
			longitude: item.longitude,
			thumbnailUri: item.thumbnail_key ? `${storageClient.getFullUri(item.thumbnail_key)}` : null,
			categories: item.store_categories?.map(sc => sc.categories?.name) || []
		}));
	}
}
