export function Singleton<T extends new (...args: any[]) => any>(ctr: T): T {
  let instance: T | undefined = undefined;

  return class {
    constructor(...args: any[]) {
      if (!instance) {
        instance = new ctr(...args) as T;
      }

      return instance;
    }
  } as T;
}
