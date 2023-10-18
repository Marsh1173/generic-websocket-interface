import { uuid } from "../../../../common/Id";
import { StaticPoint } from "../../../../common/math/geometry/Point";
import { ItemEntity } from "../../../entities/itementity/ItemEntity";
import { GameSystem } from "../../../gamesystem/GameSystem";
import { ItemData } from "../../../items/Item";

export interface IDropItemsOnDeathModule {
  drop_items(origin: StaticPoint): void;
}

export interface HasDropItemsOnDeathModule {
  readonly drop_items_on_death: IDropItemsOnDeathModule;
}

export interface ItemDropData {
  item_data: ItemData;
  probability: number;
}

export class DropPresetItemsOnDeathModule implements IDropItemsOnDeathModule {
  constructor(private readonly game_system: GameSystem, private readonly items: ItemDropData[]) {}

  public drop_items(origin: StaticPoint): void {
    for (const item_drop_data of this.items) {
      if (this.kaching(item_drop_data.probability)) {
        const destination = ItemEntity.find_flung_item_destination(origin, this.game_system);
        this.game_system.entities.make.item_entity({
          type: "ItemEntityData",
          item_type: item_drop_data.item_data,
          id: uuid(),
          game_space_data: {
            pos: destination,
          },
        });
      }
    }
  }

  private kaching(probability: number): boolean {
    return Math.random() <= probability;
  }
}
