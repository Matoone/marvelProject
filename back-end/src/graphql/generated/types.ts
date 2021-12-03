import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Character = {
  __typename?: 'Character';
  comics?: Maybe<ComicsData>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image: ImageResult;
  name: Scalars['String'];
};

export type CharactersResponse = {
  __typename?: 'CharactersResponse';
  characters: Array<Character>;
  hasMore: Scalars['Boolean'];
};

export type Comic = {
  __typename?: 'Comic';
  name: Scalars['String'];
};

export type ComicsData = {
  __typename?: 'ComicsData';
  appearances?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Comic>>;
};

export type GameCharacter = {
  __typename?: 'GameCharacter';
  id: Scalars['ID'];
  image: ImageResult;
  name: Scalars['String'];
  stats: Stats;
};

export type ImageResult = {
  __typename?: 'ImageResult';
  extension: Scalars['String'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signin: UserWithToken;
  signup: UserWithToken;
};


export type MutationSigninArgs = {
  userInput: UserInput;
};


export type MutationSignupArgs = {
  userInput: UserInput;
};

export type Query = {
  __typename?: 'Query';
  character: Character;
  characters: CharactersResponse;
  gameCharacters: Array<GameCharacter>;
  getUser: User;
  getUsers: Array<User>;
  hello: Scalars['String'];
};


export type QueryCharacterArgs = {
  id: Scalars['ID'];
};


export type QueryCharactersArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryGameCharactersArgs = {
  userId: Scalars['ID'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryGetUsersArgs = {
  ids: Array<Scalars['ID']>;
};

export type Stats = {
  __typename?: 'Stats';
  hp: Scalars['Int'];
  tire: Scalars['Int'];
  xp: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserWithToken = {
  __typename?: 'UserWithToken';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['ID'];
  token: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Character: ResolverTypeWrapper<Character>;
  CharactersResponse: ResolverTypeWrapper<CharactersResponse>;
  Comic: ResolverTypeWrapper<Comic>;
  ComicsData: ResolverTypeWrapper<ComicsData>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  GameCharacter: ResolverTypeWrapper<GameCharacter>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ImageResult: ResolverTypeWrapper<ImageResult>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Stats: ResolverTypeWrapper<Stats>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserWithToken: ResolverTypeWrapper<UserWithToken>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Character: Character;
  CharactersResponse: CharactersResponse;
  Comic: Comic;
  ComicsData: ComicsData;
  Date: Scalars['Date'];
  GameCharacter: GameCharacter;
  ID: Scalars['ID'];
  ImageResult: ImageResult;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  Stats: Stats;
  String: Scalars['String'];
  User: User;
  UserInput: UserInput;
  UserWithToken: UserWithToken;
}>;

export type CharacterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = ResolversObject<{
  comics?: Resolver<Maybe<ResolversTypes['ComicsData']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['ImageResult'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CharactersResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CharactersResponse'] = ResolversParentTypes['CharactersResponse']> = ResolversObject<{
  characters?: Resolver<Array<ResolversTypes['Character']>, ParentType, ContextType>;
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ComicResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comic'] = ResolversParentTypes['Comic']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ComicsDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ComicsData'] = ResolversParentTypes['ComicsData']> = ResolversObject<{
  appearances?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['Comic']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GameCharacterResolvers<ContextType = any, ParentType extends ResolversParentTypes['GameCharacter'] = ResolversParentTypes['GameCharacter']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['ImageResult'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stats?: Resolver<ResolversTypes['Stats'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageResult'] = ResolversParentTypes['ImageResult']> = ResolversObject<{
  extension?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  signin?: Resolver<ResolversTypes['UserWithToken'], ParentType, ContextType, RequireFields<MutationSigninArgs, 'userInput'>>;
  signup?: Resolver<ResolversTypes['UserWithToken'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'userInput'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  character?: Resolver<ResolversTypes['Character'], ParentType, ContextType, RequireFields<QueryCharacterArgs, 'id'>>;
  characters?: Resolver<ResolversTypes['CharactersResponse'], ParentType, ContextType, RequireFields<QueryCharactersArgs, 'limit' | 'offset'>>;
  gameCharacters?: Resolver<Array<ResolversTypes['GameCharacter']>, ParentType, ContextType, RequireFields<QueryGameCharactersArgs, 'userId'>>;
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  getUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUsersArgs, 'ids'>>;
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type StatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = ResolversObject<{
  hp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tire?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  xp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserWithTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWithToken'] = ResolversParentTypes['UserWithToken']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Character?: CharacterResolvers<ContextType>;
  CharactersResponse?: CharactersResponseResolvers<ContextType>;
  Comic?: ComicResolvers<ContextType>;
  ComicsData?: ComicsDataResolvers<ContextType>;
  Date?: GraphQLScalarType;
  GameCharacter?: GameCharacterResolvers<ContextType>;
  ImageResult?: ImageResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserWithToken?: UserWithTokenResolvers<ContextType>;
}>;

