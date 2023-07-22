import React from "react";
import { Component } from "react";
import { ImageAssets } from "../../../assets/image/ImageAssets";
import { ViewChanger } from "../../../main/ViewChanger";
import { LocalGameSystemData } from "../../../../model/game/gamesystem/LocalGameSystem";

export interface LoadingComponentProps {
  local_game_data: LocalGameSystemData;
}

interface LoadingComponentState {}

export class LoadingComponent extends Component<
  { props: LoadingComponentProps },
  LoadingComponentState
> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return <div className="LoadingComponent">Loading...</div>;
  }

  public componentDidMount(): void {
    ImageAssets.load_all_images().then(() => {
      new ViewChanger().change_state_to_game({
        local_game_data: this.props.props.local_game_data,
      });
    });
  }
}
