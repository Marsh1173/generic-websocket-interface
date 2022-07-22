import React from "react";
import { createRoot } from "react-dom/client";
import { ConnectingView } from "./ConnectingView";
import { InitializingView } from "./InitializingView";
import { LoginView } from "./LoginView";
import "../Styles/MainStyles.less";
import { LoggingInPresenter } from "../../Presenter/LoggingInAppState";

export interface ViewHandlerInterface {
    show_initializing_view: () => void;
    show_connecting_view: () => void;
    show_login_view: (presenter: LoggingInPresenter) => void;
    show_main_menu_view: () => void;
    show_browser_view: () => void;
}

export class ViewHandler implements ViewHandlerInterface {

    private dom_container;
    private root;

    constructor() {
        this.dom_container = document.querySelector("#reactDom");
        this.root = createRoot(this.dom_container!);
    }
    public show_initializing_view = () => {
        this.root.render(<InitializingView/>);
    }
    public show_connecting_view = () =>  {
        this.root.render(<ConnectingView/>);
    }
    public show_login_view = (presenter: LoggingInPresenter) => {
        this.root.render(<LoginView presenter={presenter}/>);
    }
    public show_main_menu_view = () => {

    }
    public show_browser_view = () => {

    }


}