import { gql } from 'apollo-server';

export const typeDefs = gql`
    enum WaterSourceType {
        RIVER
        DAM
        LAKE
        RESERVOIR
    }

    type Query {
        hello: String
    }
`;
