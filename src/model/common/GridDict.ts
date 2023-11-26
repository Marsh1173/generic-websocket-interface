/**
 * Wrapper for a map that supports a tuple of numbers as the key type.
 */
export class GridDict<T> {
  private inner: Map<string, T>;

  constructor(values: [string, T][] = []) {
    this.inner = new Map<string, T>(values);
  }

  public set(key: [number, number], value: T) {
    this.inner.set(key.join(","), value);
  }

  public delete(key: [number, number]): boolean {
    return this.inner.delete(key.join(","));
  }

  public get(key: [number, number]): T | undefined {
    return this.inner.get(key.join(","));
  }

  public clear() {
    this.inner.clear();
  }

  public to_json(): string {
    return JSON.stringify(Array.from(this.inner.entries()));
  }

  public static from_json<T>(json: string): GridDict<T> {
    const values = JSON.parse(json) as [string, T][];
    return new GridDict(values);
  }
}
