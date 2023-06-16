import { UserData } from "../../../../model/user/UserData";

export interface SuccessfulAuthenticationMsg {
  type: "SuccessfulAuthenticationMsg";
  user_data: UserData;
}
