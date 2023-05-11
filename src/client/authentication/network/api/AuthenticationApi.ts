import { FailureMsg } from "../../../network/api/Failure";
import { SuccessfulAuthenticationMsg } from "./SuccessfulAuthentication";

export type ServerAuthenticationMsg = FailureMsg | SuccessfulAuthenticationMsg;
