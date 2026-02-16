// StoreController.js
import { BaseController } from './BaseController.js';

export class StoreController extends BaseController {
	#storeRepository;

	constructor(storeRepository) {
		super();
		this.#storeRepository = storeRepository;
	}

	async process(request, env) {
		try {
			const data = await this.#storeRepository.findAll();
			const cleanData = data.map(item => ({
				sid: item.sid,
				name: item.name,
				address: item.address,
				description: item.description,
				latitude: item.latitude,
				longitude: item.longitude,
				thumbnailUri: item.thumbnail_key ? `${env.CDN_PREFIX}${item.thumbnail_key}` : null,
				categories: item.store_categories?.map(sc => sc.categories?.name) || []
			}));

			return this.jsonResponse(cleanData);
		} catch (e) {
			return this.errorResponse(e.message);
		}
	}
}
