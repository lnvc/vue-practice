import gql from "graphql-tag";

export const GET_ALL_CHARACTERS = gql`
query GetAllCharacters($page: Int) {
  characters(page: $page) {
    info {
      next
      prev
    }
    results {
      id
      name
    }
  }
}
`;

export const GET_ALL_LOCATIONS = gql`
query GetAllLocations($page: Int) {
  locations(page: $page) {
    info {
      next
      prev
    }
    results {
      id
      name
    }
  }
}
`;

export const GET_ALL_EPISODES = gql`
query GetAllEpisodes($page: Int) {
  episodes(page: $page) {
    info {
      next
      prev
    }
    results {
      id
      name
    }
  }
}
`;
