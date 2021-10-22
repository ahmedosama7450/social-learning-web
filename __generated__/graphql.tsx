import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `BigInt` scalar type represents non-fractional signed whole numeric values.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
   */
  BigInt: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Bytes: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** An arbitrary-precision Decimal type */
  Decimal: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: any;
};





export type Discussion = {
  __typename?: 'Discussion';
  id: Scalars['Int'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  university: Scalars['Int'];
  college: Scalars['Int'];
  year: Scalars['Int'];
  tags: Array<Scalars['String']>;
  upvotesCount: Scalars['Int'];
  downvotesCount: Scalars['Int'];
  commentsCount: Scalars['Int'];
  authorId: Scalars['Int'];
  author: User;
};

export type DiscussionConnection = {
  __typename?: 'DiscussionConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<DiscussionEdge>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type DiscussionEdge = {
  __typename?: 'DiscussionEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Discussion;
};

export type EduOrgs = {
  __typename?: 'EduOrgs';
  universities: Scalars['Json'];
  colleges: Scalars['Json'];
  tags: Scalars['Json'];
};

export type EduOrgsInfo = {
  __typename?: 'EduOrgsInfo';
  eduOrgs?: Maybe<EduOrgs>;
  version: Scalars['Int'];
};


export enum Locale {
  Arabic = 'ARABIC',
  English = 'ENGLISH'
}

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create an access token for the user + put it in a cookie. if the user doesn't exist, a new user is created */
  loginWithProvider: LoginResponse;
  /** Logout for web client to clear the auth http-only cookie */
  logout: Scalars['Boolean'];
  /** Calling this mutation if profile is already created will result in an error */
  createProfile: User;
};


export type MutationLoginWithProviderArgs = {
  provider: Provider;
  code: Scalars['String'];
};


export type MutationCreateProfileArgs = {
  profileCreateInput: ProfileCreateInput;
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  bio: Scalars['String'];
  locale: Locale;
  university: Scalars['Int'];
  college: Scalars['Int'];
  year: Scalars['Int'];
  userId: Scalars['Int'];
};

export type ProfileCreateInput = {
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  /** This is not a url to the avatar but more of a choice that's determined by the frontend */
  avatar?: Maybe<Scalars['String']>;
  bio: Scalars['String'];
  locale: Locale;
  university: Scalars['Int'];
  college: Scalars['Int'];
  year: Scalars['Int'];
};

export enum Provider {
  Google = 'GOOGLE'
}

export type Query = {
  __typename?: 'Query';
  me: User;
  /** cachedVersion is compared to the current version to decide if we need to send data back or not. the version is always sent back */
  eduOrgsInfo: EduOrgsInfo;
  discussions: DiscussionConnection;
};


export type QueryEduOrgsInfoArgs = {
  cachedVersion?: Maybe<Scalars['Int']>;
};


export type QueryDiscussionsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  provider: Provider;
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  /** isActive is false if the user is banned */
  isActive: Scalars['Boolean'];
  /** This is not a url to the avatar but more of a choice that's determined by the frontend */
  avatar?: Maybe<Scalars['String']>;
  joinedAt: Scalars['DateTime'];
  isVerified: Scalars['Boolean'];
  reputation: Scalars['Int'];
  followersCount: Scalars['Int'];
  followingCount: Scalars['Int'];
  profile?: Maybe<Profile>;
};

export type EduOrgsInfoQueryVariables = Exact<{
  cachedVersion?: Maybe<Scalars['Int']>;
}>;


export type EduOrgsInfoQuery = { __typename?: 'Query', eduOrgsInfo: { __typename?: 'EduOrgsInfo', version: number, eduOrgs?: Maybe<{ __typename?: 'EduOrgs', universities: any, colleges: any, tags: any }> } };

export type UserFragment = { __typename?: 'User', id: number, provider: Provider, username: string, firstName: string, lastName: string, avatar?: Maybe<string>, joinedAt: any, isVerified: boolean, reputation: number, profile?: Maybe<{ __typename?: 'Profile', bio: string, locale: Locale, university: number, college: number, year: number }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, provider: Provider, username: string, firstName: string, lastName: string, avatar?: Maybe<string>, joinedAt: any, isVerified: boolean, reputation: number, profile?: Maybe<{ __typename?: 'Profile', bio: string, locale: Locale, university: number, college: number, year: number }> } };

export type LoginMutationVariables = Exact<{
  provider: Provider;
  code: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', loginWithProvider: { __typename?: 'LoginResponse', accessToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreateProfileMutationVariables = Exact<{
  profileCreateInput: ProfileCreateInput;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'User', id: number, provider: Provider, username: string, firstName: string, lastName: string, avatar?: Maybe<string>, joinedAt: any, isVerified: boolean, reputation: number, profile?: Maybe<{ __typename?: 'Profile', bio: string, locale: Locale, university: number, college: number, year: number }> } };

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  provider
  username
  firstName
  lastName
  avatar
  joinedAt
  isVerified
  reputation
  profile {
    bio
    locale
    university
    college
    year
  }
}
    `;
export const EduOrgsInfoDocument = gql`
    query EduOrgsInfo($cachedVersion: Int) {
  eduOrgsInfo(cachedVersion: $cachedVersion) {
    eduOrgs {
      universities
      colleges
      tags
    }
    version
  }
}
    `;

/**
 * __useEduOrgsInfoQuery__
 *
 * To run a query within a React component, call `useEduOrgsInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useEduOrgsInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEduOrgsInfoQuery({
 *   variables: {
 *      cachedVersion: // value for 'cachedVersion'
 *   },
 * });
 */
export function useEduOrgsInfoQuery(baseOptions?: Apollo.QueryHookOptions<EduOrgsInfoQuery, EduOrgsInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EduOrgsInfoQuery, EduOrgsInfoQueryVariables>(EduOrgsInfoDocument, options);
      }
export function useEduOrgsInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EduOrgsInfoQuery, EduOrgsInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EduOrgsInfoQuery, EduOrgsInfoQueryVariables>(EduOrgsInfoDocument, options);
        }
export type EduOrgsInfoQueryHookResult = ReturnType<typeof useEduOrgsInfoQuery>;
export type EduOrgsInfoLazyQueryHookResult = ReturnType<typeof useEduOrgsInfoLazyQuery>;
export type EduOrgsInfoQueryResult = Apollo.QueryResult<EduOrgsInfoQuery, EduOrgsInfoQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LoginDocument = gql`
    mutation Login($provider: Provider!, $code: String!) {
  loginWithProvider(provider: $provider, code: $code) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      provider: // value for 'provider'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateProfileDocument = gql`
    mutation CreateProfile($profileCreateInput: ProfileCreateInput!) {
  createProfile(profileCreateInput: $profileCreateInput) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      profileCreateInput: // value for 'profileCreateInput'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;