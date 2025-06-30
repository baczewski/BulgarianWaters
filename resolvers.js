import { graphqlTransformer } from "./graphql-transformer.js";
import { waterResourceService } from "./water-resource-service.js";

export const resolvers = {
    Query: {
        hello: () => console.log('Hello, Im Martin'),
        waterResources: async (_parent, args) => {
            const { offset = 0, limit = 100 } = args;

            try {
                const waterResources = await waterResourceService.getAll(offset, limit);
                return graphqlTransformer.transform(waterResources);
            } catch (err) {
                console.error('Error fetching water resources:', err);
            }
        }
    }
};
