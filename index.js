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
    console.log(result);
}

(async () => await fetchData())();