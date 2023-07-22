import React from "react";
import { createRoot, Root } from "react-dom/client";
import { AuthenticationViewProps } from "../authentication/AuthenticationView";
import { ConnectingViewProps } from "../connecting/ConnectingView";
import { safe_get_element_by_selector } from "../utils/SafeGetElementBySelector";
import { Singleton } from "../../model/utils/Singleton";
import { MainView, MainViewProps } from "./MainView";
import { AuthMenuProps } from "../authmenu/AuthMenuView";
import { LocalGameComponentProps } from "../game/local/LocalGameView";
import { LoadingComponentProps } from "../game/common/loading/LoadingComponent";

@Singleton
export class ViewChanger {
  private dom_container: Element;
  private root: Root;
  private readonly main_view: React.RefObject<MainView> = React.createRef();

  constructor() {
    this.dom_container = safe_get_element_by_selector("#react-dom");
    this.root = createRoot(this.dom_container);
  }

  public initialize(props?: MainViewProps) {
    const main_view_element: JSX.Element = (
      <MainView ref={this.main_view} initial_state={props?.initial_state} />
    );
    this.root.render(main_view_element);
  }

  public change_state_to_authenticating(props: AuthenticationViewProps) {
    this.main_view.current?.setState({ type: "authenticating", props });
  }

  public change_state_to_connecting(props: ConnectingViewProps) {
    this.main_view.current?.setState({ type: "connecting", props });
  }

  public change_state_to_disconnected(msg: string) {
    this.main_view.current?.setState({ type: "disconnected", msg });
  }

  public change_state_to_authmenu(props: AuthMenuProps) {
    this.main_view.current?.setState({ type: "authmenu", props });
  }

  public change_state_to_loading_game(props: LoadingComponentProps) {
    this.main_view.current?.setState({ type: "loading-game", props });
  }

  public change_state_to_game(props: LocalGameComponentProps) {
    this.main_view.current?.setState({ type: "game", props });
  }
}
