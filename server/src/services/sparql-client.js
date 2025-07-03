import crypto from 'crypto';
import { cacheService } from '../cache/cache-service.js';

class SparqlClient {
    constructor() {
        this.endpoint = 'https://query.wikidata.org/sparql';
        this.headers = {
            'Accept': 'application/sparql-results+json',
            'User-Agent': 'BulgariaWatersAPI/1.0 (contact: marinovmartinn@gmail.com)'
        }
    }

    async fetch(query) {
        const queryHash = crypto.createHash('sha256').update(query).digest('hex');
        const cacheKey = `sparql:${queryHash}`;

        const cached = await cacheService.get(cacheKey);
        if (cached) {
            console.log('Using cached query response.');
            return cached;
        }

        const url = new URL(this.endpoint);
        url.searchParams.append('query', query);

        const response = await fetch(url, { 
            headers: this.headers 
        });

        const result = await response.json();
        cacheService.set(cacheKey, result);

        return result;
    }
}

export default SparqlClient;
