class StorageClient {
	#CDN_PREFIX;

	init(cdnPrefix) {
		this.#CDN_PREFIX = cdnPrefix;
	}

	getFullUri(fileKey) {
		if (!fileKey) {
			return null;
		}

		const prefix = this.#CDN_PREFIX.endsWith('/') ? this.#CDN_PREFIX : `${this.#CDN_PREFIX}/`;
		const key = fileKey.startsWith('/') ? fileKey.slice(1) : fileKey;
		return prefix + key;
	}
}

export const storageClient = new StorageClient();
