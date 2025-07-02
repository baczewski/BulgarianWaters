import { gql } from '@apollo/client';

export const GET_WATER_RESOURCES = gql`
  query GetWaterResources($limit: Int, $offset: Int, $type: WaterSourceType) {
    waterResources(limit: $limit, offset: $offset, type: $type) {
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