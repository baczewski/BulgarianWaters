import { gql } from '@apollo/client';

export const GET_WATER_RESOURCES = gql`
  query GetWaterResources($limit: Int, $offset: Int) {
    waterResources(limit: $limit, offset: $offset) {
      id
      name
      type
      coordinates {
        latitude
        longitude
      }
    }
  }
`;