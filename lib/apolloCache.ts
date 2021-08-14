// TODO We'll configure caching later

// import { concatPagination } from "@apollo/client/utilities";
import { InMemoryCache } from '@apollo/client';

export default new InMemoryCache(/* {
  typePolicies: {
    Query: {
      fields: {
        allPosts: concatPagination(),
      },
    },
  },
} */);
