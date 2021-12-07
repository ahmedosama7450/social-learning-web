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



export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  authorId: Scalars['String'];
  author: User;
  postId: Scalars['String'];
  post: Post;
  body: Scalars['String'];
  attachments?: Maybe<Array<Scalars['String']>>;
  parentReplyId?: Maybe<Scalars['String']>;
  parentReply?: Maybe<Comment>;
  createdAt: Scalars['DateTime'];
  votesCount: Scalars['Int'];
  upvotesCount: Scalars['Int'];
  downvotesCount: Scalars['Int'];
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<CommentEdge>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  /** Flattened list of Comment type */
  nodes: Array<Comment>;
};

export type CommentCreateInput = {
  postId: Scalars['String'];
  parentReplyId?: Maybe<Scalars['String']>;
  body: Scalars['String'];
  attachments?: Maybe<Array<Scalars['String']>>;
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Comment;
};

export type CommentEditInput = {
  body: Scalars['String'];
  attachments?: Maybe<Array<Scalars['String']>>;
};

export enum CommentsSortingOption {
  MostActive = 'MOST_ACTIVE',
  MostRecent = 'MOST_RECENT',
  MostVoted = 'MOST_VOTED'
}



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
  /** Create an access token for the user and put it in a cookie. if the user doesn't exist, an id is generated to make the token and the user info from provider is saved in a TempUserInfo record */
  loginWithProvider: LoginResponse;
  /** Logout for web client to clear the auth http-only cookie */
  logout: Scalars['Boolean'];
  /** Calling this mutation if user is already created will result in an error */
  createUser: LoginResponse;
  createPost: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  editPost: Scalars['Boolean'];
  createComment: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  editComment: Scalars['Boolean'];
};


export type MutationLoginWithProviderArgs = {
  provider: Provider;
  code: Scalars['String'];
};


export type MutationCreateUserArgs = {
  userCreateInput: UserCreateInput;
};


export type MutationCreatePostArgs = {
  postCreateInput: PostCreateInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationEditPostArgs = {
  id: Scalars['ID'];
  postEditInput: PostEditInput;
};


export type MutationCreateCommentArgs = {
  commentCreateInput: CommentCreateInput;
  isAnswer: Scalars['Boolean'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationEditCommentArgs = {
  id: Scalars['ID'];
  commentEditInput: CommentEditInput;
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

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  type: PostType;
  authorId: Scalars['String'];
  author: User;
  title: Scalars['String'];
  body: Scalars['String'];
  universityId?: Maybe<Scalars['Int']>;
  collegeId?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
  tagsIds?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['DateTime'];
  attachments?: Maybe<Array<Scalars['String']>>;
  coverUrl?: Maybe<Scalars['String']>;
  acceptedAnswerId?: Maybe<Scalars['String']>;
  acceptedAnswer?: Maybe<Comment>;
  votesCount: Scalars['Int'];
  upvotesCount: Scalars['Int'];
  downvotesCount: Scalars['Int'];
  viewsCount: Scalars['Int'];
  sharesCount: Scalars['Int'];
  commentsCount: Scalars['Int'];
  answersCount?: Maybe<Scalars['Int']>;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<PostEdge>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  /** Flattened list of Post type */
  nodes: Array<Post>;
};

export type PostCreateInput = {
  type: PostType;
  title: Scalars['String'];
  body: Scalars['String'];
  universityId?: Maybe<Scalars['Int']>;
  collegeId?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
  tagsIds?: Maybe<Array<Scalars['String']>>;
  attachments?: Maybe<Array<Scalars['String']>>;
  coverUrl?: Maybe<Scalars['String']>;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Post;
};

export type PostEditInput = {
  title: Scalars['String'];
  body: Scalars['String'];
  universityId?: Maybe<Scalars['Int']>;
  collegeId?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
  tagsIds?: Maybe<Array<Scalars['String']>>;
  attachments?: Maybe<Array<Scalars['String']>>;
  coverUrl?: Maybe<Scalars['String']>;
};

export enum PostType {
  Discussion = 'DISCUSSION',
  Question = 'QUESTION',
  Article = 'ARTICLE'
}

export enum PostsSortingOption {
  Trending = 'TRENDING',
  MostRecent = 'MOST_RECENT',
  MostVoted = 'MOST_VOTED'
}

export type PostsWhereInput = {
  type: PostType;
  universityId?: Maybe<Scalars['Int']>;
  collegeId?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
  tagsIds?: Maybe<Array<Scalars['String']>>;
};

export type Profile = {
  __typename?: 'Profile';
  locale: Locale;
  bio: Scalars['String'];
  universityId?: Maybe<Scalars['Int']>;
  collegeId?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export enum Provider {
  Google = 'GOOGLE'
}

export type Query = {
  __typename?: 'Query';
  me: User;
  /** Only exists if the user logged in for the first time and gets removed after the user is created */
  tempUserInfo: TempUserInfo;
  fakeLogin: LoginResponse;
  /** cachedVersion is compared to the current version to decide if we need to send data back or not. the version is always sent back */
  eduOrgsInfo: EduOrgsInfo;
  post: Post;
  posts: PostConnection;
  newsfeed: PostConnection;
  comment: Comment;
  comments: CommentConnection;
};


export type QueryFakeLoginArgs = {
  userId: Scalars['String'];
};


export type QueryEduOrgsInfoArgs = {
  cachedVersion?: Maybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  sorting: PostsSortingOption;
  postsWhereInput: PostsWhereInput;
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};


export type QueryNewsfeedArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};


export type QueryCommentArgs = {
  id: Scalars['ID'];
};


export type QueryCommentsArgs = {
  sorting: CommentsSortingOption;
  postId: Scalars['String'];
  parentReplyId?: Maybe<Scalars['String']>;
  queryAnswers: Scalars['Boolean'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};

export type TempUserInfo = {
  __typename?: 'TempUserInfo';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  profile: Profile;
  provider: Provider;
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  /** This is not a url to the avatar but more of an id of a choice that's determined by the frontend */
  avatar?: Maybe<Scalars['String']>;
  joinedAt: Scalars['DateTime'];
  reputation: Scalars['Int'];
  followersCount: Scalars['Int'];
  followingCount: Scalars['Int'];
  discussionsCount: Scalars['Int'];
  questionsCount: Scalars['Int'];
  articlesCount: Scalars['Int'];
  commentsCount: Scalars['Int'];
  answersCount: Scalars['Int'];
};

export type UserCreateInput = {
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  /** This is not a url to the avatar but more of an id of a choice that's determined by the frontend */
  avatar?: Maybe<Scalars['String']>;
  universityId?: Maybe<Scalars['Int']>;
  collegeId?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
  locale: Locale;
  bio: Scalars['String'];
};

export type EduOrgsInfoQueryVariables = Exact<{
  cachedVersion?: Maybe<Scalars['Int']>;
}>;


export type EduOrgsInfoQuery = { __typename?: 'Query', eduOrgsInfo: { __typename?: 'EduOrgsInfo', version: number, eduOrgs?: Maybe<{ __typename?: 'EduOrgs', universities: any, colleges: any, tags: any }> } };

export type UserFragment = { __typename?: 'User', id: string, provider: Provider, username: string, firstName: string, lastName: string, avatar?: Maybe<string>, joinedAt: any, reputation: number, followersCount: number, followingCount: number, discussionsCount: number, questionsCount: number, articlesCount: number, commentsCount: number, answersCount: number, profile: { __typename?: 'Profile', locale: Locale, bio: string, universityId?: Maybe<number>, collegeId?: Maybe<number>, year?: Maybe<number> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, provider: Provider, username: string, firstName: string, lastName: string, avatar?: Maybe<string>, joinedAt: any, reputation: number, followersCount: number, followingCount: number, discussionsCount: number, questionsCount: number, articlesCount: number, commentsCount: number, answersCount: number, profile: { __typename?: 'Profile', locale: Locale, bio: string, universityId?: Maybe<number>, collegeId?: Maybe<number>, year?: Maybe<number> } } };

export type TempUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type TempUserInfoQuery = { __typename?: 'Query', tempUserInfo: { __typename?: 'TempUserInfo', id: string, firstName: string, lastName: string, email?: Maybe<string>, username: string } };

export type LoginWithProviderMutationVariables = Exact<{
  provider: Provider;
  code: Scalars['String'];
}>;


export type LoginWithProviderMutation = { __typename?: 'Mutation', loginWithProvider: { __typename?: 'LoginResponse', accessToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreateUserMutationVariables = Exact<{
  userCreateInput: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'LoginResponse', accessToken: string } };

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  profile {
    locale
    bio
    universityId
    collegeId
    year
  }
  provider
  username
  firstName
  lastName
  avatar
  joinedAt
  reputation
  followersCount
  followingCount
  discussionsCount
  questionsCount
  articlesCount
  commentsCount
  answersCount
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
export const TempUserInfoDocument = gql`
    query TempUserInfo {
  tempUserInfo {
    id
    firstName
    lastName
    email
    username
  }
}
    `;

/**
 * __useTempUserInfoQuery__
 *
 * To run a query within a React component, call `useTempUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useTempUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTempUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useTempUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<TempUserInfoQuery, TempUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TempUserInfoQuery, TempUserInfoQueryVariables>(TempUserInfoDocument, options);
      }
export function useTempUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TempUserInfoQuery, TempUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TempUserInfoQuery, TempUserInfoQueryVariables>(TempUserInfoDocument, options);
        }
export type TempUserInfoQueryHookResult = ReturnType<typeof useTempUserInfoQuery>;
export type TempUserInfoLazyQueryHookResult = ReturnType<typeof useTempUserInfoLazyQuery>;
export type TempUserInfoQueryResult = Apollo.QueryResult<TempUserInfoQuery, TempUserInfoQueryVariables>;
export const LoginWithProviderDocument = gql`
    mutation LoginWithProvider($provider: Provider!, $code: String!) {
  loginWithProvider(provider: $provider, code: $code) {
    accessToken
  }
}
    `;
export type LoginWithProviderMutationFn = Apollo.MutationFunction<LoginWithProviderMutation, LoginWithProviderMutationVariables>;

/**
 * __useLoginWithProviderMutation__
 *
 * To run a mutation, you first call `useLoginWithProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithProviderMutation, { data, loading, error }] = useLoginWithProviderMutation({
 *   variables: {
 *      provider: // value for 'provider'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useLoginWithProviderMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithProviderMutation, LoginWithProviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithProviderMutation, LoginWithProviderMutationVariables>(LoginWithProviderDocument, options);
      }
export type LoginWithProviderMutationHookResult = ReturnType<typeof useLoginWithProviderMutation>;
export type LoginWithProviderMutationResult = Apollo.MutationResult<LoginWithProviderMutation>;
export type LoginWithProviderMutationOptions = Apollo.BaseMutationOptions<LoginWithProviderMutation, LoginWithProviderMutationVariables>;
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
export const CreateUserDocument = gql`
    mutation CreateUser($userCreateInput: UserCreateInput!) {
  createUser(userCreateInput: $userCreateInput) {
    accessToken
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      userCreateInput: // value for 'userCreateInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;