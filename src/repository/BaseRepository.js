export class BaseRepository {
	#client;

	constructor(client) {
		this.#client = client;
	}

	get db() {
		return this.#client;
	}
}
