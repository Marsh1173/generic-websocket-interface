export abstract class Config<ModeType extends string, ConfigType> {
  protected abstract config_record: Record<ModeType, ConfigType>;
  protected abstract default_mode: ModeType;
  private mode: ModeType | undefined = undefined;
  public get(): ConfigType {
    return this.config_record[this.mode ? this.mode : this.default_mode];
  }
  public set(mode: ModeType) {
    this.mode = mode;
  }
}
