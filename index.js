import crypto from 'crypto';
import { cacheService } from './cache-service.js';

const SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';

const SEARCH_QUERY = `
    SELECT ?item ?itemLabel ?typeId ?typeLabel ?coord ?capacity WHERE {
        ?item wdt:P17 wd:Q219. # Located in Bulgaria
        
        VALUES ?typeId {
            wd:Q4022    # River
            wd:Q12323   # Dam
            wd:Q23397   # Lake
            wd:Q131681  # Reservoir
        }
        
        ?item wdt:P31/wdt:P279* ?typeId.
        
        ?typeId rdfs:label ?typeLabel.
        FILTER(LANG(?typeLabel) = "en")
        
        OPTIONAL { ?item wdt:P625 ?coord. }
        OPTIONAL { ?item wdt:P2234 ?capacity. }
        
        SERVICE wikibase:label { bd:serviceParam wikibase:language "bg,en". }
    }
`;

async function fetchData() {
    const queryHash = crypto.createHash('sha256').update(SEARCH_QUERY).digest('hex');
    const cacheKey = `sparql:${queryHash}`;

    const cached = await cacheService.get(cacheKey);
    if (cached) {
        console.log('Using cached query response.');
        return cached;
    }

    const url = new URL(SPARQL_ENDPOINT);
    url.searchParams.append('query', SEARCH_QUERY);

    const response = await fetch(url, {
        headers: {
            'Accept': 'application/sparql-results+json',
            'User-Agent': 'BulgariaWatersAPI/1.0 (contact: marinovmartinn@gmail.com)'
        }
    });

    // TODO: Add error handling

    const result = await response.json();
    cacheService.set(cacheKey, result);
    
    return result;
}

(async () => {
    const data = await fetchData();
    console.log(data);
    await cacheService.quit();
})();