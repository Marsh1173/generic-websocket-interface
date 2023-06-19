export abstract class GameSystem {
  constructor() {
    this.previous_time = Date.now();
  }

  protected previous_time: number;
  public update(elapsed_time: number) {}
}
