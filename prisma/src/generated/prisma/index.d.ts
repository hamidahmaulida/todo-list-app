
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model tags
 * 
 */
export type tags = $Result.DefaultSelection<Prisma.$tagsPayload>
/**
 * Model todo_tags
 * 
 */
export type todo_tags = $Result.DefaultSelection<Prisma.$todo_tagsPayload>
/**
 * Model todos
 * 
 */
export type todos = $Result.DefaultSelection<Prisma.$todosPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tags
 * const tags = await prisma.tags.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tags
   * const tags = await prisma.tags.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.tags`: Exposes CRUD operations for the **tags** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tags.findMany()
    * ```
    */
  get tags(): Prisma.tagsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.todo_tags`: Exposes CRUD operations for the **todo_tags** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Todo_tags
    * const todo_tags = await prisma.todo_tags.findMany()
    * ```
    */
  get todo_tags(): Prisma.todo_tagsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.todos`: Exposes CRUD operations for the **todos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Todos
    * const todos = await prisma.todos.findMany()
    * ```
    */
  get todos(): Prisma.todosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    tags: 'tags',
    todo_tags: 'todo_tags',
    todos: 'todos',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "tags" | "todo_tags" | "todos" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      tags: {
        payload: Prisma.$tagsPayload<ExtArgs>
        fields: Prisma.tagsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tagsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tagsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          findFirst: {
            args: Prisma.tagsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tagsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          findMany: {
            args: Prisma.tagsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>[]
          }
          create: {
            args: Prisma.tagsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          createMany: {
            args: Prisma.tagsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tagsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>[]
          }
          delete: {
            args: Prisma.tagsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          update: {
            args: Prisma.tagsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          deleteMany: {
            args: Prisma.tagsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tagsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tagsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>[]
          }
          upsert: {
            args: Prisma.tagsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          aggregate: {
            args: Prisma.TagsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTags>
          }
          groupBy: {
            args: Prisma.tagsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagsGroupByOutputType>[]
          }
          count: {
            args: Prisma.tagsCountArgs<ExtArgs>
            result: $Utils.Optional<TagsCountAggregateOutputType> | number
          }
        }
      }
      todo_tags: {
        payload: Prisma.$todo_tagsPayload<ExtArgs>
        fields: Prisma.todo_tagsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.todo_tagsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todo_tagsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.todo_tagsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todo_tagsPayload>
          }
          findFirst: {
            args: Prisma.todo_tagsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todo_tagsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.todo_tagsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todo_tagsPayload>
          }
          findMany: {
            args: Prisma.todo_tagsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todo_tagsPayload>[]
          }
          create: {
            args: Prisma.todo_tagsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todo_tagsPayload>
          }
          createMany: {
            args: Prisma.todo_tagsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.todo_tagsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todo_tagsPayload>[]
          }
          delete: {
            args: Prisma.todo_tagsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todo_tagsPayload>
          }
          update: {
            args: Prisma.todo_tagsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todo_tagsPayload>
          }
          deleteMany: {
            args: Prisma.todo_tagsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.todo_tagsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.todo_tagsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todo_tagsPayload>[]
          }
          upsert: {
            args: Prisma.todo_tagsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todo_tagsPayload>
          }
          aggregate: {
            args: Prisma.Todo_tagsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTodo_tags>
          }
          groupBy: {
            args: Prisma.todo_tagsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Todo_tagsGroupByOutputType>[]
          }
          count: {
            args: Prisma.todo_tagsCountArgs<ExtArgs>
            result: $Utils.Optional<Todo_tagsCountAggregateOutputType> | number
          }
        }
      }
      todos: {
        payload: Prisma.$todosPayload<ExtArgs>
        fields: Prisma.todosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.todosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.todosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todosPayload>
          }
          findFirst: {
            args: Prisma.todosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.todosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todosPayload>
          }
          findMany: {
            args: Prisma.todosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todosPayload>[]
          }
          create: {
            args: Prisma.todosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todosPayload>
          }
          createMany: {
            args: Prisma.todosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.todosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todosPayload>[]
          }
          delete: {
            args: Prisma.todosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todosPayload>
          }
          update: {
            args: Prisma.todosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todosPayload>
          }
          deleteMany: {
            args: Prisma.todosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.todosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.todosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todosPayload>[]
          }
          upsert: {
            args: Prisma.todosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$todosPayload>
          }
          aggregate: {
            args: Prisma.TodosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTodos>
          }
          groupBy: {
            args: Prisma.todosGroupByArgs<ExtArgs>
            result: $Utils.Optional<TodosGroupByOutputType>[]
          }
          count: {
            args: Prisma.todosCountArgs<ExtArgs>
            result: $Utils.Optional<TodosCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    tags?: tagsOmit
    todo_tags?: todo_tagsOmit
    todos?: todosOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TagsCountOutputType
   */

  export type TagsCountOutputType = {
    todo_tags: number
  }

  export type TagsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    todo_tags?: boolean | TagsCountOutputTypeCountTodo_tagsArgs
  }

  // Custom InputTypes
  /**
   * TagsCountOutputType without action
   */
  export type TagsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagsCountOutputType
     */
    select?: TagsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagsCountOutputType without action
   */
  export type TagsCountOutputTypeCountTodo_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: todo_tagsWhereInput
  }


  /**
   * Count Type TodosCountOutputType
   */

  export type TodosCountOutputType = {
    todo_tags: number
  }

  export type TodosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    todo_tags?: boolean | TodosCountOutputTypeCountTodo_tagsArgs
  }

  // Custom InputTypes
  /**
   * TodosCountOutputType without action
   */
  export type TodosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TodosCountOutputType
     */
    select?: TodosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TodosCountOutputType without action
   */
  export type TodosCountOutputTypeCountTodo_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: todo_tagsWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    tags: number
    todos: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | UsersCountOutputTypeCountTagsArgs
    todos?: boolean | UsersCountOutputTypeCountTodosArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tagsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountTodosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: todosWhereInput
  }


  /**
   * Models
   */

  /**
   * Model tags
   */

  export type AggregateTags = {
    _count: TagsCountAggregateOutputType | null
    _min: TagsMinAggregateOutputType | null
    _max: TagsMaxAggregateOutputType | null
  }

  export type TagsMinAggregateOutputType = {
    tag_id: string | null
    user_id: string | null
    tag_name: string | null
  }

  export type TagsMaxAggregateOutputType = {
    tag_id: string | null
    user_id: string | null
    tag_name: string | null
  }

  export type TagsCountAggregateOutputType = {
    tag_id: number
    user_id: number
    tag_name: number
    _all: number
  }


  export type TagsMinAggregateInputType = {
    tag_id?: true
    user_id?: true
    tag_name?: true
  }

  export type TagsMaxAggregateInputType = {
    tag_id?: true
    user_id?: true
    tag_name?: true
  }

  export type TagsCountAggregateInputType = {
    tag_id?: true
    user_id?: true
    tag_name?: true
    _all?: true
  }

  export type TagsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tags to aggregate.
     */
    where?: tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tags
    **/
    _count?: true | TagsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagsMaxAggregateInputType
  }

  export type GetTagsAggregateType<T extends TagsAggregateArgs> = {
        [P in keyof T & keyof AggregateTags]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTags[P]>
      : GetScalarType<T[P], AggregateTags[P]>
  }




  export type tagsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tagsWhereInput
    orderBy?: tagsOrderByWithAggregationInput | tagsOrderByWithAggregationInput[]
    by: TagsScalarFieldEnum[] | TagsScalarFieldEnum
    having?: tagsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagsCountAggregateInputType | true
    _min?: TagsMinAggregateInputType
    _max?: TagsMaxAggregateInputType
  }

  export type TagsGroupByOutputType = {
    tag_id: string
    user_id: string
    tag_name: string
    _count: TagsCountAggregateOutputType | null
    _min: TagsMinAggregateOutputType | null
    _max: TagsMaxAggregateOutputType | null
  }

  type GetTagsGroupByPayload<T extends tagsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagsGroupByOutputType[P]>
            : GetScalarType<T[P], TagsGroupByOutputType[P]>
        }
      >
    >


  export type tagsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tag_id?: boolean
    user_id?: boolean
    tag_name?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    todo_tags?: boolean | tags$todo_tagsArgs<ExtArgs>
    _count?: boolean | TagsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tags"]>

  export type tagsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tag_id?: boolean
    user_id?: boolean
    tag_name?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tags"]>

  export type tagsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tag_id?: boolean
    user_id?: boolean
    tag_name?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tags"]>

  export type tagsSelectScalar = {
    tag_id?: boolean
    user_id?: boolean
    tag_name?: boolean
  }

  export type tagsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"tag_id" | "user_id" | "tag_name", ExtArgs["result"]["tags"]>
  export type tagsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    todo_tags?: boolean | tags$todo_tagsArgs<ExtArgs>
    _count?: boolean | TagsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type tagsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type tagsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $tagsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tags"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
      todo_tags: Prisma.$todo_tagsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      tag_id: string
      user_id: string
      tag_name: string
    }, ExtArgs["result"]["tags"]>
    composites: {}
  }

  type tagsGetPayload<S extends boolean | null | undefined | tagsDefaultArgs> = $Result.GetResult<Prisma.$tagsPayload, S>

  type tagsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tagsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagsCountAggregateInputType | true
    }

  export interface tagsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tags'], meta: { name: 'tags' } }
    /**
     * Find zero or one Tags that matches the filter.
     * @param {tagsFindUniqueArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tagsFindUniqueArgs>(args: SelectSubset<T, tagsFindUniqueArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tags that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tagsFindUniqueOrThrowArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tagsFindUniqueOrThrowArgs>(args: SelectSubset<T, tagsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsFindFirstArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tagsFindFirstArgs>(args?: SelectSubset<T, tagsFindFirstArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tags that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsFindFirstOrThrowArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tagsFindFirstOrThrowArgs>(args?: SelectSubset<T, tagsFindFirstOrThrowArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tags.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tags.findMany({ take: 10 })
     * 
     * // Only select the `tag_id`
     * const tagsWithTag_idOnly = await prisma.tags.findMany({ select: { tag_id: true } })
     * 
     */
    findMany<T extends tagsFindManyArgs>(args?: SelectSubset<T, tagsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tags.
     * @param {tagsCreateArgs} args - Arguments to create a Tags.
     * @example
     * // Create one Tags
     * const Tags = await prisma.tags.create({
     *   data: {
     *     // ... data to create a Tags
     *   }
     * })
     * 
     */
    create<T extends tagsCreateArgs>(args: SelectSubset<T, tagsCreateArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {tagsCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tags = await prisma.tags.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tagsCreateManyArgs>(args?: SelectSubset<T, tagsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {tagsCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tags = await prisma.tags.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `tag_id`
     * const tagsWithTag_idOnly = await prisma.tags.createManyAndReturn({
     *   select: { tag_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tagsCreateManyAndReturnArgs>(args?: SelectSubset<T, tagsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tags.
     * @param {tagsDeleteArgs} args - Arguments to delete one Tags.
     * @example
     * // Delete one Tags
     * const Tags = await prisma.tags.delete({
     *   where: {
     *     // ... filter to delete one Tags
     *   }
     * })
     * 
     */
    delete<T extends tagsDeleteArgs>(args: SelectSubset<T, tagsDeleteArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tags.
     * @param {tagsUpdateArgs} args - Arguments to update one Tags.
     * @example
     * // Update one Tags
     * const tags = await prisma.tags.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tagsUpdateArgs>(args: SelectSubset<T, tagsUpdateArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {tagsDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tags.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tagsDeleteManyArgs>(args?: SelectSubset<T, tagsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tags = await prisma.tags.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tagsUpdateManyArgs>(args: SelectSubset<T, tagsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {tagsUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tags = await prisma.tags.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `tag_id`
     * const tagsWithTag_idOnly = await prisma.tags.updateManyAndReturn({
     *   select: { tag_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tagsUpdateManyAndReturnArgs>(args: SelectSubset<T, tagsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tags.
     * @param {tagsUpsertArgs} args - Arguments to update or create a Tags.
     * @example
     * // Update or create a Tags
     * const tags = await prisma.tags.upsert({
     *   create: {
     *     // ... data to create a Tags
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tags we want to update
     *   }
     * })
     */
    upsert<T extends tagsUpsertArgs>(args: SelectSubset<T, tagsUpsertArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tags.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends tagsCountArgs>(
      args?: Subset<T, tagsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagsAggregateArgs>(args: Subset<T, TagsAggregateArgs>): Prisma.PrismaPromise<GetTagsAggregateType<T>>

    /**
     * Group by Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tagsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tagsGroupByArgs['orderBy'] }
        : { orderBy?: tagsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tagsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tags model
   */
  readonly fields: tagsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tags.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tagsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    todo_tags<T extends tags$todo_tagsArgs<ExtArgs> = {}>(args?: Subset<T, tags$todo_tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$todo_tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tags model
   */
  interface tagsFieldRefs {
    readonly tag_id: FieldRef<"tags", 'String'>
    readonly user_id: FieldRef<"tags", 'String'>
    readonly tag_name: FieldRef<"tags", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tags findUnique
   */
  export type tagsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where: tagsWhereUniqueInput
  }

  /**
   * tags findUniqueOrThrow
   */
  export type tagsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where: tagsWhereUniqueInput
  }

  /**
   * tags findFirst
   */
  export type tagsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where?: tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tags.
     */
    cursor?: tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tags.
     */
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
  }

  /**
   * tags findFirstOrThrow
   */
  export type tagsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where?: tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tags.
     */
    cursor?: tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tags.
     */
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
  }

  /**
   * tags findMany
   */
  export type tagsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where?: tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tags.
     */
    cursor?: tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
  }

  /**
   * tags create
   */
  export type tagsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * The data needed to create a tags.
     */
    data: XOR<tagsCreateInput, tagsUncheckedCreateInput>
  }

  /**
   * tags createMany
   */
  export type tagsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tags.
     */
    data: tagsCreateManyInput | tagsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tags createManyAndReturn
   */
  export type tagsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * The data used to create many tags.
     */
    data: tagsCreateManyInput | tagsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * tags update
   */
  export type tagsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * The data needed to update a tags.
     */
    data: XOR<tagsUpdateInput, tagsUncheckedUpdateInput>
    /**
     * Choose, which tags to update.
     */
    where: tagsWhereUniqueInput
  }

  /**
   * tags updateMany
   */
  export type tagsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tags.
     */
    data: XOR<tagsUpdateManyMutationInput, tagsUncheckedUpdateManyInput>
    /**
     * Filter which tags to update
     */
    where?: tagsWhereInput
    /**
     * Limit how many tags to update.
     */
    limit?: number
  }

  /**
   * tags updateManyAndReturn
   */
  export type tagsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * The data used to update tags.
     */
    data: XOR<tagsUpdateManyMutationInput, tagsUncheckedUpdateManyInput>
    /**
     * Filter which tags to update
     */
    where?: tagsWhereInput
    /**
     * Limit how many tags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * tags upsert
   */
  export type tagsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * The filter to search for the tags to update in case it exists.
     */
    where: tagsWhereUniqueInput
    /**
     * In case the tags found by the `where` argument doesn't exist, create a new tags with this data.
     */
    create: XOR<tagsCreateInput, tagsUncheckedCreateInput>
    /**
     * In case the tags was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tagsUpdateInput, tagsUncheckedUpdateInput>
  }

  /**
   * tags delete
   */
  export type tagsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter which tags to delete.
     */
    where: tagsWhereUniqueInput
  }

  /**
   * tags deleteMany
   */
  export type tagsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tags to delete
     */
    where?: tagsWhereInput
    /**
     * Limit how many tags to delete.
     */
    limit?: number
  }

  /**
   * tags.todo_tags
   */
  export type tags$todo_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsInclude<ExtArgs> | null
    where?: todo_tagsWhereInput
    orderBy?: todo_tagsOrderByWithRelationInput | todo_tagsOrderByWithRelationInput[]
    cursor?: todo_tagsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Todo_tagsScalarFieldEnum | Todo_tagsScalarFieldEnum[]
  }

  /**
   * tags without action
   */
  export type tagsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
  }


  /**
   * Model todo_tags
   */

  export type AggregateTodo_tags = {
    _count: Todo_tagsCountAggregateOutputType | null
    _min: Todo_tagsMinAggregateOutputType | null
    _max: Todo_tagsMaxAggregateOutputType | null
  }

  export type Todo_tagsMinAggregateOutputType = {
    todo_id: string | null
    tag_id: string | null
  }

  export type Todo_tagsMaxAggregateOutputType = {
    todo_id: string | null
    tag_id: string | null
  }

  export type Todo_tagsCountAggregateOutputType = {
    todo_id: number
    tag_id: number
    _all: number
  }


  export type Todo_tagsMinAggregateInputType = {
    todo_id?: true
    tag_id?: true
  }

  export type Todo_tagsMaxAggregateInputType = {
    todo_id?: true
    tag_id?: true
  }

  export type Todo_tagsCountAggregateInputType = {
    todo_id?: true
    tag_id?: true
    _all?: true
  }

  export type Todo_tagsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which todo_tags to aggregate.
     */
    where?: todo_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of todo_tags to fetch.
     */
    orderBy?: todo_tagsOrderByWithRelationInput | todo_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: todo_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` todo_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` todo_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned todo_tags
    **/
    _count?: true | Todo_tagsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Todo_tagsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Todo_tagsMaxAggregateInputType
  }

  export type GetTodo_tagsAggregateType<T extends Todo_tagsAggregateArgs> = {
        [P in keyof T & keyof AggregateTodo_tags]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTodo_tags[P]>
      : GetScalarType<T[P], AggregateTodo_tags[P]>
  }




  export type todo_tagsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: todo_tagsWhereInput
    orderBy?: todo_tagsOrderByWithAggregationInput | todo_tagsOrderByWithAggregationInput[]
    by: Todo_tagsScalarFieldEnum[] | Todo_tagsScalarFieldEnum
    having?: todo_tagsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Todo_tagsCountAggregateInputType | true
    _min?: Todo_tagsMinAggregateInputType
    _max?: Todo_tagsMaxAggregateInputType
  }

  export type Todo_tagsGroupByOutputType = {
    todo_id: string
    tag_id: string
    _count: Todo_tagsCountAggregateOutputType | null
    _min: Todo_tagsMinAggregateOutputType | null
    _max: Todo_tagsMaxAggregateOutputType | null
  }

  type GetTodo_tagsGroupByPayload<T extends todo_tagsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Todo_tagsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Todo_tagsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Todo_tagsGroupByOutputType[P]>
            : GetScalarType<T[P], Todo_tagsGroupByOutputType[P]>
        }
      >
    >


  export type todo_tagsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    todo_id?: boolean
    tag_id?: boolean
    tags?: boolean | tagsDefaultArgs<ExtArgs>
    todos?: boolean | todosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["todo_tags"]>

  export type todo_tagsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    todo_id?: boolean
    tag_id?: boolean
    tags?: boolean | tagsDefaultArgs<ExtArgs>
    todos?: boolean | todosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["todo_tags"]>

  export type todo_tagsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    todo_id?: boolean
    tag_id?: boolean
    tags?: boolean | tagsDefaultArgs<ExtArgs>
    todos?: boolean | todosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["todo_tags"]>

  export type todo_tagsSelectScalar = {
    todo_id?: boolean
    tag_id?: boolean
  }

  export type todo_tagsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"todo_id" | "tag_id", ExtArgs["result"]["todo_tags"]>
  export type todo_tagsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | tagsDefaultArgs<ExtArgs>
    todos?: boolean | todosDefaultArgs<ExtArgs>
  }
  export type todo_tagsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | tagsDefaultArgs<ExtArgs>
    todos?: boolean | todosDefaultArgs<ExtArgs>
  }
  export type todo_tagsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | tagsDefaultArgs<ExtArgs>
    todos?: boolean | todosDefaultArgs<ExtArgs>
  }

  export type $todo_tagsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "todo_tags"
    objects: {
      tags: Prisma.$tagsPayload<ExtArgs>
      todos: Prisma.$todosPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      todo_id: string
      tag_id: string
    }, ExtArgs["result"]["todo_tags"]>
    composites: {}
  }

  type todo_tagsGetPayload<S extends boolean | null | undefined | todo_tagsDefaultArgs> = $Result.GetResult<Prisma.$todo_tagsPayload, S>

  type todo_tagsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<todo_tagsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Todo_tagsCountAggregateInputType | true
    }

  export interface todo_tagsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['todo_tags'], meta: { name: 'todo_tags' } }
    /**
     * Find zero or one Todo_tags that matches the filter.
     * @param {todo_tagsFindUniqueArgs} args - Arguments to find a Todo_tags
     * @example
     * // Get one Todo_tags
     * const todo_tags = await prisma.todo_tags.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends todo_tagsFindUniqueArgs>(args: SelectSubset<T, todo_tagsFindUniqueArgs<ExtArgs>>): Prisma__todo_tagsClient<$Result.GetResult<Prisma.$todo_tagsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Todo_tags that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {todo_tagsFindUniqueOrThrowArgs} args - Arguments to find a Todo_tags
     * @example
     * // Get one Todo_tags
     * const todo_tags = await prisma.todo_tags.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends todo_tagsFindUniqueOrThrowArgs>(args: SelectSubset<T, todo_tagsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__todo_tagsClient<$Result.GetResult<Prisma.$todo_tagsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Todo_tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {todo_tagsFindFirstArgs} args - Arguments to find a Todo_tags
     * @example
     * // Get one Todo_tags
     * const todo_tags = await prisma.todo_tags.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends todo_tagsFindFirstArgs>(args?: SelectSubset<T, todo_tagsFindFirstArgs<ExtArgs>>): Prisma__todo_tagsClient<$Result.GetResult<Prisma.$todo_tagsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Todo_tags that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {todo_tagsFindFirstOrThrowArgs} args - Arguments to find a Todo_tags
     * @example
     * // Get one Todo_tags
     * const todo_tags = await prisma.todo_tags.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends todo_tagsFindFirstOrThrowArgs>(args?: SelectSubset<T, todo_tagsFindFirstOrThrowArgs<ExtArgs>>): Prisma__todo_tagsClient<$Result.GetResult<Prisma.$todo_tagsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Todo_tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {todo_tagsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Todo_tags
     * const todo_tags = await prisma.todo_tags.findMany()
     * 
     * // Get first 10 Todo_tags
     * const todo_tags = await prisma.todo_tags.findMany({ take: 10 })
     * 
     * // Only select the `todo_id`
     * const todo_tagsWithTodo_idOnly = await prisma.todo_tags.findMany({ select: { todo_id: true } })
     * 
     */
    findMany<T extends todo_tagsFindManyArgs>(args?: SelectSubset<T, todo_tagsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$todo_tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Todo_tags.
     * @param {todo_tagsCreateArgs} args - Arguments to create a Todo_tags.
     * @example
     * // Create one Todo_tags
     * const Todo_tags = await prisma.todo_tags.create({
     *   data: {
     *     // ... data to create a Todo_tags
     *   }
     * })
     * 
     */
    create<T extends todo_tagsCreateArgs>(args: SelectSubset<T, todo_tagsCreateArgs<ExtArgs>>): Prisma__todo_tagsClient<$Result.GetResult<Prisma.$todo_tagsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Todo_tags.
     * @param {todo_tagsCreateManyArgs} args - Arguments to create many Todo_tags.
     * @example
     * // Create many Todo_tags
     * const todo_tags = await prisma.todo_tags.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends todo_tagsCreateManyArgs>(args?: SelectSubset<T, todo_tagsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Todo_tags and returns the data saved in the database.
     * @param {todo_tagsCreateManyAndReturnArgs} args - Arguments to create many Todo_tags.
     * @example
     * // Create many Todo_tags
     * const todo_tags = await prisma.todo_tags.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Todo_tags and only return the `todo_id`
     * const todo_tagsWithTodo_idOnly = await prisma.todo_tags.createManyAndReturn({
     *   select: { todo_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends todo_tagsCreateManyAndReturnArgs>(args?: SelectSubset<T, todo_tagsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$todo_tagsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Todo_tags.
     * @param {todo_tagsDeleteArgs} args - Arguments to delete one Todo_tags.
     * @example
     * // Delete one Todo_tags
     * const Todo_tags = await prisma.todo_tags.delete({
     *   where: {
     *     // ... filter to delete one Todo_tags
     *   }
     * })
     * 
     */
    delete<T extends todo_tagsDeleteArgs>(args: SelectSubset<T, todo_tagsDeleteArgs<ExtArgs>>): Prisma__todo_tagsClient<$Result.GetResult<Prisma.$todo_tagsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Todo_tags.
     * @param {todo_tagsUpdateArgs} args - Arguments to update one Todo_tags.
     * @example
     * // Update one Todo_tags
     * const todo_tags = await prisma.todo_tags.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends todo_tagsUpdateArgs>(args: SelectSubset<T, todo_tagsUpdateArgs<ExtArgs>>): Prisma__todo_tagsClient<$Result.GetResult<Prisma.$todo_tagsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Todo_tags.
     * @param {todo_tagsDeleteManyArgs} args - Arguments to filter Todo_tags to delete.
     * @example
     * // Delete a few Todo_tags
     * const { count } = await prisma.todo_tags.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends todo_tagsDeleteManyArgs>(args?: SelectSubset<T, todo_tagsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Todo_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {todo_tagsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Todo_tags
     * const todo_tags = await prisma.todo_tags.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends todo_tagsUpdateManyArgs>(args: SelectSubset<T, todo_tagsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Todo_tags and returns the data updated in the database.
     * @param {todo_tagsUpdateManyAndReturnArgs} args - Arguments to update many Todo_tags.
     * @example
     * // Update many Todo_tags
     * const todo_tags = await prisma.todo_tags.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Todo_tags and only return the `todo_id`
     * const todo_tagsWithTodo_idOnly = await prisma.todo_tags.updateManyAndReturn({
     *   select: { todo_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends todo_tagsUpdateManyAndReturnArgs>(args: SelectSubset<T, todo_tagsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$todo_tagsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Todo_tags.
     * @param {todo_tagsUpsertArgs} args - Arguments to update or create a Todo_tags.
     * @example
     * // Update or create a Todo_tags
     * const todo_tags = await prisma.todo_tags.upsert({
     *   create: {
     *     // ... data to create a Todo_tags
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Todo_tags we want to update
     *   }
     * })
     */
    upsert<T extends todo_tagsUpsertArgs>(args: SelectSubset<T, todo_tagsUpsertArgs<ExtArgs>>): Prisma__todo_tagsClient<$Result.GetResult<Prisma.$todo_tagsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Todo_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {todo_tagsCountArgs} args - Arguments to filter Todo_tags to count.
     * @example
     * // Count the number of Todo_tags
     * const count = await prisma.todo_tags.count({
     *   where: {
     *     // ... the filter for the Todo_tags we want to count
     *   }
     * })
    **/
    count<T extends todo_tagsCountArgs>(
      args?: Subset<T, todo_tagsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Todo_tagsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Todo_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Todo_tagsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Todo_tagsAggregateArgs>(args: Subset<T, Todo_tagsAggregateArgs>): Prisma.PrismaPromise<GetTodo_tagsAggregateType<T>>

    /**
     * Group by Todo_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {todo_tagsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends todo_tagsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: todo_tagsGroupByArgs['orderBy'] }
        : { orderBy?: todo_tagsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, todo_tagsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTodo_tagsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the todo_tags model
   */
  readonly fields: todo_tagsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for todo_tags.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__todo_tagsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tags<T extends tagsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tagsDefaultArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    todos<T extends todosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, todosDefaultArgs<ExtArgs>>): Prisma__todosClient<$Result.GetResult<Prisma.$todosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the todo_tags model
   */
  interface todo_tagsFieldRefs {
    readonly todo_id: FieldRef<"todo_tags", 'String'>
    readonly tag_id: FieldRef<"todo_tags", 'String'>
  }
    

  // Custom InputTypes
  /**
   * todo_tags findUnique
   */
  export type todo_tagsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsInclude<ExtArgs> | null
    /**
     * Filter, which todo_tags to fetch.
     */
    where: todo_tagsWhereUniqueInput
  }

  /**
   * todo_tags findUniqueOrThrow
   */
  export type todo_tagsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsInclude<ExtArgs> | null
    /**
     * Filter, which todo_tags to fetch.
     */
    where: todo_tagsWhereUniqueInput
  }

  /**
   * todo_tags findFirst
   */
  export type todo_tagsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsInclude<ExtArgs> | null
    /**
     * Filter, which todo_tags to fetch.
     */
    where?: todo_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of todo_tags to fetch.
     */
    orderBy?: todo_tagsOrderByWithRelationInput | todo_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for todo_tags.
     */
    cursor?: todo_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` todo_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` todo_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of todo_tags.
     */
    distinct?: Todo_tagsScalarFieldEnum | Todo_tagsScalarFieldEnum[]
  }

  /**
   * todo_tags findFirstOrThrow
   */
  export type todo_tagsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsInclude<ExtArgs> | null
    /**
     * Filter, which todo_tags to fetch.
     */
    where?: todo_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of todo_tags to fetch.
     */
    orderBy?: todo_tagsOrderByWithRelationInput | todo_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for todo_tags.
     */
    cursor?: todo_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` todo_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` todo_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of todo_tags.
     */
    distinct?: Todo_tagsScalarFieldEnum | Todo_tagsScalarFieldEnum[]
  }

  /**
   * todo_tags findMany
   */
  export type todo_tagsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsInclude<ExtArgs> | null
    /**
     * Filter, which todo_tags to fetch.
     */
    where?: todo_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of todo_tags to fetch.
     */
    orderBy?: todo_tagsOrderByWithRelationInput | todo_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing todo_tags.
     */
    cursor?: todo_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` todo_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` todo_tags.
     */
    skip?: number
    distinct?: Todo_tagsScalarFieldEnum | Todo_tagsScalarFieldEnum[]
  }

  /**
   * todo_tags create
   */
  export type todo_tagsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsInclude<ExtArgs> | null
    /**
     * The data needed to create a todo_tags.
     */
    data: XOR<todo_tagsCreateInput, todo_tagsUncheckedCreateInput>
  }

  /**
   * todo_tags createMany
   */
  export type todo_tagsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many todo_tags.
     */
    data: todo_tagsCreateManyInput | todo_tagsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * todo_tags createManyAndReturn
   */
  export type todo_tagsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * The data used to create many todo_tags.
     */
    data: todo_tagsCreateManyInput | todo_tagsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * todo_tags update
   */
  export type todo_tagsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsInclude<ExtArgs> | null
    /**
     * The data needed to update a todo_tags.
     */
    data: XOR<todo_tagsUpdateInput, todo_tagsUncheckedUpdateInput>
    /**
     * Choose, which todo_tags to update.
     */
    where: todo_tagsWhereUniqueInput
  }

  /**
   * todo_tags updateMany
   */
  export type todo_tagsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update todo_tags.
     */
    data: XOR<todo_tagsUpdateManyMutationInput, todo_tagsUncheckedUpdateManyInput>
    /**
     * Filter which todo_tags to update
     */
    where?: todo_tagsWhereInput
    /**
     * Limit how many todo_tags to update.
     */
    limit?: number
  }

  /**
   * todo_tags updateManyAndReturn
   */
  export type todo_tagsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * The data used to update todo_tags.
     */
    data: XOR<todo_tagsUpdateManyMutationInput, todo_tagsUncheckedUpdateManyInput>
    /**
     * Filter which todo_tags to update
     */
    where?: todo_tagsWhereInput
    /**
     * Limit how many todo_tags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * todo_tags upsert
   */
  export type todo_tagsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsInclude<ExtArgs> | null
    /**
     * The filter to search for the todo_tags to update in case it exists.
     */
    where: todo_tagsWhereUniqueInput
    /**
     * In case the todo_tags found by the `where` argument doesn't exist, create a new todo_tags with this data.
     */
    create: XOR<todo_tagsCreateInput, todo_tagsUncheckedCreateInput>
    /**
     * In case the todo_tags was found with the provided `where` argument, update it with this data.
     */
    update: XOR<todo_tagsUpdateInput, todo_tagsUncheckedUpdateInput>
  }

  /**
   * todo_tags delete
   */
  export type todo_tagsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsInclude<ExtArgs> | null
    /**
     * Filter which todo_tags to delete.
     */
    where: todo_tagsWhereUniqueInput
  }

  /**
   * todo_tags deleteMany
   */
  export type todo_tagsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which todo_tags to delete
     */
    where?: todo_tagsWhereInput
    /**
     * Limit how many todo_tags to delete.
     */
    limit?: number
  }

  /**
   * todo_tags without action
   */
  export type todo_tagsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsInclude<ExtArgs> | null
  }


  /**
   * Model todos
   */

  export type AggregateTodos = {
    _count: TodosCountAggregateOutputType | null
    _min: TodosMinAggregateOutputType | null
    _max: TodosMaxAggregateOutputType | null
  }

  export type TodosMinAggregateOutputType = {
    todo_id: string | null
    user_id: string | null
    title: string | null
    content: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TodosMaxAggregateOutputType = {
    todo_id: string | null
    user_id: string | null
    title: string | null
    content: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TodosCountAggregateOutputType = {
    todo_id: number
    user_id: number
    title: number
    content: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TodosMinAggregateInputType = {
    todo_id?: true
    user_id?: true
    title?: true
    content?: true
    created_at?: true
    updated_at?: true
  }

  export type TodosMaxAggregateInputType = {
    todo_id?: true
    user_id?: true
    title?: true
    content?: true
    created_at?: true
    updated_at?: true
  }

  export type TodosCountAggregateInputType = {
    todo_id?: true
    user_id?: true
    title?: true
    content?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TodosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which todos to aggregate.
     */
    where?: todosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of todos to fetch.
     */
    orderBy?: todosOrderByWithRelationInput | todosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: todosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` todos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned todos
    **/
    _count?: true | TodosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TodosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TodosMaxAggregateInputType
  }

  export type GetTodosAggregateType<T extends TodosAggregateArgs> = {
        [P in keyof T & keyof AggregateTodos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTodos[P]>
      : GetScalarType<T[P], AggregateTodos[P]>
  }




  export type todosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: todosWhereInput
    orderBy?: todosOrderByWithAggregationInput | todosOrderByWithAggregationInput[]
    by: TodosScalarFieldEnum[] | TodosScalarFieldEnum
    having?: todosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TodosCountAggregateInputType | true
    _min?: TodosMinAggregateInputType
    _max?: TodosMaxAggregateInputType
  }

  export type TodosGroupByOutputType = {
    todo_id: string
    user_id: string
    title: string | null
    content: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: TodosCountAggregateOutputType | null
    _min: TodosMinAggregateOutputType | null
    _max: TodosMaxAggregateOutputType | null
  }

  type GetTodosGroupByPayload<T extends todosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TodosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TodosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TodosGroupByOutputType[P]>
            : GetScalarType<T[P], TodosGroupByOutputType[P]>
        }
      >
    >


  export type todosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    todo_id?: boolean
    user_id?: boolean
    title?: boolean
    content?: boolean
    created_at?: boolean
    updated_at?: boolean
    todo_tags?: boolean | todos$todo_tagsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | TodosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["todos"]>

  export type todosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    todo_id?: boolean
    user_id?: boolean
    title?: boolean
    content?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["todos"]>

  export type todosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    todo_id?: boolean
    user_id?: boolean
    title?: boolean
    content?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["todos"]>

  export type todosSelectScalar = {
    todo_id?: boolean
    user_id?: boolean
    title?: boolean
    content?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type todosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"todo_id" | "user_id" | "title" | "content" | "created_at" | "updated_at", ExtArgs["result"]["todos"]>
  export type todosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    todo_tags?: boolean | todos$todo_tagsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | TodosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type todosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type todosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $todosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "todos"
    objects: {
      todo_tags: Prisma.$todo_tagsPayload<ExtArgs>[]
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      todo_id: string
      user_id: string
      title: string | null
      content: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["todos"]>
    composites: {}
  }

  type todosGetPayload<S extends boolean | null | undefined | todosDefaultArgs> = $Result.GetResult<Prisma.$todosPayload, S>

  type todosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<todosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TodosCountAggregateInputType | true
    }

  export interface todosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['todos'], meta: { name: 'todos' } }
    /**
     * Find zero or one Todos that matches the filter.
     * @param {todosFindUniqueArgs} args - Arguments to find a Todos
     * @example
     * // Get one Todos
     * const todos = await prisma.todos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends todosFindUniqueArgs>(args: SelectSubset<T, todosFindUniqueArgs<ExtArgs>>): Prisma__todosClient<$Result.GetResult<Prisma.$todosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Todos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {todosFindUniqueOrThrowArgs} args - Arguments to find a Todos
     * @example
     * // Get one Todos
     * const todos = await prisma.todos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends todosFindUniqueOrThrowArgs>(args: SelectSubset<T, todosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__todosClient<$Result.GetResult<Prisma.$todosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Todos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {todosFindFirstArgs} args - Arguments to find a Todos
     * @example
     * // Get one Todos
     * const todos = await prisma.todos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends todosFindFirstArgs>(args?: SelectSubset<T, todosFindFirstArgs<ExtArgs>>): Prisma__todosClient<$Result.GetResult<Prisma.$todosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Todos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {todosFindFirstOrThrowArgs} args - Arguments to find a Todos
     * @example
     * // Get one Todos
     * const todos = await prisma.todos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends todosFindFirstOrThrowArgs>(args?: SelectSubset<T, todosFindFirstOrThrowArgs<ExtArgs>>): Prisma__todosClient<$Result.GetResult<Prisma.$todosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Todos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {todosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Todos
     * const todos = await prisma.todos.findMany()
     * 
     * // Get first 10 Todos
     * const todos = await prisma.todos.findMany({ take: 10 })
     * 
     * // Only select the `todo_id`
     * const todosWithTodo_idOnly = await prisma.todos.findMany({ select: { todo_id: true } })
     * 
     */
    findMany<T extends todosFindManyArgs>(args?: SelectSubset<T, todosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$todosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Todos.
     * @param {todosCreateArgs} args - Arguments to create a Todos.
     * @example
     * // Create one Todos
     * const Todos = await prisma.todos.create({
     *   data: {
     *     // ... data to create a Todos
     *   }
     * })
     * 
     */
    create<T extends todosCreateArgs>(args: SelectSubset<T, todosCreateArgs<ExtArgs>>): Prisma__todosClient<$Result.GetResult<Prisma.$todosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Todos.
     * @param {todosCreateManyArgs} args - Arguments to create many Todos.
     * @example
     * // Create many Todos
     * const todos = await prisma.todos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends todosCreateManyArgs>(args?: SelectSubset<T, todosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Todos and returns the data saved in the database.
     * @param {todosCreateManyAndReturnArgs} args - Arguments to create many Todos.
     * @example
     * // Create many Todos
     * const todos = await prisma.todos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Todos and only return the `todo_id`
     * const todosWithTodo_idOnly = await prisma.todos.createManyAndReturn({
     *   select: { todo_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends todosCreateManyAndReturnArgs>(args?: SelectSubset<T, todosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$todosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Todos.
     * @param {todosDeleteArgs} args - Arguments to delete one Todos.
     * @example
     * // Delete one Todos
     * const Todos = await prisma.todos.delete({
     *   where: {
     *     // ... filter to delete one Todos
     *   }
     * })
     * 
     */
    delete<T extends todosDeleteArgs>(args: SelectSubset<T, todosDeleteArgs<ExtArgs>>): Prisma__todosClient<$Result.GetResult<Prisma.$todosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Todos.
     * @param {todosUpdateArgs} args - Arguments to update one Todos.
     * @example
     * // Update one Todos
     * const todos = await prisma.todos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends todosUpdateArgs>(args: SelectSubset<T, todosUpdateArgs<ExtArgs>>): Prisma__todosClient<$Result.GetResult<Prisma.$todosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Todos.
     * @param {todosDeleteManyArgs} args - Arguments to filter Todos to delete.
     * @example
     * // Delete a few Todos
     * const { count } = await prisma.todos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends todosDeleteManyArgs>(args?: SelectSubset<T, todosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Todos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {todosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Todos
     * const todos = await prisma.todos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends todosUpdateManyArgs>(args: SelectSubset<T, todosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Todos and returns the data updated in the database.
     * @param {todosUpdateManyAndReturnArgs} args - Arguments to update many Todos.
     * @example
     * // Update many Todos
     * const todos = await prisma.todos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Todos and only return the `todo_id`
     * const todosWithTodo_idOnly = await prisma.todos.updateManyAndReturn({
     *   select: { todo_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends todosUpdateManyAndReturnArgs>(args: SelectSubset<T, todosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$todosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Todos.
     * @param {todosUpsertArgs} args - Arguments to update or create a Todos.
     * @example
     * // Update or create a Todos
     * const todos = await prisma.todos.upsert({
     *   create: {
     *     // ... data to create a Todos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Todos we want to update
     *   }
     * })
     */
    upsert<T extends todosUpsertArgs>(args: SelectSubset<T, todosUpsertArgs<ExtArgs>>): Prisma__todosClient<$Result.GetResult<Prisma.$todosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Todos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {todosCountArgs} args - Arguments to filter Todos to count.
     * @example
     * // Count the number of Todos
     * const count = await prisma.todos.count({
     *   where: {
     *     // ... the filter for the Todos we want to count
     *   }
     * })
    **/
    count<T extends todosCountArgs>(
      args?: Subset<T, todosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TodosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Todos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TodosAggregateArgs>(args: Subset<T, TodosAggregateArgs>): Prisma.PrismaPromise<GetTodosAggregateType<T>>

    /**
     * Group by Todos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {todosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends todosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: todosGroupByArgs['orderBy'] }
        : { orderBy?: todosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, todosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTodosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the todos model
   */
  readonly fields: todosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for todos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__todosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    todo_tags<T extends todos$todo_tagsArgs<ExtArgs> = {}>(args?: Subset<T, todos$todo_tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$todo_tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the todos model
   */
  interface todosFieldRefs {
    readonly todo_id: FieldRef<"todos", 'String'>
    readonly user_id: FieldRef<"todos", 'String'>
    readonly title: FieldRef<"todos", 'String'>
    readonly content: FieldRef<"todos", 'String'>
    readonly created_at: FieldRef<"todos", 'DateTime'>
    readonly updated_at: FieldRef<"todos", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * todos findUnique
   */
  export type todosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todos
     */
    select?: todosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todos
     */
    omit?: todosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todosInclude<ExtArgs> | null
    /**
     * Filter, which todos to fetch.
     */
    where: todosWhereUniqueInput
  }

  /**
   * todos findUniqueOrThrow
   */
  export type todosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todos
     */
    select?: todosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todos
     */
    omit?: todosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todosInclude<ExtArgs> | null
    /**
     * Filter, which todos to fetch.
     */
    where: todosWhereUniqueInput
  }

  /**
   * todos findFirst
   */
  export type todosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todos
     */
    select?: todosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todos
     */
    omit?: todosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todosInclude<ExtArgs> | null
    /**
     * Filter, which todos to fetch.
     */
    where?: todosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of todos to fetch.
     */
    orderBy?: todosOrderByWithRelationInput | todosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for todos.
     */
    cursor?: todosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` todos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of todos.
     */
    distinct?: TodosScalarFieldEnum | TodosScalarFieldEnum[]
  }

  /**
   * todos findFirstOrThrow
   */
  export type todosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todos
     */
    select?: todosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todos
     */
    omit?: todosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todosInclude<ExtArgs> | null
    /**
     * Filter, which todos to fetch.
     */
    where?: todosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of todos to fetch.
     */
    orderBy?: todosOrderByWithRelationInput | todosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for todos.
     */
    cursor?: todosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` todos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of todos.
     */
    distinct?: TodosScalarFieldEnum | TodosScalarFieldEnum[]
  }

  /**
   * todos findMany
   */
  export type todosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todos
     */
    select?: todosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todos
     */
    omit?: todosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todosInclude<ExtArgs> | null
    /**
     * Filter, which todos to fetch.
     */
    where?: todosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of todos to fetch.
     */
    orderBy?: todosOrderByWithRelationInput | todosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing todos.
     */
    cursor?: todosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` todos.
     */
    skip?: number
    distinct?: TodosScalarFieldEnum | TodosScalarFieldEnum[]
  }

  /**
   * todos create
   */
  export type todosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todos
     */
    select?: todosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todos
     */
    omit?: todosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todosInclude<ExtArgs> | null
    /**
     * The data needed to create a todos.
     */
    data: XOR<todosCreateInput, todosUncheckedCreateInput>
  }

  /**
   * todos createMany
   */
  export type todosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many todos.
     */
    data: todosCreateManyInput | todosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * todos createManyAndReturn
   */
  export type todosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todos
     */
    select?: todosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the todos
     */
    omit?: todosOmit<ExtArgs> | null
    /**
     * The data used to create many todos.
     */
    data: todosCreateManyInput | todosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * todos update
   */
  export type todosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todos
     */
    select?: todosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todos
     */
    omit?: todosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todosInclude<ExtArgs> | null
    /**
     * The data needed to update a todos.
     */
    data: XOR<todosUpdateInput, todosUncheckedUpdateInput>
    /**
     * Choose, which todos to update.
     */
    where: todosWhereUniqueInput
  }

  /**
   * todos updateMany
   */
  export type todosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update todos.
     */
    data: XOR<todosUpdateManyMutationInput, todosUncheckedUpdateManyInput>
    /**
     * Filter which todos to update
     */
    where?: todosWhereInput
    /**
     * Limit how many todos to update.
     */
    limit?: number
  }

  /**
   * todos updateManyAndReturn
   */
  export type todosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todos
     */
    select?: todosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the todos
     */
    omit?: todosOmit<ExtArgs> | null
    /**
     * The data used to update todos.
     */
    data: XOR<todosUpdateManyMutationInput, todosUncheckedUpdateManyInput>
    /**
     * Filter which todos to update
     */
    where?: todosWhereInput
    /**
     * Limit how many todos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * todos upsert
   */
  export type todosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todos
     */
    select?: todosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todos
     */
    omit?: todosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todosInclude<ExtArgs> | null
    /**
     * The filter to search for the todos to update in case it exists.
     */
    where: todosWhereUniqueInput
    /**
     * In case the todos found by the `where` argument doesn't exist, create a new todos with this data.
     */
    create: XOR<todosCreateInput, todosUncheckedCreateInput>
    /**
     * In case the todos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<todosUpdateInput, todosUncheckedUpdateInput>
  }

  /**
   * todos delete
   */
  export type todosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todos
     */
    select?: todosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todos
     */
    omit?: todosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todosInclude<ExtArgs> | null
    /**
     * Filter which todos to delete.
     */
    where: todosWhereUniqueInput
  }

  /**
   * todos deleteMany
   */
  export type todosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which todos to delete
     */
    where?: todosWhereInput
    /**
     * Limit how many todos to delete.
     */
    limit?: number
  }

  /**
   * todos.todo_tags
   */
  export type todos$todo_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todo_tags
     */
    select?: todo_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todo_tags
     */
    omit?: todo_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todo_tagsInclude<ExtArgs> | null
    where?: todo_tagsWhereInput
    orderBy?: todo_tagsOrderByWithRelationInput | todo_tagsOrderByWithRelationInput[]
    cursor?: todo_tagsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Todo_tagsScalarFieldEnum | Todo_tagsScalarFieldEnum[]
  }

  /**
   * todos without action
   */
  export type todosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todos
     */
    select?: todosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todos
     */
    omit?: todosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todosInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    user_id: string | null
    email: string | null
    password_hash: string | null
    created_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    user_id: string | null
    email: string | null
    password_hash: string | null
    created_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    user_id: number
    email: number
    password_hash: number
    created_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    user_id?: true
    email?: true
    password_hash?: true
    created_at?: true
  }

  export type UsersMaxAggregateInputType = {
    user_id?: true
    email?: true
    password_hash?: true
    created_at?: true
  }

  export type UsersCountAggregateInputType = {
    user_id?: true
    email?: true
    password_hash?: true
    created_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    user_id: string
    email: string
    password_hash: string
    created_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email?: boolean
    password_hash?: boolean
    created_at?: boolean
    tags?: boolean | users$tagsArgs<ExtArgs>
    todos?: boolean | users$todosArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email?: boolean
    password_hash?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email?: boolean
    password_hash?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    user_id?: boolean
    email?: boolean
    password_hash?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "email" | "password_hash" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | users$tagsArgs<ExtArgs>
    todos?: boolean | users$todosArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      tags: Prisma.$tagsPayload<ExtArgs>[]
      todos: Prisma.$todosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      email: string
      password_hash: string
      created_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const usersWithUser_idOnly = await prisma.users.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `user_id`
     * const usersWithUser_idOnly = await prisma.users.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `user_id`
     * const usersWithUser_idOnly = await prisma.users.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tags<T extends users$tagsArgs<ExtArgs> = {}>(args?: Subset<T, users$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    todos<T extends users$todosArgs<ExtArgs> = {}>(args?: Subset<T, users$todosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$todosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly user_id: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password_hash: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.tags
   */
  export type users$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    where?: tagsWhereInput
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    cursor?: tagsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
  }

  /**
   * users.todos
   */
  export type users$todosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the todos
     */
    select?: todosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the todos
     */
    omit?: todosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: todosInclude<ExtArgs> | null
    where?: todosWhereInput
    orderBy?: todosOrderByWithRelationInput | todosOrderByWithRelationInput[]
    cursor?: todosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TodosScalarFieldEnum | TodosScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TagsScalarFieldEnum: {
    tag_id: 'tag_id',
    user_id: 'user_id',
    tag_name: 'tag_name'
  };

  export type TagsScalarFieldEnum = (typeof TagsScalarFieldEnum)[keyof typeof TagsScalarFieldEnum]


  export const Todo_tagsScalarFieldEnum: {
    todo_id: 'todo_id',
    tag_id: 'tag_id'
  };

  export type Todo_tagsScalarFieldEnum = (typeof Todo_tagsScalarFieldEnum)[keyof typeof Todo_tagsScalarFieldEnum]


  export const TodosScalarFieldEnum: {
    todo_id: 'todo_id',
    user_id: 'user_id',
    title: 'title',
    content: 'content',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TodosScalarFieldEnum = (typeof TodosScalarFieldEnum)[keyof typeof TodosScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    user_id: 'user_id',
    email: 'email',
    password_hash: 'password_hash',
    created_at: 'created_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type tagsWhereInput = {
    AND?: tagsWhereInput | tagsWhereInput[]
    OR?: tagsWhereInput[]
    NOT?: tagsWhereInput | tagsWhereInput[]
    tag_id?: UuidFilter<"tags"> | string
    user_id?: UuidFilter<"tags"> | string
    tag_name?: StringFilter<"tags"> | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    todo_tags?: Todo_tagsListRelationFilter
  }

  export type tagsOrderByWithRelationInput = {
    tag_id?: SortOrder
    user_id?: SortOrder
    tag_name?: SortOrder
    users?: usersOrderByWithRelationInput
    todo_tags?: todo_tagsOrderByRelationAggregateInput
  }

  export type tagsWhereUniqueInput = Prisma.AtLeast<{
    tag_id?: string
    user_id_tag_name?: tagsUser_idTag_nameCompoundUniqueInput
    AND?: tagsWhereInput | tagsWhereInput[]
    OR?: tagsWhereInput[]
    NOT?: tagsWhereInput | tagsWhereInput[]
    user_id?: UuidFilter<"tags"> | string
    tag_name?: StringFilter<"tags"> | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    todo_tags?: Todo_tagsListRelationFilter
  }, "tag_id" | "user_id_tag_name">

  export type tagsOrderByWithAggregationInput = {
    tag_id?: SortOrder
    user_id?: SortOrder
    tag_name?: SortOrder
    _count?: tagsCountOrderByAggregateInput
    _max?: tagsMaxOrderByAggregateInput
    _min?: tagsMinOrderByAggregateInput
  }

  export type tagsScalarWhereWithAggregatesInput = {
    AND?: tagsScalarWhereWithAggregatesInput | tagsScalarWhereWithAggregatesInput[]
    OR?: tagsScalarWhereWithAggregatesInput[]
    NOT?: tagsScalarWhereWithAggregatesInput | tagsScalarWhereWithAggregatesInput[]
    tag_id?: UuidWithAggregatesFilter<"tags"> | string
    user_id?: UuidWithAggregatesFilter<"tags"> | string
    tag_name?: StringWithAggregatesFilter<"tags"> | string
  }

  export type todo_tagsWhereInput = {
    AND?: todo_tagsWhereInput | todo_tagsWhereInput[]
    OR?: todo_tagsWhereInput[]
    NOT?: todo_tagsWhereInput | todo_tagsWhereInput[]
    todo_id?: UuidFilter<"todo_tags"> | string
    tag_id?: UuidFilter<"todo_tags"> | string
    tags?: XOR<TagsScalarRelationFilter, tagsWhereInput>
    todos?: XOR<TodosScalarRelationFilter, todosWhereInput>
  }

  export type todo_tagsOrderByWithRelationInput = {
    todo_id?: SortOrder
    tag_id?: SortOrder
    tags?: tagsOrderByWithRelationInput
    todos?: todosOrderByWithRelationInput
  }

  export type todo_tagsWhereUniqueInput = Prisma.AtLeast<{
    todo_id_tag_id?: todo_tagsTodo_idTag_idCompoundUniqueInput
    AND?: todo_tagsWhereInput | todo_tagsWhereInput[]
    OR?: todo_tagsWhereInput[]
    NOT?: todo_tagsWhereInput | todo_tagsWhereInput[]
    todo_id?: UuidFilter<"todo_tags"> | string
    tag_id?: UuidFilter<"todo_tags"> | string
    tags?: XOR<TagsScalarRelationFilter, tagsWhereInput>
    todos?: XOR<TodosScalarRelationFilter, todosWhereInput>
  }, "todo_id_tag_id">

  export type todo_tagsOrderByWithAggregationInput = {
    todo_id?: SortOrder
    tag_id?: SortOrder
    _count?: todo_tagsCountOrderByAggregateInput
    _max?: todo_tagsMaxOrderByAggregateInput
    _min?: todo_tagsMinOrderByAggregateInput
  }

  export type todo_tagsScalarWhereWithAggregatesInput = {
    AND?: todo_tagsScalarWhereWithAggregatesInput | todo_tagsScalarWhereWithAggregatesInput[]
    OR?: todo_tagsScalarWhereWithAggregatesInput[]
    NOT?: todo_tagsScalarWhereWithAggregatesInput | todo_tagsScalarWhereWithAggregatesInput[]
    todo_id?: UuidWithAggregatesFilter<"todo_tags"> | string
    tag_id?: UuidWithAggregatesFilter<"todo_tags"> | string
  }

  export type todosWhereInput = {
    AND?: todosWhereInput | todosWhereInput[]
    OR?: todosWhereInput[]
    NOT?: todosWhereInput | todosWhereInput[]
    todo_id?: UuidFilter<"todos"> | string
    user_id?: UuidFilter<"todos"> | string
    title?: StringNullableFilter<"todos"> | string | null
    content?: StringNullableFilter<"todos"> | string | null
    created_at?: DateTimeNullableFilter<"todos"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"todos"> | Date | string | null
    todo_tags?: Todo_tagsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type todosOrderByWithRelationInput = {
    todo_id?: SortOrder
    user_id?: SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    todo_tags?: todo_tagsOrderByRelationAggregateInput
    users?: usersOrderByWithRelationInput
  }

  export type todosWhereUniqueInput = Prisma.AtLeast<{
    todo_id?: string
    AND?: todosWhereInput | todosWhereInput[]
    OR?: todosWhereInput[]
    NOT?: todosWhereInput | todosWhereInput[]
    user_id?: UuidFilter<"todos"> | string
    title?: StringNullableFilter<"todos"> | string | null
    content?: StringNullableFilter<"todos"> | string | null
    created_at?: DateTimeNullableFilter<"todos"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"todos"> | Date | string | null
    todo_tags?: Todo_tagsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "todo_id">

  export type todosOrderByWithAggregationInput = {
    todo_id?: SortOrder
    user_id?: SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: todosCountOrderByAggregateInput
    _max?: todosMaxOrderByAggregateInput
    _min?: todosMinOrderByAggregateInput
  }

  export type todosScalarWhereWithAggregatesInput = {
    AND?: todosScalarWhereWithAggregatesInput | todosScalarWhereWithAggregatesInput[]
    OR?: todosScalarWhereWithAggregatesInput[]
    NOT?: todosScalarWhereWithAggregatesInput | todosScalarWhereWithAggregatesInput[]
    todo_id?: UuidWithAggregatesFilter<"todos"> | string
    user_id?: UuidWithAggregatesFilter<"todos"> | string
    title?: StringNullableWithAggregatesFilter<"todos"> | string | null
    content?: StringNullableWithAggregatesFilter<"todos"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"todos"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"todos"> | Date | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    user_id?: UuidFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password_hash?: StringFilter<"users"> | string
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    tags?: TagsListRelationFilter
    todos?: TodosListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrderInput | SortOrder
    tags?: tagsOrderByRelationAggregateInput
    todos?: todosOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password_hash?: StringFilter<"users"> | string
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    tags?: TagsListRelationFilter
    todos?: TodosListRelationFilter
  }, "user_id" | "email">

  export type usersOrderByWithAggregationInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    user_id?: UuidWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password_hash?: StringWithAggregatesFilter<"users"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type tagsCreateInput = {
    tag_id?: string
    tag_name: string
    users: usersCreateNestedOneWithoutTagsInput
    todo_tags?: todo_tagsCreateNestedManyWithoutTagsInput
  }

  export type tagsUncheckedCreateInput = {
    tag_id?: string
    user_id: string
    tag_name: string
    todo_tags?: todo_tagsUncheckedCreateNestedManyWithoutTagsInput
  }

  export type tagsUpdateInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
    tag_name?: StringFieldUpdateOperationsInput | string
    users?: usersUpdateOneRequiredWithoutTagsNestedInput
    todo_tags?: todo_tagsUpdateManyWithoutTagsNestedInput
  }

  export type tagsUncheckedUpdateInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    tag_name?: StringFieldUpdateOperationsInput | string
    todo_tags?: todo_tagsUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type tagsCreateManyInput = {
    tag_id?: string
    user_id: string
    tag_name: string
  }

  export type tagsUpdateManyMutationInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
    tag_name?: StringFieldUpdateOperationsInput | string
  }

  export type tagsUncheckedUpdateManyInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    tag_name?: StringFieldUpdateOperationsInput | string
  }

  export type todo_tagsCreateInput = {
    tags: tagsCreateNestedOneWithoutTodo_tagsInput
    todos: todosCreateNestedOneWithoutTodo_tagsInput
  }

  export type todo_tagsUncheckedCreateInput = {
    todo_id: string
    tag_id: string
  }

  export type todo_tagsUpdateInput = {
    tags?: tagsUpdateOneRequiredWithoutTodo_tagsNestedInput
    todos?: todosUpdateOneRequiredWithoutTodo_tagsNestedInput
  }

  export type todo_tagsUncheckedUpdateInput = {
    todo_id?: StringFieldUpdateOperationsInput | string
    tag_id?: StringFieldUpdateOperationsInput | string
  }

  export type todo_tagsCreateManyInput = {
    todo_id: string
    tag_id: string
  }

  export type todo_tagsUpdateManyMutationInput = {

  }

  export type todo_tagsUncheckedUpdateManyInput = {
    todo_id?: StringFieldUpdateOperationsInput | string
    tag_id?: StringFieldUpdateOperationsInput | string
  }

  export type todosCreateInput = {
    todo_id?: string
    title?: string | null
    content?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    todo_tags?: todo_tagsCreateNestedManyWithoutTodosInput
    users: usersCreateNestedOneWithoutTodosInput
  }

  export type todosUncheckedCreateInput = {
    todo_id?: string
    user_id: string
    title?: string | null
    content?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    todo_tags?: todo_tagsUncheckedCreateNestedManyWithoutTodosInput
  }

  export type todosUpdateInput = {
    todo_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    todo_tags?: todo_tagsUpdateManyWithoutTodosNestedInput
    users?: usersUpdateOneRequiredWithoutTodosNestedInput
  }

  export type todosUncheckedUpdateInput = {
    todo_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    todo_tags?: todo_tagsUncheckedUpdateManyWithoutTodosNestedInput
  }

  export type todosCreateManyInput = {
    todo_id?: string
    user_id: string
    title?: string | null
    content?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type todosUpdateManyMutationInput = {
    todo_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type todosUncheckedUpdateManyInput = {
    todo_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersCreateInput = {
    user_id?: string
    email: string
    password_hash: string
    created_at?: Date | string | null
    tags?: tagsCreateNestedManyWithoutUsersInput
    todos?: todosCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    user_id?: string
    email: string
    password_hash: string
    created_at?: Date | string | null
    tags?: tagsUncheckedCreateNestedManyWithoutUsersInput
    todos?: todosUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tags?: tagsUpdateManyWithoutUsersNestedInput
    todos?: todosUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tags?: tagsUncheckedUpdateManyWithoutUsersNestedInput
    todos?: todosUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    user_id?: string
    email: string
    password_hash: string
    created_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type Todo_tagsListRelationFilter = {
    every?: todo_tagsWhereInput
    some?: todo_tagsWhereInput
    none?: todo_tagsWhereInput
  }

  export type todo_tagsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tagsUser_idTag_nameCompoundUniqueInput = {
    user_id: string
    tag_name: string
  }

  export type tagsCountOrderByAggregateInput = {
    tag_id?: SortOrder
    user_id?: SortOrder
    tag_name?: SortOrder
  }

  export type tagsMaxOrderByAggregateInput = {
    tag_id?: SortOrder
    user_id?: SortOrder
    tag_name?: SortOrder
  }

  export type tagsMinOrderByAggregateInput = {
    tag_id?: SortOrder
    user_id?: SortOrder
    tag_name?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type TagsScalarRelationFilter = {
    is?: tagsWhereInput
    isNot?: tagsWhereInput
  }

  export type TodosScalarRelationFilter = {
    is?: todosWhereInput
    isNot?: todosWhereInput
  }

  export type todo_tagsTodo_idTag_idCompoundUniqueInput = {
    todo_id: string
    tag_id: string
  }

  export type todo_tagsCountOrderByAggregateInput = {
    todo_id?: SortOrder
    tag_id?: SortOrder
  }

  export type todo_tagsMaxOrderByAggregateInput = {
    todo_id?: SortOrder
    tag_id?: SortOrder
  }

  export type todo_tagsMinOrderByAggregateInput = {
    todo_id?: SortOrder
    tag_id?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type todosCountOrderByAggregateInput = {
    todo_id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type todosMaxOrderByAggregateInput = {
    todo_id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type todosMinOrderByAggregateInput = {
    todo_id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TagsListRelationFilter = {
    every?: tagsWhereInput
    some?: tagsWhereInput
    none?: tagsWhereInput
  }

  export type TodosListRelationFilter = {
    every?: todosWhereInput
    some?: todosWhereInput
    none?: todosWhereInput
  }

  export type tagsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type todosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
  }

  export type usersCreateNestedOneWithoutTagsInput = {
    create?: XOR<usersCreateWithoutTagsInput, usersUncheckedCreateWithoutTagsInput>
    connectOrCreate?: usersCreateOrConnectWithoutTagsInput
    connect?: usersWhereUniqueInput
  }

  export type todo_tagsCreateNestedManyWithoutTagsInput = {
    create?: XOR<todo_tagsCreateWithoutTagsInput, todo_tagsUncheckedCreateWithoutTagsInput> | todo_tagsCreateWithoutTagsInput[] | todo_tagsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: todo_tagsCreateOrConnectWithoutTagsInput | todo_tagsCreateOrConnectWithoutTagsInput[]
    createMany?: todo_tagsCreateManyTagsInputEnvelope
    connect?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
  }

  export type todo_tagsUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<todo_tagsCreateWithoutTagsInput, todo_tagsUncheckedCreateWithoutTagsInput> | todo_tagsCreateWithoutTagsInput[] | todo_tagsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: todo_tagsCreateOrConnectWithoutTagsInput | todo_tagsCreateOrConnectWithoutTagsInput[]
    createMany?: todo_tagsCreateManyTagsInputEnvelope
    connect?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type usersUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<usersCreateWithoutTagsInput, usersUncheckedCreateWithoutTagsInput>
    connectOrCreate?: usersCreateOrConnectWithoutTagsInput
    upsert?: usersUpsertWithoutTagsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutTagsInput, usersUpdateWithoutTagsInput>, usersUncheckedUpdateWithoutTagsInput>
  }

  export type todo_tagsUpdateManyWithoutTagsNestedInput = {
    create?: XOR<todo_tagsCreateWithoutTagsInput, todo_tagsUncheckedCreateWithoutTagsInput> | todo_tagsCreateWithoutTagsInput[] | todo_tagsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: todo_tagsCreateOrConnectWithoutTagsInput | todo_tagsCreateOrConnectWithoutTagsInput[]
    upsert?: todo_tagsUpsertWithWhereUniqueWithoutTagsInput | todo_tagsUpsertWithWhereUniqueWithoutTagsInput[]
    createMany?: todo_tagsCreateManyTagsInputEnvelope
    set?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    disconnect?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    delete?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    connect?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    update?: todo_tagsUpdateWithWhereUniqueWithoutTagsInput | todo_tagsUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: todo_tagsUpdateManyWithWhereWithoutTagsInput | todo_tagsUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: todo_tagsScalarWhereInput | todo_tagsScalarWhereInput[]
  }

  export type todo_tagsUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<todo_tagsCreateWithoutTagsInput, todo_tagsUncheckedCreateWithoutTagsInput> | todo_tagsCreateWithoutTagsInput[] | todo_tagsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: todo_tagsCreateOrConnectWithoutTagsInput | todo_tagsCreateOrConnectWithoutTagsInput[]
    upsert?: todo_tagsUpsertWithWhereUniqueWithoutTagsInput | todo_tagsUpsertWithWhereUniqueWithoutTagsInput[]
    createMany?: todo_tagsCreateManyTagsInputEnvelope
    set?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    disconnect?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    delete?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    connect?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    update?: todo_tagsUpdateWithWhereUniqueWithoutTagsInput | todo_tagsUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: todo_tagsUpdateManyWithWhereWithoutTagsInput | todo_tagsUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: todo_tagsScalarWhereInput | todo_tagsScalarWhereInput[]
  }

  export type tagsCreateNestedOneWithoutTodo_tagsInput = {
    create?: XOR<tagsCreateWithoutTodo_tagsInput, tagsUncheckedCreateWithoutTodo_tagsInput>
    connectOrCreate?: tagsCreateOrConnectWithoutTodo_tagsInput
    connect?: tagsWhereUniqueInput
  }

  export type todosCreateNestedOneWithoutTodo_tagsInput = {
    create?: XOR<todosCreateWithoutTodo_tagsInput, todosUncheckedCreateWithoutTodo_tagsInput>
    connectOrCreate?: todosCreateOrConnectWithoutTodo_tagsInput
    connect?: todosWhereUniqueInput
  }

  export type tagsUpdateOneRequiredWithoutTodo_tagsNestedInput = {
    create?: XOR<tagsCreateWithoutTodo_tagsInput, tagsUncheckedCreateWithoutTodo_tagsInput>
    connectOrCreate?: tagsCreateOrConnectWithoutTodo_tagsInput
    upsert?: tagsUpsertWithoutTodo_tagsInput
    connect?: tagsWhereUniqueInput
    update?: XOR<XOR<tagsUpdateToOneWithWhereWithoutTodo_tagsInput, tagsUpdateWithoutTodo_tagsInput>, tagsUncheckedUpdateWithoutTodo_tagsInput>
  }

  export type todosUpdateOneRequiredWithoutTodo_tagsNestedInput = {
    create?: XOR<todosCreateWithoutTodo_tagsInput, todosUncheckedCreateWithoutTodo_tagsInput>
    connectOrCreate?: todosCreateOrConnectWithoutTodo_tagsInput
    upsert?: todosUpsertWithoutTodo_tagsInput
    connect?: todosWhereUniqueInput
    update?: XOR<XOR<todosUpdateToOneWithWhereWithoutTodo_tagsInput, todosUpdateWithoutTodo_tagsInput>, todosUncheckedUpdateWithoutTodo_tagsInput>
  }

  export type todo_tagsCreateNestedManyWithoutTodosInput = {
    create?: XOR<todo_tagsCreateWithoutTodosInput, todo_tagsUncheckedCreateWithoutTodosInput> | todo_tagsCreateWithoutTodosInput[] | todo_tagsUncheckedCreateWithoutTodosInput[]
    connectOrCreate?: todo_tagsCreateOrConnectWithoutTodosInput | todo_tagsCreateOrConnectWithoutTodosInput[]
    createMany?: todo_tagsCreateManyTodosInputEnvelope
    connect?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutTodosInput = {
    create?: XOR<usersCreateWithoutTodosInput, usersUncheckedCreateWithoutTodosInput>
    connectOrCreate?: usersCreateOrConnectWithoutTodosInput
    connect?: usersWhereUniqueInput
  }

  export type todo_tagsUncheckedCreateNestedManyWithoutTodosInput = {
    create?: XOR<todo_tagsCreateWithoutTodosInput, todo_tagsUncheckedCreateWithoutTodosInput> | todo_tagsCreateWithoutTodosInput[] | todo_tagsUncheckedCreateWithoutTodosInput[]
    connectOrCreate?: todo_tagsCreateOrConnectWithoutTodosInput | todo_tagsCreateOrConnectWithoutTodosInput[]
    createMany?: todo_tagsCreateManyTodosInputEnvelope
    connect?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type todo_tagsUpdateManyWithoutTodosNestedInput = {
    create?: XOR<todo_tagsCreateWithoutTodosInput, todo_tagsUncheckedCreateWithoutTodosInput> | todo_tagsCreateWithoutTodosInput[] | todo_tagsUncheckedCreateWithoutTodosInput[]
    connectOrCreate?: todo_tagsCreateOrConnectWithoutTodosInput | todo_tagsCreateOrConnectWithoutTodosInput[]
    upsert?: todo_tagsUpsertWithWhereUniqueWithoutTodosInput | todo_tagsUpsertWithWhereUniqueWithoutTodosInput[]
    createMany?: todo_tagsCreateManyTodosInputEnvelope
    set?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    disconnect?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    delete?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    connect?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    update?: todo_tagsUpdateWithWhereUniqueWithoutTodosInput | todo_tagsUpdateWithWhereUniqueWithoutTodosInput[]
    updateMany?: todo_tagsUpdateManyWithWhereWithoutTodosInput | todo_tagsUpdateManyWithWhereWithoutTodosInput[]
    deleteMany?: todo_tagsScalarWhereInput | todo_tagsScalarWhereInput[]
  }

  export type usersUpdateOneRequiredWithoutTodosNestedInput = {
    create?: XOR<usersCreateWithoutTodosInput, usersUncheckedCreateWithoutTodosInput>
    connectOrCreate?: usersCreateOrConnectWithoutTodosInput
    upsert?: usersUpsertWithoutTodosInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutTodosInput, usersUpdateWithoutTodosInput>, usersUncheckedUpdateWithoutTodosInput>
  }

  export type todo_tagsUncheckedUpdateManyWithoutTodosNestedInput = {
    create?: XOR<todo_tagsCreateWithoutTodosInput, todo_tagsUncheckedCreateWithoutTodosInput> | todo_tagsCreateWithoutTodosInput[] | todo_tagsUncheckedCreateWithoutTodosInput[]
    connectOrCreate?: todo_tagsCreateOrConnectWithoutTodosInput | todo_tagsCreateOrConnectWithoutTodosInput[]
    upsert?: todo_tagsUpsertWithWhereUniqueWithoutTodosInput | todo_tagsUpsertWithWhereUniqueWithoutTodosInput[]
    createMany?: todo_tagsCreateManyTodosInputEnvelope
    set?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    disconnect?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    delete?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    connect?: todo_tagsWhereUniqueInput | todo_tagsWhereUniqueInput[]
    update?: todo_tagsUpdateWithWhereUniqueWithoutTodosInput | todo_tagsUpdateWithWhereUniqueWithoutTodosInput[]
    updateMany?: todo_tagsUpdateManyWithWhereWithoutTodosInput | todo_tagsUpdateManyWithWhereWithoutTodosInput[]
    deleteMany?: todo_tagsScalarWhereInput | todo_tagsScalarWhereInput[]
  }

  export type tagsCreateNestedManyWithoutUsersInput = {
    create?: XOR<tagsCreateWithoutUsersInput, tagsUncheckedCreateWithoutUsersInput> | tagsCreateWithoutUsersInput[] | tagsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: tagsCreateOrConnectWithoutUsersInput | tagsCreateOrConnectWithoutUsersInput[]
    createMany?: tagsCreateManyUsersInputEnvelope
    connect?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
  }

  export type todosCreateNestedManyWithoutUsersInput = {
    create?: XOR<todosCreateWithoutUsersInput, todosUncheckedCreateWithoutUsersInput> | todosCreateWithoutUsersInput[] | todosUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: todosCreateOrConnectWithoutUsersInput | todosCreateOrConnectWithoutUsersInput[]
    createMany?: todosCreateManyUsersInputEnvelope
    connect?: todosWhereUniqueInput | todosWhereUniqueInput[]
  }

  export type tagsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<tagsCreateWithoutUsersInput, tagsUncheckedCreateWithoutUsersInput> | tagsCreateWithoutUsersInput[] | tagsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: tagsCreateOrConnectWithoutUsersInput | tagsCreateOrConnectWithoutUsersInput[]
    createMany?: tagsCreateManyUsersInputEnvelope
    connect?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
  }

  export type todosUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<todosCreateWithoutUsersInput, todosUncheckedCreateWithoutUsersInput> | todosCreateWithoutUsersInput[] | todosUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: todosCreateOrConnectWithoutUsersInput | todosCreateOrConnectWithoutUsersInput[]
    createMany?: todosCreateManyUsersInputEnvelope
    connect?: todosWhereUniqueInput | todosWhereUniqueInput[]
  }

  export type tagsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<tagsCreateWithoutUsersInput, tagsUncheckedCreateWithoutUsersInput> | tagsCreateWithoutUsersInput[] | tagsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: tagsCreateOrConnectWithoutUsersInput | tagsCreateOrConnectWithoutUsersInput[]
    upsert?: tagsUpsertWithWhereUniqueWithoutUsersInput | tagsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: tagsCreateManyUsersInputEnvelope
    set?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    disconnect?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    delete?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    connect?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    update?: tagsUpdateWithWhereUniqueWithoutUsersInput | tagsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: tagsUpdateManyWithWhereWithoutUsersInput | tagsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: tagsScalarWhereInput | tagsScalarWhereInput[]
  }

  export type todosUpdateManyWithoutUsersNestedInput = {
    create?: XOR<todosCreateWithoutUsersInput, todosUncheckedCreateWithoutUsersInput> | todosCreateWithoutUsersInput[] | todosUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: todosCreateOrConnectWithoutUsersInput | todosCreateOrConnectWithoutUsersInput[]
    upsert?: todosUpsertWithWhereUniqueWithoutUsersInput | todosUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: todosCreateManyUsersInputEnvelope
    set?: todosWhereUniqueInput | todosWhereUniqueInput[]
    disconnect?: todosWhereUniqueInput | todosWhereUniqueInput[]
    delete?: todosWhereUniqueInput | todosWhereUniqueInput[]
    connect?: todosWhereUniqueInput | todosWhereUniqueInput[]
    update?: todosUpdateWithWhereUniqueWithoutUsersInput | todosUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: todosUpdateManyWithWhereWithoutUsersInput | todosUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: todosScalarWhereInput | todosScalarWhereInput[]
  }

  export type tagsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<tagsCreateWithoutUsersInput, tagsUncheckedCreateWithoutUsersInput> | tagsCreateWithoutUsersInput[] | tagsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: tagsCreateOrConnectWithoutUsersInput | tagsCreateOrConnectWithoutUsersInput[]
    upsert?: tagsUpsertWithWhereUniqueWithoutUsersInput | tagsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: tagsCreateManyUsersInputEnvelope
    set?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    disconnect?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    delete?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    connect?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    update?: tagsUpdateWithWhereUniqueWithoutUsersInput | tagsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: tagsUpdateManyWithWhereWithoutUsersInput | tagsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: tagsScalarWhereInput | tagsScalarWhereInput[]
  }

  export type todosUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<todosCreateWithoutUsersInput, todosUncheckedCreateWithoutUsersInput> | todosCreateWithoutUsersInput[] | todosUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: todosCreateOrConnectWithoutUsersInput | todosCreateOrConnectWithoutUsersInput[]
    upsert?: todosUpsertWithWhereUniqueWithoutUsersInput | todosUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: todosCreateManyUsersInputEnvelope
    set?: todosWhereUniqueInput | todosWhereUniqueInput[]
    disconnect?: todosWhereUniqueInput | todosWhereUniqueInput[]
    delete?: todosWhereUniqueInput | todosWhereUniqueInput[]
    connect?: todosWhereUniqueInput | todosWhereUniqueInput[]
    update?: todosUpdateWithWhereUniqueWithoutUsersInput | todosUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: todosUpdateManyWithWhereWithoutUsersInput | todosUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: todosScalarWhereInput | todosScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type usersCreateWithoutTagsInput = {
    user_id?: string
    email: string
    password_hash: string
    created_at?: Date | string | null
    todos?: todosCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutTagsInput = {
    user_id?: string
    email: string
    password_hash: string
    created_at?: Date | string | null
    todos?: todosUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutTagsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutTagsInput, usersUncheckedCreateWithoutTagsInput>
  }

  export type todo_tagsCreateWithoutTagsInput = {
    todos: todosCreateNestedOneWithoutTodo_tagsInput
  }

  export type todo_tagsUncheckedCreateWithoutTagsInput = {
    todo_id: string
  }

  export type todo_tagsCreateOrConnectWithoutTagsInput = {
    where: todo_tagsWhereUniqueInput
    create: XOR<todo_tagsCreateWithoutTagsInput, todo_tagsUncheckedCreateWithoutTagsInput>
  }

  export type todo_tagsCreateManyTagsInputEnvelope = {
    data: todo_tagsCreateManyTagsInput | todo_tagsCreateManyTagsInput[]
    skipDuplicates?: boolean
  }

  export type usersUpsertWithoutTagsInput = {
    update: XOR<usersUpdateWithoutTagsInput, usersUncheckedUpdateWithoutTagsInput>
    create: XOR<usersCreateWithoutTagsInput, usersUncheckedCreateWithoutTagsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutTagsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutTagsInput, usersUncheckedUpdateWithoutTagsInput>
  }

  export type usersUpdateWithoutTagsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    todos?: todosUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutTagsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    todos?: todosUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type todo_tagsUpsertWithWhereUniqueWithoutTagsInput = {
    where: todo_tagsWhereUniqueInput
    update: XOR<todo_tagsUpdateWithoutTagsInput, todo_tagsUncheckedUpdateWithoutTagsInput>
    create: XOR<todo_tagsCreateWithoutTagsInput, todo_tagsUncheckedCreateWithoutTagsInput>
  }

  export type todo_tagsUpdateWithWhereUniqueWithoutTagsInput = {
    where: todo_tagsWhereUniqueInput
    data: XOR<todo_tagsUpdateWithoutTagsInput, todo_tagsUncheckedUpdateWithoutTagsInput>
  }

  export type todo_tagsUpdateManyWithWhereWithoutTagsInput = {
    where: todo_tagsScalarWhereInput
    data: XOR<todo_tagsUpdateManyMutationInput, todo_tagsUncheckedUpdateManyWithoutTagsInput>
  }

  export type todo_tagsScalarWhereInput = {
    AND?: todo_tagsScalarWhereInput | todo_tagsScalarWhereInput[]
    OR?: todo_tagsScalarWhereInput[]
    NOT?: todo_tagsScalarWhereInput | todo_tagsScalarWhereInput[]
    todo_id?: UuidFilter<"todo_tags"> | string
    tag_id?: UuidFilter<"todo_tags"> | string
  }

  export type tagsCreateWithoutTodo_tagsInput = {
    tag_id?: string
    tag_name: string
    users: usersCreateNestedOneWithoutTagsInput
  }

  export type tagsUncheckedCreateWithoutTodo_tagsInput = {
    tag_id?: string
    user_id: string
    tag_name: string
  }

  export type tagsCreateOrConnectWithoutTodo_tagsInput = {
    where: tagsWhereUniqueInput
    create: XOR<tagsCreateWithoutTodo_tagsInput, tagsUncheckedCreateWithoutTodo_tagsInput>
  }

  export type todosCreateWithoutTodo_tagsInput = {
    todo_id?: string
    title?: string | null
    content?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    users: usersCreateNestedOneWithoutTodosInput
  }

  export type todosUncheckedCreateWithoutTodo_tagsInput = {
    todo_id?: string
    user_id: string
    title?: string | null
    content?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type todosCreateOrConnectWithoutTodo_tagsInput = {
    where: todosWhereUniqueInput
    create: XOR<todosCreateWithoutTodo_tagsInput, todosUncheckedCreateWithoutTodo_tagsInput>
  }

  export type tagsUpsertWithoutTodo_tagsInput = {
    update: XOR<tagsUpdateWithoutTodo_tagsInput, tagsUncheckedUpdateWithoutTodo_tagsInput>
    create: XOR<tagsCreateWithoutTodo_tagsInput, tagsUncheckedCreateWithoutTodo_tagsInput>
    where?: tagsWhereInput
  }

  export type tagsUpdateToOneWithWhereWithoutTodo_tagsInput = {
    where?: tagsWhereInput
    data: XOR<tagsUpdateWithoutTodo_tagsInput, tagsUncheckedUpdateWithoutTodo_tagsInput>
  }

  export type tagsUpdateWithoutTodo_tagsInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
    tag_name?: StringFieldUpdateOperationsInput | string
    users?: usersUpdateOneRequiredWithoutTagsNestedInput
  }

  export type tagsUncheckedUpdateWithoutTodo_tagsInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    tag_name?: StringFieldUpdateOperationsInput | string
  }

  export type todosUpsertWithoutTodo_tagsInput = {
    update: XOR<todosUpdateWithoutTodo_tagsInput, todosUncheckedUpdateWithoutTodo_tagsInput>
    create: XOR<todosCreateWithoutTodo_tagsInput, todosUncheckedCreateWithoutTodo_tagsInput>
    where?: todosWhereInput
  }

  export type todosUpdateToOneWithWhereWithoutTodo_tagsInput = {
    where?: todosWhereInput
    data: XOR<todosUpdateWithoutTodo_tagsInput, todosUncheckedUpdateWithoutTodo_tagsInput>
  }

  export type todosUpdateWithoutTodo_tagsInput = {
    todo_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutTodosNestedInput
  }

  export type todosUncheckedUpdateWithoutTodo_tagsInput = {
    todo_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type todo_tagsCreateWithoutTodosInput = {
    tags: tagsCreateNestedOneWithoutTodo_tagsInput
  }

  export type todo_tagsUncheckedCreateWithoutTodosInput = {
    tag_id: string
  }

  export type todo_tagsCreateOrConnectWithoutTodosInput = {
    where: todo_tagsWhereUniqueInput
    create: XOR<todo_tagsCreateWithoutTodosInput, todo_tagsUncheckedCreateWithoutTodosInput>
  }

  export type todo_tagsCreateManyTodosInputEnvelope = {
    data: todo_tagsCreateManyTodosInput | todo_tagsCreateManyTodosInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutTodosInput = {
    user_id?: string
    email: string
    password_hash: string
    created_at?: Date | string | null
    tags?: tagsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutTodosInput = {
    user_id?: string
    email: string
    password_hash: string
    created_at?: Date | string | null
    tags?: tagsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutTodosInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutTodosInput, usersUncheckedCreateWithoutTodosInput>
  }

  export type todo_tagsUpsertWithWhereUniqueWithoutTodosInput = {
    where: todo_tagsWhereUniqueInput
    update: XOR<todo_tagsUpdateWithoutTodosInput, todo_tagsUncheckedUpdateWithoutTodosInput>
    create: XOR<todo_tagsCreateWithoutTodosInput, todo_tagsUncheckedCreateWithoutTodosInput>
  }

  export type todo_tagsUpdateWithWhereUniqueWithoutTodosInput = {
    where: todo_tagsWhereUniqueInput
    data: XOR<todo_tagsUpdateWithoutTodosInput, todo_tagsUncheckedUpdateWithoutTodosInput>
  }

  export type todo_tagsUpdateManyWithWhereWithoutTodosInput = {
    where: todo_tagsScalarWhereInput
    data: XOR<todo_tagsUpdateManyMutationInput, todo_tagsUncheckedUpdateManyWithoutTodosInput>
  }

  export type usersUpsertWithoutTodosInput = {
    update: XOR<usersUpdateWithoutTodosInput, usersUncheckedUpdateWithoutTodosInput>
    create: XOR<usersCreateWithoutTodosInput, usersUncheckedCreateWithoutTodosInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutTodosInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutTodosInput, usersUncheckedUpdateWithoutTodosInput>
  }

  export type usersUpdateWithoutTodosInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tags?: tagsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutTodosInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tags?: tagsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type tagsCreateWithoutUsersInput = {
    tag_id?: string
    tag_name: string
    todo_tags?: todo_tagsCreateNestedManyWithoutTagsInput
  }

  export type tagsUncheckedCreateWithoutUsersInput = {
    tag_id?: string
    tag_name: string
    todo_tags?: todo_tagsUncheckedCreateNestedManyWithoutTagsInput
  }

  export type tagsCreateOrConnectWithoutUsersInput = {
    where: tagsWhereUniqueInput
    create: XOR<tagsCreateWithoutUsersInput, tagsUncheckedCreateWithoutUsersInput>
  }

  export type tagsCreateManyUsersInputEnvelope = {
    data: tagsCreateManyUsersInput | tagsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type todosCreateWithoutUsersInput = {
    todo_id?: string
    title?: string | null
    content?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    todo_tags?: todo_tagsCreateNestedManyWithoutTodosInput
  }

  export type todosUncheckedCreateWithoutUsersInput = {
    todo_id?: string
    title?: string | null
    content?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    todo_tags?: todo_tagsUncheckedCreateNestedManyWithoutTodosInput
  }

  export type todosCreateOrConnectWithoutUsersInput = {
    where: todosWhereUniqueInput
    create: XOR<todosCreateWithoutUsersInput, todosUncheckedCreateWithoutUsersInput>
  }

  export type todosCreateManyUsersInputEnvelope = {
    data: todosCreateManyUsersInput | todosCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type tagsUpsertWithWhereUniqueWithoutUsersInput = {
    where: tagsWhereUniqueInput
    update: XOR<tagsUpdateWithoutUsersInput, tagsUncheckedUpdateWithoutUsersInput>
    create: XOR<tagsCreateWithoutUsersInput, tagsUncheckedCreateWithoutUsersInput>
  }

  export type tagsUpdateWithWhereUniqueWithoutUsersInput = {
    where: tagsWhereUniqueInput
    data: XOR<tagsUpdateWithoutUsersInput, tagsUncheckedUpdateWithoutUsersInput>
  }

  export type tagsUpdateManyWithWhereWithoutUsersInput = {
    where: tagsScalarWhereInput
    data: XOR<tagsUpdateManyMutationInput, tagsUncheckedUpdateManyWithoutUsersInput>
  }

  export type tagsScalarWhereInput = {
    AND?: tagsScalarWhereInput | tagsScalarWhereInput[]
    OR?: tagsScalarWhereInput[]
    NOT?: tagsScalarWhereInput | tagsScalarWhereInput[]
    tag_id?: UuidFilter<"tags"> | string
    user_id?: UuidFilter<"tags"> | string
    tag_name?: StringFilter<"tags"> | string
  }

  export type todosUpsertWithWhereUniqueWithoutUsersInput = {
    where: todosWhereUniqueInput
    update: XOR<todosUpdateWithoutUsersInput, todosUncheckedUpdateWithoutUsersInput>
    create: XOR<todosCreateWithoutUsersInput, todosUncheckedCreateWithoutUsersInput>
  }

  export type todosUpdateWithWhereUniqueWithoutUsersInput = {
    where: todosWhereUniqueInput
    data: XOR<todosUpdateWithoutUsersInput, todosUncheckedUpdateWithoutUsersInput>
  }

  export type todosUpdateManyWithWhereWithoutUsersInput = {
    where: todosScalarWhereInput
    data: XOR<todosUpdateManyMutationInput, todosUncheckedUpdateManyWithoutUsersInput>
  }

  export type todosScalarWhereInput = {
    AND?: todosScalarWhereInput | todosScalarWhereInput[]
    OR?: todosScalarWhereInput[]
    NOT?: todosScalarWhereInput | todosScalarWhereInput[]
    todo_id?: UuidFilter<"todos"> | string
    user_id?: UuidFilter<"todos"> | string
    title?: StringNullableFilter<"todos"> | string | null
    content?: StringNullableFilter<"todos"> | string | null
    created_at?: DateTimeNullableFilter<"todos"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"todos"> | Date | string | null
  }

  export type todo_tagsCreateManyTagsInput = {
    todo_id: string
  }

  export type todo_tagsUpdateWithoutTagsInput = {
    todos?: todosUpdateOneRequiredWithoutTodo_tagsNestedInput
  }

  export type todo_tagsUncheckedUpdateWithoutTagsInput = {
    todo_id?: StringFieldUpdateOperationsInput | string
  }

  export type todo_tagsUncheckedUpdateManyWithoutTagsInput = {
    todo_id?: StringFieldUpdateOperationsInput | string
  }

  export type todo_tagsCreateManyTodosInput = {
    tag_id: string
  }

  export type todo_tagsUpdateWithoutTodosInput = {
    tags?: tagsUpdateOneRequiredWithoutTodo_tagsNestedInput
  }

  export type todo_tagsUncheckedUpdateWithoutTodosInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
  }

  export type todo_tagsUncheckedUpdateManyWithoutTodosInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
  }

  export type tagsCreateManyUsersInput = {
    tag_id?: string
    tag_name: string
  }

  export type todosCreateManyUsersInput = {
    todo_id?: string
    title?: string | null
    content?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type tagsUpdateWithoutUsersInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
    tag_name?: StringFieldUpdateOperationsInput | string
    todo_tags?: todo_tagsUpdateManyWithoutTagsNestedInput
  }

  export type tagsUncheckedUpdateWithoutUsersInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
    tag_name?: StringFieldUpdateOperationsInput | string
    todo_tags?: todo_tagsUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type tagsUncheckedUpdateManyWithoutUsersInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
    tag_name?: StringFieldUpdateOperationsInput | string
  }

  export type todosUpdateWithoutUsersInput = {
    todo_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    todo_tags?: todo_tagsUpdateManyWithoutTodosNestedInput
  }

  export type todosUncheckedUpdateWithoutUsersInput = {
    todo_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    todo_tags?: todo_tagsUncheckedUpdateManyWithoutTodosNestedInput
  }

  export type todosUncheckedUpdateManyWithoutUsersInput = {
    todo_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}