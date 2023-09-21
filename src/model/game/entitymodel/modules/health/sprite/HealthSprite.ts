import { Container, Graphics } from "pixi.js";
import { GameEntitySprite } from "../../../../display/gamesprite/GameEntitySprite";
import { Entity } from "../../../entity/Entity";
import { HasHealthModule } from "../HealthModule";
import { LocalGameSystem } from "../../../../gamesystem/LocalGameSystem";
import { Id, uuid } from "../../../../../common/Id";
import { OnLoseHealthParams } from "../HealthObservable";

type GraphicsContainer = Container<Graphics>;

const hp_colors = {
  self: 0x00ff44, //light green
  no_team: 0xffffff, //white
  enemy: 0xff2222, //red
  other: 0xffdd44, //yellow
  ally: 0x33b1ff, //light blue
};

const bar_width: number = 60;

export class HealthSprite<EntityType extends HasHealthModule & Entity> extends GameEntitySprite<EntityType> {
  public readonly display_object: GraphicsContainer;
  public readonly id: Id = uuid();

  constructor(entity: EntityType, game_system: LocalGameSystem) {
    super(entity, game_system);

    this.display_object = this.get_display_object();
    this.on_lose_health = this.on_lose_health.bind(this);
    entity.health_module.observable.add_observer(this);
  }

  public readonly on_lose_health = (params: OnLoseHealthParams) => {
    if (this.color_bar) {
      this.color_bar.scale.set(this.get_hp_percentage() * bar_width, 1);
    }
  };

  protected color_bar!: Graphics;
  protected get_display_object() {
    const height = 5;
    const border = 2;

    const background_rect: Graphics = new Graphics();
    background_rect.beginFill(0x000000);
    background_rect.drawRect(
      (bar_width + border * 2) / -2,
      (height + border * 2) / -2,
      bar_width + border * 2,
      height + border * 2
    );

    this.color_bar = new Graphics();
    this.color_bar.beginFill(hp_colors.self);
    this.color_bar.drawRect(0, height / -2, 1, height);

    this.color_bar.beginFill(0x000000, 0.2);
    this.color_bar.drawRect(0, height / 2 - 2, 1, 2);

    this.color_bar.beginFill(0xffffff, 0.2);
    this.color_bar.drawRect(0, height / -2, 1, 2);

    this.color_bar.position.set(bar_width / -2, 0);
    this.color_bar.scale.set(this.get_hp_percentage() * bar_width, 1);

    const container = new Container<Graphics>();
    container.addChild(background_rect);
    container.addChild(this.color_bar);
    container.alpha = 0.8;
    container.pivot.set(0, 80);
    //set anchor?

    return container;
  }

  public on_destroy(): void {
    this.display_object.children.forEach((graphic) => {
      graphic.destroy();
    });
  }

  private get_hp_percentage(): number {
    return this.entity.health_module.current_health / this.entity.health_module.max_health;
  }
}
