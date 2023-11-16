import { Color, DirectionalLight, HemisphereLight, PointLight, Scene } from "three";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { DayNightCycleState } from "../../../gamestatemanager/daynightcycle/DayNightCycle";

const DAY_NIGHT_CYCLE_ANIMATION_RUN_SECONDS: number = 10;

const DAY_HLIGHT_SKY: Color = new Color("#ebfcff");
const DAY_HLIGHT_GROUND: Color = new Color("#aff3ff");
const DAY_DLIGHT: Color = new Color("#ffffff");

const NIGHT_HLIGHT_SKY: Color = new Color("#252f44");
const NIGHT_HLIGHT_GROUND: Color = new Color("#293c4d");
const NIGHT_DLIGHT: Color = new Color("#3d486d");

export class _3DLighting {
  protected readonly h_light: HemisphereLight;
  protected readonly d_light: DirectionalLight;

  constructor(protected readonly game_system: LocalGameSystem, protected readonly scene: Scene) {
    this.day_night_cycle_state = this.game_system.game_state_manager.day_night_cycle.state;
    const is_day = this.day_night_cycle_state === "day";

    this.h_light = new HemisphereLight(
      is_day ? DAY_HLIGHT_SKY : NIGHT_HLIGHT_SKY,
      is_day ? DAY_HLIGHT_GROUND : NIGHT_HLIGHT_GROUND,
      1
    );
    this.h_light.position.set(0, 0, 1);
    this.scene.add(this.h_light);

    this.d_light = new DirectionalLight(is_day ? DAY_DLIGHT : NIGHT_DLIGHT, 2);
    this.d_light.position.set(3, -2, 6);
    this.scene.add(this.d_light);

    // fire light
    // const p_light = new PointLight("#ff7300", 3, 5);
    // p_light.position.set(6, 4, 1);
    // this.scene.add(p_light);
  }

  protected day_night_cycle_state: DayNightCycleState;
  protected day_night_cycle_animation_seconds: number = 0;

  public update(elapsed_seconds: number) {
    const current_state = this.game_system.game_state_manager.day_night_cycle.state;
    if (this.day_night_cycle_state !== current_state) {
      this.day_night_cycle_state = current_state;
      this.day_night_cycle_animation_seconds = DAY_NIGHT_CYCLE_ANIMATION_RUN_SECONDS;
    }

    if (this.day_night_cycle_animation_seconds > 0) {
      this.day_night_cycle_animation_seconds -= elapsed_seconds;
      const percentage = Math.min(
        Math.max(1 - this.day_night_cycle_animation_seconds / DAY_NIGHT_CYCLE_ANIMATION_RUN_SECONDS, 0),
        1
      );
      const is_day = this.day_night_cycle_state === "day";

      this.d_light.color.lerpColors(is_day ? NIGHT_DLIGHT : DAY_DLIGHT, is_day ? DAY_DLIGHT : NIGHT_DLIGHT, percentage);

      this.h_light.color.lerpColors(
        is_day ? NIGHT_HLIGHT_SKY : DAY_HLIGHT_SKY,
        is_day ? DAY_HLIGHT_SKY : NIGHT_HLIGHT_SKY,
        percentage
      );
      this.h_light.groundColor.lerpColors(
        is_day ? NIGHT_HLIGHT_GROUND : DAY_HLIGHT_GROUND,
        is_day ? DAY_HLIGHT_GROUND : NIGHT_HLIGHT_GROUND,
        percentage
      );
    }
  }
}
