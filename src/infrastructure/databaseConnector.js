import { createClient } from '@supabase/supabase-js';

class DatabaseConnector {
	#DB_CONNECTION;

	init(uri, auth) {
		this.#DB_CONNECTION = createClient(uri, auth);
	}

	getConnection() {
		return this.#DB_CONNECTION;
	}
}

export const dbConnector = new DatabaseConnector();
