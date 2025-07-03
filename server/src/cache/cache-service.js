import { createClient } from 'redis';

class CacheService {
    constructor() {
        this.client = createClient();
        this.client.connect().catch((err) => console.error(err));
    }

    async get(key) {
        try {
            const value = await this.client.get(key);
            return value ? JSON.parse(value) : null;
        } catch (err) {
            console.error('Redis GET error:', err);
            return null;
        }
    }

    async set(key, value, ttl = 3600) {
        try {
            await this.client.setEx(key, ttl, JSON.stringify(value));
        } catch (err) {
            console.error('Redis SET error:', err);
        }
    }

    async quit() {
        await this.client.quit();
    }
}

export const cacheService = new CacheService();