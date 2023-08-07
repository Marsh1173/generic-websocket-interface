export abstract class GameSystemIO {
  public abstract deconstruct(): void;

  public abstract update(elapsed_seconds: number): void;
}
