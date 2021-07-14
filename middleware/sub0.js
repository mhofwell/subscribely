import { MongoClient } from 'mongodb';

if (!process.env.DATABASE_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!process.env.MONGODB_DB) {
        throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

let cached = global.mongo;

if (!cached) {
        // eslint-disable-next-line no-multi-assign
        cached = global.mongo = { conn: null, promise: null };
}

export default async function connectToDatabase() {
        if (cached.conn) {
                return cached.conn;
        }

        if (!cached.promise) {
                const opts = {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                };

                cached.promise = MongoClient.connect(process.env.DATABASE_URI, opts).then(client => ({
                        client,
                        db: client.db(process.env.MONGODB_DB),
                }));
        }
        cached.conn = await cached.promise;
        return cached.conn;
}
