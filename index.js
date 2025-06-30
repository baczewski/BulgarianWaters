import crypto from 'crypto';
import { typeDefs } from './type-defs.js';
import { resolvers } from './resolvers.js';
import { ApolloServer } from 'apollo-server';
import { cacheService } from './cache-service.js';
import SparqlClient from './sparql-client.js';
import { waterResourceService } from './water-resource-service.js';
import { graphqlTransformer } from './graphql-transformer.js';

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

function transformToGraphQLFormat(input) {
    if (!input.results || !input.results.bindings) {
        return [];
    }

    const transformedContent = input.results.bindings.map((binding) => {
        let longitude = null;
        let latitude = null;

        if (binding?.coord?.value) {
            const coordinates = binding.coord.value;
            const match = coordinates.match(/Point\(([^ ]+) ([^)]+)\)/);
            if (match) {
                longitude = parseFloat(match[1]);
                latitude = parseFloat(match[2]);
            }
        }

        return {
            id: binding.item.value,
            type: binding.typeLabel.value,
            name: binding.itemLabel.value,
            location: {
                longitude,
                latitude
            }
        };
    });

    return transformedContent;
}

// (async () => {
//     const data = await waterResourceService.getAll();
//     const dataTransformed = graphqlTransformer.transform(data);
//     console.log(dataTransformed);
//     // const data = await sparqlClient.fetch(SEARCH_QUERY);
//     // const data = await fetchData();
//     // console.log(data.results.bindings[0]);
//     // const dataTransformed = transformToGraphQLFormat(data);
//     await cacheService.quit();
// })();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    formatError: (err) => console.log(err)
});

server.listen(4000).then(() => console.log('Listening on port 4000'));
