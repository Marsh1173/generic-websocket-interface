import { JsonParser } from "../../network/jsonvalidation/JsonParser";
import { UserAttemptLoginMsg, UserAttemptLoginMsgSchema } from "./AttemptLogin";
import {
  UserAttemptRegisterMsg,
  UserAttemptRegisterMsgSchema,
} from "./AttemptRegister";

export const enum UserAuthenticationMsgEnum {
  AttemptLoginMsg,
  AttemptRegisterMsg,
}

export type UserAuthenticationMsg =
  | UserAttemptLoginMsg
  | UserAttemptRegisterMsg;

export const UserAuthenticationMsgParser =
  new JsonParser<UserAuthenticationMsg>({
    type: "any",
    options: [UserAttemptLoginMsgSchema, UserAttemptRegisterMsgSchema],
  });
