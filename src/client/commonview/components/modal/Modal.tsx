import React from "react";
import { Component } from "react";

import "./ModalStyles.less";

export interface ModalProps {
  visible: boolean;
  on_close: () => void;
  children: JSX.Element[] | JSX.Element;
}

export class Modal extends Component<ModalProps, {}> {
  constructor(props: ModalProps) {
    super(props);
  }

  public render() {
    return (
      <>
        {this.props.visible && (
          <div className={`Modal${this.props.visible === true ? " visible" : ""}`}>
            <div
              className="background"
              onClick={() => {
                this.props.on_close();
              }}
            ></div>
            <div className="modal-container">{this.props.children}</div>
          </div>
        )}
      </>
    );
  }
}
