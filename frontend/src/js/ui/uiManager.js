import { BaseView } from "./views/baseView.js";

export class UIManager {
  #divForDrawing;
  constructor(divForDrawing) {
    this.#divForDrawing = divForDrawing;
    this.#divForDrawing.className = "container-div";
  }

  async appendPannel(baseView) {
    if (!baseView instanceof BaseView)
      throw new Error("BaseView parametar needed!");

    this.#divForDrawing.appendChild(baseView.getPanel());
    await baseView.populateSelectElements();
  }

  appendTable(baseView) {
    if (!baseView instanceof BaseView)
      throw new Error("BaseView parametar needed!");

    this.#divForDrawing.appendChild(baseView.getTable());
  }
}
