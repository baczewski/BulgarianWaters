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
        capacity: Float
        surfaceArea: Float
        description: String
    }

    type Query {
        hello: String

        waterResources(
            limit: Int
            offset: Int
            type: WaterSourceType
            minCapacity: Float
            minSurfaceArea: Float
        ): [WaterResource]

        waterResource(
            id: ID
        ): WaterResource
    }
`;
