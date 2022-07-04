import { AppStateType, ClientApp } from "./App";

export abstract class AppState {
  public abstract readonly state_type: AppStateType;

  constructor(protected readonly app: ClientApp) {}
}
