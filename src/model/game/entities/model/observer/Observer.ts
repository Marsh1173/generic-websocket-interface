import { Id } from "../../../../utils/Id";

export interface Observer {
  id: Id;
  on_deconstruct?(): void;
}
