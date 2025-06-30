import { graphqlTransformer } from "./graphql-transformer.js";
import { waterResourceService } from "./water-resource-service.js";

export const resolvers = {
    Query: {
        hello: () => console.log('Hello, Im Martin'),
        waterResources: async () => {
            try {
                const waterResources = await waterResourceService.getAll();
                return graphqlTransformer.transform(waterResources);
            } catch (err) {
                console.error('Error fetching water resources:', err);
            }
        }
    }
};
