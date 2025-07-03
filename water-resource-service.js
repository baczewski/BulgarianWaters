import SparqlClient from "./sparql-client.js";

class WaterResourceService {
    constructor() {
        this.sparqlClient = new SparqlClient();
        this.resourceTypeMap = {
            'RIVER': 'wd:Q4022',
            'DAM': 'wd:Q12323',
            'LAKE': 'wd:Q23397',
            'RESERVOIR': 'wd:Q131681'
        };

        this.resourceTypes = Object.keys(this.resourceTypeMap);
    }

    async getAll(offset, limit, type, minCapacity, minSurfaceArea) {
        let typeFilter = '';
        if (type && this.resourceTypeMap[type]) {
            typeFilter = `VALUES ?typeId { ${this.resourceTypeMap[type]} }`;
        } else {
            typeFilter = `VALUES ?typeId { ${Object.values(this.resourceTypeMap).join('\n\t\t\t')} }`;
        }

        let capacityFilter = '';
        if (minCapacity) {
            capacityFilter = `
                ?item wdt:P2234 ?capacity.
                FILTER(?capacity >= ${minCapacity}).
            `;
        }

        let surfaceAreaFilter = '';
        if (minSurfaceArea) {
            surfaceAreaFilter = `
                ?item wdt:P2046 ?surfaceArea.
                FILTER(?surfaceArea >= ${minSurfaceArea}).
            `;
        }

        const query = `
            SELECT 
                ?itemLabel 
                (SAMPLE(?item) AS ?item) 
                (SAMPLE(?typeId) AS ?typeId) 
                (SAMPLE(?typeLabel) AS ?typeLabel) 
                (SAMPLE(?coord) AS ?coord) 
                (SAMPLE(?capacity) AS ?capacity) 
                (SAMPLE(?surfaceArea) AS ?surfaceArea)
            WHERE {
                ?item wdt:P17 wd:Q219. # Located in Bulgaria
                
                ${typeFilter}
                
                ?item wdt:P31/wdt:P279* ?typeId.
                
                ?typeId rdfs:label ?typeLabel.
                FILTER(LANG(?typeLabel) = "en")

                ${capacityFilter}
                ${surfaceAreaFilter}
                
                OPTIONAL { ?item wdt:P625 ?coord. }
                OPTIONAL { ?item wdt:P2234 ?capacity. }
                OPTIONAL { ?item wdt:P2046 ?surfaceArea. }
                
                SERVICE wikibase:label { bd:serviceParam wikibase:language "bg,en". }
            }
            GROUP BY ?itemLabel
            LIMIT ${limit}
            OFFSET ${offset}
        `;

        console.log(query)

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
