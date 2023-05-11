import { Singleton } from "../../model/utils/Singleton";
import { safe_get_element_by_selector } from "../utils/SafeGetElementBySelector";

import "./GrowlStyles.less";

@Singleton
export class GrowlService {
  private growl_container: Element;

  private readonly config = {
    GROWL_FADE_DURATION: 4,
    GROWL_COUNT_LIMIT: 3,
  };

  constructor() {
    this.growl_container = safe_get_element_by_selector("#growl-dom");
  }

  public put_growl(msg: string, type: "bad" | "neutral" | "good" = "neutral") {
    let growl_component = document.createElement("div");
    growl_component.classList.add("growl");
    growl_component.classList.add(type);

    growl_component.style.animationDuration =
      this.config.GROWL_FADE_DURATION.toString() + "s";

    let growl_text_component = document.createElement("span");
    growl_text_component.innerText = msg;

    growl_component.appendChild(growl_text_component);
    this.growl_container.prepend(growl_component);

    while (
      this.growl_container.children.length > this.config.GROWL_COUNT_LIMIT &&
      this.growl_container.lastChild
    ) {
      this.growl_container.removeChild(this.growl_container.lastChild);
    }

    setTimeout(() => {
      growl_component.remove();
    }, this.config.GROWL_FADE_DURATION * 1000);
  }
}
