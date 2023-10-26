// import { DisplayObject, Graphics } from "pixi.js";
// import { GameEntitySprite } from "../display/sceneobject/GameEntitySprite";
// import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
// import { Entity } from "../entitymodel/entity/Entity";

// export class EntityOriginSprite extends GameEntitySprite<Entity> {
//   public readonly display_object: DisplayObject;
//   constructor(entity: Entity, game_system: LocalGameSystem) {
//     super(entity, game_system);

//     this.display_object = this.get_display_object();
//   }

//   protected get_display_object(): DisplayObject {
//     const circle: Graphics = new Graphics();
//     circle.beginFill(0xff0000);
//     circle.drawCircle(0, 0, 5);
//     return circle;
//   }

//   public on_destroy(): void {}
// }

// export class ShowEntityOrigin {
//   private static flag: boolean = false;
//   public static set(val: boolean) {
//     ShowEntityOrigin.flag = val;
//   }
//   public static get(): boolean {
//     return this.flag;
//   }
// }
