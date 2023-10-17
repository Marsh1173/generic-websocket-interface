import { DeadUserState } from "./states/DeadUserState";
import { LoadingUserState } from "./states/LoadingUserState";
import { LocalPlayerState } from "./states/playerstate/LocalPlayerState";
import { PlayerState, PlayerStateData } from "./states/playerstate/PlayerState";

export interface IUserState {
  leave_state(): void;
}

export type UserState = LoadingUserState | PlayerState | DeadUserState;

export type LocalUserState = LoadingUserState | LocalPlayerState | DeadUserState;

export type UserStateData = PlayerStateData;
