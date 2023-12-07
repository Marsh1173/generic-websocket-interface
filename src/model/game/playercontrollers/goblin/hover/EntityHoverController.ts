import { GTMath } from "../../../../common/math/basic/GTMath";
import { StaticPoint } from "../../../../common/math/geometry/Point";
import { Goblin } from "../../../entities/goblin/Goblin";
import { Tree } from "../../../entities/tree/Tree";
import { Entity } from "../../../entitymodel/entity/Entity";
import { HasTeamModule } from "../../../entitymodel/modules/team/TeamModule";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { HoverSceneObjectGroup } from "./HoverSceneObject";

export class EntityHoverController {
  protected readonly _state: EntityHoverControllerState = {
    can_target_enemies: true,
    can_target_allies: true,
    can_target_harvestables: true,
    target: undefined,
  };

  public get state(): Readonly<EntityHoverControllerState> {
    return this._state;
  }

  protected get cursor_range_radius(): number {
    return 1;
  }
  protected get enemy_interact_range(): number {
    return 2; // will eventually be a field on the goblin main-hand
  }
  protected get ally_interact_range(): number {
    return 2; // will eventually be a field on the goblin main-hand
  }
  protected get harvestable_interact_range(): number {
    return 2; // will eventually be a field on the goblin
  }

  protected readonly scene_object: HoverSceneObjectGroup;
  constructor(protected readonly game_system: LocalGameSystem, protected readonly goblin: Goblin) {
    this.scene_object = new HoverSceneObjectGroup(this.game_system, this).insert();
  }

  public update_mouse_pos(point: StaticPoint) {
    const hover_point: StaticPoint = {
      x: point.x,
      y: point.y - 0.5,
    };

    const entites_in_bounding_box: Entity[] = this.game_system.entities.find.by_origin.inside_box(
      hover_point,
      this.cursor_range_radius * 2
    );

    const filtered_targets: EntityHoverControllerTarget[] = this.filter_entities(entites_in_bounding_box, hover_point);
    const most_prominent: EntityHoverControllerTarget | undefined = this.find_most_prominent_target(
      filtered_targets,
      hover_point
    );

    this._state.target = most_prominent;

    this.scene_object.update(0);
  }

  private filter_entities(entities: Entity[], hover_point: StaticPoint): EntityHoverControllerTarget[] {
    return entities
      .map<EntityHoverControllerTarget | undefined>((entity: Entity) => {
        if (entity.type === "Tree") {
          return {
            type: "Harvestable",
            entity,
          };
        } else if (entity.team_module?.team !== this.goblin.team_module.team) {
          return {
            type: "Enemy",
            entity: entity,
          };
        } else if (entity.team_module && entity.team_module.team === this.goblin.team_module.team) {
          return {
            type: "Ally",
            entity: entity.team_module.entity,
          };
        } else {
          return undefined;
        }
      })
      .filter((target) => {
        if (target === undefined) {
          return false;
        } else if (GTMath.Distance(hover_point, target.entity.game_space_data.pos) > this.cursor_range_radius) {
          return false;
        } else if (!this._state.can_target_harvestables && target.entity.type === "Tree") {
          return false;
        } else if (
          !this._state.can_target_enemies &&
          target.entity.team_module?.team !== this.goblin.team_module.team
        ) {
          return false;
        } else if (
          !this._state.can_target_allies &&
          target.entity.team_module &&
          target.entity.team_module?.team === this.goblin.team_module.team
        ) {
          return false;
        } else if (this.goblin.id === target.entity.id) {
          return false;
        }

        return true;
      }) as EntityHoverControllerTarget[];
  }

  private find_most_prominent_target(
    targets: EntityHoverControllerTarget[],
    hover_point: StaticPoint
  ): EntityHoverControllerTarget | undefined {
    const get_value = (target: EntityHoverControllerTarget): number => {
      const distance = GTMath.Distance(hover_point, target.entity.game_space_data.pos);
      //Prefers in this order - enemies in range -> harvestables in range -> allies in range -> whatever's closest to cursor out of range.
      switch (target.type) {
        case "Ally":
          return distance > this.ally_interact_range ? -distance : 2 + distance / this.ally_interact_range;
        case "Enemy":
          return distance > this.enemy_interact_range ? -distance : distance / this.enemy_interact_range;
        case "Harvestable":
          return distance > this.harvestable_interact_range
            ? -distance
            : 1 + distance / this.harvestable_interact_range;
      }
    };

    return targets
      .sort((a, b) => {
        return get_value(a) - get_value(b);
      })
      .at(0);
  }

  /**
   *
   * Might try to search entity quad tree 0.5 units BELOW global cursor pos
   * Possibly keep entity quad tree as is, no sub-type trees unless origins vary.
   *
   * Goblin state / weapons "control" this's state and what it can hover over
   */
}

export interface EntityHoverControllerState {
  can_target_enemies: boolean;
  can_target_allies: boolean;
  can_target_harvestables: boolean;
  target: EntityHoverControllerTarget | undefined;
}

export type EntityHoverControllerTarget =
  | EntityHoverControllerAllyTarget
  | EntityHoverControllerEnemyTarget
  | EntityHoverControllerHarvestableTarget;

export interface EntityHoverControllerAllyTarget {
  type: "Ally";
  entity: Entity & HasTeamModule;
}

export interface EntityHoverControllerEnemyTarget {
  type: "Enemy";
  entity: Entity;
}

export interface EntityHoverControllerHarvestableTarget {
  type: "Harvestable";
  entity: Tree;
}
