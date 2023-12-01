import { Application } from "pixi.js";
import React from "react";
import { Component } from "react";
import { LocalGameSystemData } from "../../../gamesystem/LocalGameSystem";
import { ResolutionDimensions } from "../../Resolution";
import { GTTextures } from "../../../assets/textures/Textures";
import { GTModels } from "../../../assets/models/Models";
import { ViewChanger } from "../../../../../client/main/ViewChanger";
import "./LoadingAppStyles.less";

export interface LoadingAppProps {
  local_game_data: LocalGameSystemData;
}

interface LoadingAppState {}

export class LoadingApp extends Component<{ props: LoadingAppProps }, LoadingAppState> {
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
    return <div className="LoadingApp">Loading...</div>;
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
