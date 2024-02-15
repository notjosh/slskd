// mapping enum types that use flags to known values
// `JsonStringEnumConverter` collapses the flags to a comma-separated string, so we can split it to get the values

// known flag enums:
// - SearchStates / ApiSoulseekSearchStates
// - TransferStates / ApiSoulseekSoulseekClientStates
// - SoulseekClientState / ApiSoulseekSoulseekClientStates
// - ConnectionTypes (internal, ignored here)

// for example, a valid search state is "Completed, FileLimitReached",
// which is represented from the API as `${ApiSoulseekSearchStates.Completed}, ${ApiSoulseekSearchStates.FileLimitReached}`

// via https://code.whatever.social/questions/59471947/define-a-typescript-string-type-of-comma-separated-union-types
type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type UnionToOvlds<U> = UnionToIntersection<
  U extends unknown ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type UnionConcat<U extends string, Separator extends string> =
  PopUnion<U> extends infer SELF
    ? SELF extends string
      ? Exclude<U, SELF> extends never
        ? SELF
        :
            | `${UnionConcat<Exclude<U, SELF>, Separator>}${Separator}${SELF}`
            | UnionConcat<Exclude<U, SELF>, Separator>
            | SELF
      : never
    : never;

type EnumFlags<T extends string> = UnionConcat<T, ', '>;

export class FlaggedEnum<T extends string> {
  public readonly flags: T[];

  public constructor(serialized: EnumFlags<T>) {
    this.flags = (serialized as string).split(', ') as T[];
  }

  public isExactly(flag: T | T[]) {
    return (
      (Array.isArray(flag) ? flag : [flag]).every((f) =>
        this.flags.includes(f),
      ) && this.flags.length === (Array.isArray(flag) ? flag.length : 1)
    );
  }

  public has(flag: T | T[]) {
    return (Array.isArray(flag) ? flag : [flag]).every((f) =>
      this.flags.includes(f),
    );
  }
}
