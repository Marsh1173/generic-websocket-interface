import { JsonParser } from "../../network/jsonvalidation/JsonParser";

export enum UserAuthMenuMsgEnum {
  AttemptLoginMsg,
  AttemptRegisterMsg,
}

export type UserAuthMenuMsg = never;

export const UserAuthMenuMsgParser = new JsonParser<UserAuthMenuMsg>({
  type: "any",
  options: [],
});
