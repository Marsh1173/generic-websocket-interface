import { Schema } from "../../network/jsonvalidation/Schema";
import { UserAuthenticationMsgEnum } from "./AuthenticationApi";

export class UserAttemptLoginMsg {
  constructor(
    public readonly user_id: string,
    public readonly password: string
  ) {}
  public readonly type = UserAuthenticationMsgEnum.AttemptLoginMsg;
}

export const UserAttemptLoginMsgSchema: Schema = {
  type: "literally_typed_object",
  attributes: [
    { type: "attribute", key: "user_id", type_schema: { type: "string" } },
    { type: "attribute", key: "password", type_schema: { type: "string" } },
  ],
  literal_value: {
    type: "enum_literal",
    num: UserAuthenticationMsgEnum.AttemptLoginMsg,
  },
};
