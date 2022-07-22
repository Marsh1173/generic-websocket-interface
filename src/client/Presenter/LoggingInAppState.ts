import { LoginServerTalkerObserver } from "../Model/Network/LoginServerTalkerObserver";
import { ServerTalkerInterface } from "../Model/Network/ServerTalker";
import { AppStateType, ClientApp } from "./App";
import { AppState } from "./AppState";

export interface LoggingInPresenter {
    on_attempt_login: (name: string, password: string, enable_callback: () => void) => void;
    on_attempt_register: (name: string, password: string, confirm_password: string, enable_callback: () => void) => void;
    request_local_account_info: () => Promise<{name: string, password: string}>;
}

export class LoggingInAppState extends AppState implements LoggingInPresenter {
    public readonly state_type: AppStateType = "logging-in";
    private readonly login_server_talker_observer: LoginServerTalkerObserver;

    constructor(app: ClientApp, private readonly server_talker: ServerTalkerInterface) {
        super(app);

        this.login_server_talker_observer = new LoginServerTalkerObserver();
        this.server_talker.add_server_talker_observer(this.login_server_talker_observer)
    }

    public on_attempt_login = (name: string, password: string, enable_callback: () => void) => {
        
    }

    public on_attempt_register = (name: string, password: string, confirm_password: string, enable_callback: () => void) => {
        
    }

    public request_local_account_info = () => {
        return new Promise<{name: string, password: string}>((resolve, reject) => resolve({name: "test", password: "test2"}));
    }
}
