import { DomHelper } from "../../helpers/domHelper.js";
import { ErrorHelper } from "../../helpers/errorHelper.js";
export class BaseView {
  #title;
  _tableHeaders;
  _createCallback;
  _updateCallback;
  _removeCallback;
  _updateSelectCallback;
  _table;
  constructor(
    title,
    tableHeaders,
    createCallback,
    updateCallback,
    removeCallback,
    updateSelectCallback
  ) {
    this._createCallback = createCallback;
    this._updateCallback = updateCallback;
    this._removeCallback = removeCallback;
    this._tableHeaders = tableHeaders;
    this._updateSelectCallback = updateSelectCallback;
    this.#title = title;
    if (this.constructor == BaseView) throw new Error("Abstract class!");
  }

  getPanel() {
    const panelDiv = document.createElement("div");
    panelDiv.className = "panel-div";
    const titleLabel = DomHelper.createAndAppendElement(panelDiv, "label");
    titleLabel.innerHTML = this.#title;
    const innerContainerDiv = DomHelper.createAndAppendElement(panelDiv, "div");
    innerContainerDiv.className = "inner-container-div";
    innerContainerDiv.appendChild(this._getCreateDiv());
    innerContainerDiv.appendChild(this._getUpdateDiv());
    innerContainerDiv.appendChild(this._getDeleteDiv());
    return panelDiv;
  }

  getTable() {
    const tableDiv = document.createElement("div");

    const table = document.createElement("table");

    const columnHeaders = document.createElement("tr");
    for (let j = 0; j < this._tableHeaders.length; j++) {
      const th = document.createElement("th");
      const thText = document.createTextNode(this._tableHeaders[j]);
      th.appendChild(thText);
      columnHeaders.appendChild(th);
    }

    table.appendChild(columnHeaders);

    table.style.borderSpacing = "5px";

    const caption = document.createElement("caption");
    caption.textContent = this.#title;

    table.caption = caption;

    this._table = table;
    tableDiv.appendChild(table);
    return tableDiv;
  }

  _getCreateDiv() {
    ErrorHelper.unimplementedError("_getCreateDiv()");
  }
  _getUpdateDiv() {
    ErrorHelper.unimplementedError("_getUpdateDiv()");
  }
  _getDeleteDiv() {
    ErrorHelper.unimplementedError("_getDeletDiv()");
  }
  _appendLabelAndInput(div, inputPlacceholder) {
    const label = DomHelper.createAndAppendElement(div, "label");
    const input = DomHelper.createAndAppendElement(div, "input");
    input.placeholder = inputPlacceholder;
    label.innerHTML = inputPlacceholder + ":";
    label.className = "label-input";
    return input;
  }

  _appendLabelAndSelect(div, selectPlaceholder, onSelectedCallback) {
    const label = DomHelper.createAndAppendElement(div, "label");
    const select = DomHelper.createAndAppendElement(div, "select");
    const placeholder = DomHelper.createAndAppendElement(select, "option");
    placeholder.innerHTML = selectPlaceholder;
    placeholder.disabled = true;

    if (onSelectedCallback != null)
      select.onchange = async () => {
        await onSelectedCallback();
      };

    label.className = "label-input";
    label.innerHTML = selectPlaceholder + ":";
    return select;
  }

  _appendTitleLabel(div, title) {
    const titleLabel = DomHelper.createAndAppendElement(div, "label");
    titleLabel.innerHTML = title;
    titleLabel.className = "label-title";
  }

  _createCudDiv() {
    const cudDiv = document.createElement("div");
    cudDiv.className = "cud-div";
    return cudDiv;
  }

  _appendButton(div, buttonText, onClickCallback) {
    const button = DomHelper.createAndAppendElement(div, "button");
    button.innerHTML = buttonText;

    button.onclick = async () => {
      await onClickCallback();
    };
  }
  async populateSelectElements() {
    ErrorHelper.unimplementedError("_populateSelectElements()");
  }
}
