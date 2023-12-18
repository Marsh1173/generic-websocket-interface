import "./InventoryStyles.less";
import React from "react";
import { Component } from "react";
import { InventoryModule } from "../../../entitymodel/modules/inventory/InventoryModule";
import { ItemData } from "../../../items/Item";
import { Id, uuid } from "../../../../common/Id";
import { ItemImageMap } from "../../../items/ItemImageMap";

interface InventoryComponentProps {
  inventory: InventoryModule;
}
interface InventoryComponentState {
  slots: (ItemData | undefined)[];
}

export class InventoryComponent extends Component<InventoryComponentProps, InventoryComponentState> {
  private readonly id: Id = uuid();
  constructor(props: InventoryComponentProps) {
    super(props);

    this.state = {
      slots: this.props.inventory.observable.add_observer_and_get_state({
        id: this.id,
        on_change: (params) => {
          this.setState({ slots: params });
        },
      }),
    };
  }

  public render() {
    const inventory_slots = this.state.slots.slice(0, 20).map((slot, i) => {
      return (
        <div className={"inventory-slot" + (slot !== undefined ? " filled" : "")} key={i}>
          {slot !== undefined && <img src={ItemImageMap[slot.type]} draggable={false}></img>}
        </div>
      );
    });

    return (
      <div className="InventoryComponent">
        <div className="inventory-slots">{inventory_slots}</div>
        <div className="gear-slots">
          <div className="inventory-slot"></div>
          <img src="./assets/images/icons/mainhand-sword.png"></img>
          <div className="inventory-slot"></div>
          <img src="./assets/images/icons/offhand-shield.png"></img>
          <div className="inventory-slot"></div>
          <img src="./assets/images/icons/shirt.png"></img>
        </div>
      </div>
    );
  }

  public componentWillUnmount(): void {
    this.props.inventory.observable.remove_observer(this.id);
  }
}
