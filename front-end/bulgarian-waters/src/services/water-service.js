import { gql } from '@apollo/client';

export const GET_WATER_RESOURCES = gql`
  query GetWaterResources(
    $limit: Int
    $offset: Int
    $type: WaterSourceType
    $minCapacity: Float
    $minSurfaceArea: Float
  ) {
    waterResources(
      limit: $limit
      offset: $offset
      type: $type
      minCapacity: $minCapacity
      minSurfaceArea: $minSurfaceArea
    ) {
      id
      name
      type
      capacity
      surfaceArea
      coordinates {
        latitude
        longitude
      }
    }
  }
`;