import SparqlClient from "./sparql-client.js";

class WaterResourceService {
    constructor() {
        this.sparqlClient = new SparqlClient();
        this.resourceTypeMap = {
            'River': 'wd:Q4022',
            'Dam': 'wd:Q12323',
            'Lake': 'wd:Q23397',
            'Reservoir': 'wd:Q131681'
        };

        this.resourceTypes = Object.keys(this.resourceTypeMap);
    }

    async getAll(offset, limit) {
        const query = `
            SELECT ?item ?itemLabel ?typeId ?typeLabel ?coord ?capacity WHERE {
                ?item wdt:P17 wd:Q219. # Located in Bulgaria
                
                VALUES ?typeId {
                    ${Object.values(this.resourceTypeMap).join('\n\t\t\t')}
                }
                
                ?item wdt:P31/wdt:P279* ?typeId.
                
                ?typeId rdfs:label ?typeLabel.
                FILTER(LANG(?typeLabel) = "en")
                
                OPTIONAL { ?item wdt:P625 ?coord. }
                OPTIONAL { ?item wdt:P2234 ?capacity. }
                
                SERVICE wikibase:label { bd:serviceParam wikibase:language "bg,en". }
            }
            LIMIT ${limit}
            OFFSET ${offset}
        `;

        return await this.sparqlClient.fetch(query);
    }

    async getById(id) {
        const query = `
            SELECT ?item ?itemLabel ?typeId ?typeLabel ?coord ?capacity WHERE {
                ?item wdt:P17 wd:Q219. # Located in Bulgaria
                BIND(${id} AS ?item)
                
                ?item wdt:P31/wdt:P279* ?typeId.
                
                ?typeId rdfs:label ?typeLabel.
                FILTER(LANG(?typeLabel) = "en")
                
                OPTIONAL { ?item wdt:P625 ?coord. }
                OPTIONAL { ?item wdt:P2234 ?capacity. }
                
                SERVICE wikibase:label { bd:serviceParam wikibase:language "bg,en". }
            }
            LIMIT 1
        `;

        return await this.sparqlClient.fetch(query);
    }
}

export const waterResourceService = new WaterResourceService();
