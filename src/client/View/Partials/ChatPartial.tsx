import React from "react";
import { Component } from "react";
import { get_next_id } from "../../../model/Misc/getNextId";
import { ChatObserverInterface, ChatMessageInterface, ChatPresenterInterface } from "../../Presenter/ChatPresenter";

export class ChatPartial extends Component<{chat_presenter: ChatPresenterInterface}, {messages: ChatMessageInterface[]}> implements ChatObserverInterface {

    public readonly id: number = get_next_id();

    constructor(props: {chat_presenter: ChatPresenterInterface}) {
        super(props)

        const initial_state: ChatMessageInterface[] = [];
        this.state = {messages: initial_state};
    }

    render() {
        let messages: JSX.Element[] = this.state.messages.map((msg, index) => {
            return <ChatMessageComponent msg={msg} if_first={index === 0} key={get_next_id()}></ChatMessageComponent>
        });
        return <div id="ChatPartial" onMouseOver={this.on_chat_hover} onMouseLeave={this.on_chat_leave_hover}>{messages}</div>
    }

    private on_chat_hover: React.MouseEventHandler<HTMLDivElement> = (e) => {
        for(let i: number = 1; i < e.currentTarget.children.length; i++) {
            e.currentTarget.children[i].classList.remove("hide");
        }

    }

    private on_chat_leave_hover: React.MouseEventHandler<HTMLDivElement> = (e) => {
        for(let i: number = 1; i < e.currentTarget.children.length; i++) {
            e.currentTarget.children[i].classList.add("hide");
        }
    }

    public update = (messages: ChatMessageInterface[]) => {
        this.setState({messages});
    }

    componentDidMount() {
        this.props.chat_presenter.add_chat_observer(this);
    }

    componentWillUnmount() {
        this.props.chat_presenter.remove_chat_observer(this.id);
    }

}

class ChatMessageComponent extends Component<{msg: ChatMessageInterface, if_first: boolean}, {}> {
    constructor(props: {msg: ChatMessageInterface, if_first: boolean}) {
        super(props)
    }

    render() {
        return (
            <div className={`chat-message ${this.props.if_first ? "" : "hide"}`}>
                <span>{this.props.msg.name.toUpperCase() + ": " + this.props.msg.msg}</span>
            </div>
        )
    }
}