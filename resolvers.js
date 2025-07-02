import { graphqlTransformer } from "./graphql-transformer.js";
import { waterResourceService } from "./water-resource-service.js";

export const resolvers = {
    Query: {
        hello: () => console.log('Hello, Im Martin'),
        waterResources: async (_parent, args) => {
            const { offset = 0, limit = 100, type } = args;

            try {
                const waterResources = await waterResourceService.getAll(offset, limit, type);
                return graphqlTransformer.transform(waterResources);
            } catch (err) {
                console.error('Error fetching water resources:', err);
            }
        },
        waterResource: async (_parent, args) => {
            const { id } = args;

            try {
                const waterResource = await waterResourceService.getById(id);
                const [resource] = graphqlTransformer.transform(waterResource);
                return resource || null;
            } catch (err) {
                console.error('Error fetching water resource:', err);
            }
        }
    }
};
