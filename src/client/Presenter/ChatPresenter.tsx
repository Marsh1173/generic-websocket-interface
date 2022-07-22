import React from "react";
import { createRoot } from "react-dom/client";
import { ChatPartial } from "../View/Partials/ChatPartial";

export interface ChatPresenterInterface {
    readonly put_chat: (name: string, msg: string, color?: string) => void;
    readonly clear_chat: () => void;
    readonly add_chat_observer: (observer: ChatObserverInterface) => void;
    readonly remove_chat_observer: (id: number) => void;
}

export interface ChatObserverInterface {
    readonly id: number;
    readonly update: (messages: ChatMessageInterface[]) => void;
}

export interface ChatMessageInterface {
    name: string;
    msg: string;
    color: string;
}

const CHAT_CACHE_LIMIT: number = 30

export class ChatPresenter implements ChatPresenterInterface {
    private messages: ChatMessageInterface[] = [];
    private chat_observers: Map<number, ChatObserverInterface> = new Map<number, ChatObserverInterface>();

    constructor() {
        let dom_container = document.querySelector("#chatDom");
        let root = createRoot(dom_container!);
        
        root.render(<ChatPartial chat_presenter={this}/>);
    }

    public put_chat = (name: string, msg: string, color: string = "white") => {

        if (this.messages.unshift({name, msg, color}) > CHAT_CACHE_LIMIT) {
            this.messages = this.messages.slice(0, CHAT_CACHE_LIMIT);
        }

        this.update_observers();
    }

    public clear_chat = () =>  {
        this.messages = [];
        this.update_observers();
    }

    public add_chat_observer = (observer: ChatObserverInterface) => {
        this.chat_observers.set(observer.id, observer);
        observer.update(this.messages);
    }

    public remove_chat_observer = (id: number) => {
        this.chat_observers.delete(id);
    }

    private update_observers() {
        this.chat_observers.forEach((observer) => {
            observer.update(this.messages);
        });
    }

}