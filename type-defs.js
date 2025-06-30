import { gql } from 'apollo-server';

export const typeDefs = gql`
    enum WaterSourceType {
        RIVER
        DAM
        LAKE
        RESERVOIR
    }

    type Coordinates {
        latitude: Float
        longitude: Float
    }

    type WaterResource {
        id: ID!
        name: String!
        type: WaterSourceType!
        coordinates: Coordinates
    }

    type Query {
        hello: String

        waterResources(
            limit: Int
            offset: Int
        ): [WaterResource]
    }
`;
