class SparqlClient {
    constructor() {
        this.endpoint = 'https://query.wikidata.org/sparql';
        this.headers = {
            'Accept': 'application/sparql-results+json',
            'User-Agent': 'BulgariaWatersAPI/1.0 (contact: marinovmartinn@gmail.com)'
        }
    }

    async fetch(query) {
        // TODO: Add caching and error handling

        const url = new URL(this.endpoint);
        url.searchParams.append('query', query);

        const response = await fetch(url, { 
            headers: this.headers 
        });

        const result = await response.json();
        return result;
    }
}

export default SparqlClient;
