export type StringPrefix<
  Type extends string,
  StringLiteral extends string
> = `${StringLiteral}-${Type}`;

export function wrap_record<StringLiteral extends string, Type extends string>(
  record: Record<Type, string>,
  path_str: string,
  name_str: string | undefined = path_str
): Record<StringPrefix<Type, StringLiteral>, string> {
  const path_prefix = path_str + "/";
  const name_prefix = name_str ? name_str + "-" : "";
  return Object.fromEntries(
    (Object.entries(record) as [Type, StringLiteral][]).map(([name, path]) => {
      return [name_prefix + name, path_prefix + path];
    })
  ) as Record<StringPrefix<Type, StringLiteral>, string>;
}

export function add_path_to_record_values<T1 extends string, T2 extends string>(
  record: Record<T1, T2>,
  path_str: string
): Record<T1, T2> {
  const path_prefix = path_str + "/";
  return Object.fromEntries(
    (Object.entries(record) as [T1, T2][]).map(([name, path]) => {
      return [name, path_prefix + path];
    })
  ) as Record<T1, T2>;
}
