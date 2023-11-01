import React from "react";
import { Component } from "react";
import { ViewChanger } from "../../../main/ViewChanger";
import { LocalGameSystemData } from "../../../../model/game/gamesystem/LocalGameSystem";
import { GTTextures } from "../../../../model/game/assets/textures/Textures";
import { Application } from "pixi.js";
import { ResolutionDimensions } from "../../../../model/game/display/Resolution";
import { GTModels } from "../../../../model/game/assets/models/Models";

export interface LoadingComponentProps {
  local_game_data: LocalGameSystemData;
}

interface LoadingComponentState {}

export class LoadingComponent extends Component<{ props: LoadingComponentProps }, LoadingComponentState> {
  protected readonly view_app: Application<HTMLCanvasElement>;

  constructor(props: any) {
    super(props);

    const resolution = ResolutionDimensions[this.props.props.local_game_data.display_config.res];
    this.view_app = new Application<HTMLCanvasElement>({
      width: resolution.w,
      height: resolution.h,
      antialias: false,
      backgroundAlpha: 0,
    });
  }

  public render() {
    return <div className="LoadingComponent">Loading...</div>;
  }

  public componentDidMount(): void {
    Promise.all([
      GTTextures.load(this.props.props.local_game_data.display_config.res, this.view_app.renderer),
      GTModels.load_models(),
    ]).then(() => {
      new ViewChanger().change_state_to_game({
        local_game_data: this.props.props.local_game_data,
        view_app: this.view_app,
      });
    });
  }
}
