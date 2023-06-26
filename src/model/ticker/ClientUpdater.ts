import { Singleton } from "../utils/Singleton";
import { ClientTicker } from "./ClientTicker";
import { ITicker } from "./Ticker";
import { Updater } from "./Updater";

@Singleton
class ClientUpdater extends Updater {
  protected readonly ticker: ITicker;
  constructor() {
    super();

    this.ticker = new ClientTicker(this.updatings);
  }
}
