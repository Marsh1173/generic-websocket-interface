// const DayNightCycleConfig = {
//   day_seconds: 60 * 3,
//   night_seconds: 60 * 2,
// };
const DayNightCycleConfig = {
  day_seconds: 15,
  night_seconds: 15,
};

export type DayNightCycleState = "day" | "night";

export class DayNightCycle {
  private _state: DayNightCycleState = "day";
  private _state_running_seconds: number = 0;

  public get state() {
    return this._state;
  }
  public get state_running_seconds() {
    return this._state_running_seconds;
  }

  public update(elapsed_seconds: number) {
    // this._state_running_seconds += elapsed_seconds;

    if (this._state === "day") {
      if (this._state_running_seconds >= DayNightCycleConfig.day_seconds) {
        this._state = "night";
        this._state_running_seconds = 0;
      }
    } else if (this._state === "night") {
      if (this._state_running_seconds >= DayNightCycleConfig.night_seconds) {
        this._state = "day";
        this._state_running_seconds = 0;
      }
    }
  }
}
