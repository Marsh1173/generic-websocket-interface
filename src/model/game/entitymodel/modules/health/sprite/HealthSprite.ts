// import { Container, Graphics, Sprite } from "pixi.js";
// import { GameEntitySprite } from "../../../../display/sceneobject/GameEntitySprite";
// import { Entity } from "../../../entity/Entity";
// import { HasHealthModule } from "../HealthModule";
// import { LocalGameSystem } from "../../../../gamesystem/LocalGameSystem";
// import { Id, uuid } from "../../../../../common/Id";
// import { OnLoseHealthParams } from "../HealthObservable";
// import { GTTextures } from "../../../../assets/textures/Textures";
// import { ResolutionScale } from "../../../../display/Resolution";
// import { health_bar_px_width } from "../../../../assets/textures/graphics/HealthGraphics";

// export interface HealthSpriteOptions {
//   type: "regular";
//   height: number;
// }

// const DEFAULT_HEALTH_SPRITE_OPTIONS: HealthSpriteOptions = {
//   type: "regular",
//   height: 80,
// };

// export class HealthSprite<EntityType extends HasHealthModule & Entity> extends GameEntitySprite<EntityType> {
//   public readonly display_object: Container;
//   public readonly id: Id = uuid();
//   protected readonly options: HealthSpriteOptions;

//   constructor(entity: EntityType, game_system: LocalGameSystem, partial_options: Partial<HealthSpriteOptions> = {}) {
//     super(entity, game_system);

//     this.options = { ...DEFAULT_HEALTH_SPRITE_OPTIONS, ...partial_options };

//     this.display_object = this.get_display_object();
//     this.on_lose_health = this.on_lose_health.bind(this);
//     entity.health_module.observable.add_observer(this);
//   }

//   public readonly on_lose_health = (params: OnLoseHealthParams) => {
//     if (this.color_bar) {
//       this.color_bar.scale.set(this.get_hp_percentage() * this.bar_width, 1);
//     }
//   };

//   protected color_bar!: Sprite;
//   protected bar_width!: number;
//   protected get_display_object() {
//     this.bar_width = health_bar_px_width * ResolutionScale[this.game_system.display.config.res];

//     const background_rect: Sprite = new Sprite(GTTextures.get("health-background"));
//     background_rect.anchor.set(0.5, 0.5);

//     this.color_bar = new Sprite(GTTextures.get("health-color-bar"));
//     this.color_bar.scale.set(this.get_hp_percentage() * this.bar_width, 1);
//     this.color_bar.position.set(this.bar_width / -2, 0);
//     this.color_bar.anchor.set(0, 0.5);

//     const container = new Container();
//     container.addChild(background_rect);
//     container.addChild(this.color_bar);
//     container.alpha = 0.8;
//     container.pivot.set(0, this.options.height);

//     return container;
//   }

//   public on_destroy(): void {}

//   private get_hp_percentage(): number {
//     return this.entity.health_module.current_health / this.entity.health_module.max_health;
//   }
// }
