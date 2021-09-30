import { DomHelper } from "../../helpers/domHelper.js";
import { BaseView } from "./baseView.js";

export class PolicyView extends BaseView {
  #createPolicyNumberInput;
  #createSigningDateInput;
  #createValidUntillInput;
  #createPolicyPriceInput;
  #createVehicleSelect;
  #updateSigningDateInput;
  #updateValidUntillInput;
  #updatePolicyPriceInput;
  #updateVehicleInput;
  #updatePolicyNumberSelect;
  #deletePolicyNumberSelect;
  #createVehicleSelectPopulateCallback;
  #updateAndDeletePolicyNumberSelectPopulateCallback;
  constructor(
    createCallback,
    updateCallback,
    removeCallaback,
    updateSelectCallback,
    createVehicleSelectPopulacteCallback,
    updateAndDeletePolicyNumberSelectPopulateCallback
  ) {
    super(
      "Policies",
      ["Policy number", "Vehicle body id", "Signing date", "Price"],
      createCallback,
      updateCallback,
      removeCallaback,
      updateSelectCallback
    );
    this.#createVehicleSelectPopulateCallback =
      createVehicleSelectPopulacteCallback;
    this.#updateAndDeletePolicyNumberSelectPopulateCallback =
      updateAndDeletePolicyNumberSelectPopulateCallback;
  }

  _getCreateDiv() {
    const createDiv = this._createCudDiv();

    this._appendTitleLabel(createDiv, "Create policy");

    this.#createPolicyNumberInput = this._appendLabelAndInput(
      createDiv,
      "Policy number"
    );

    this.#createSigningDateInput = this._appendLabelAndInput(
      createDiv,
      "Signing date"
    );

    this.#createValidUntillInput = this._appendLabelAndInput(
      createDiv,
      "Valid untill"
    );

    this.#createPolicyPriceInput = this._appendLabelAndInput(
      createDiv,
      "Price"
    );

    this.#createVehicleSelect = this._appendLabelAndSelect(
      createDiv,
      "Vehicle"
    );

    const createCallback = async () => {
      const creationResponse = await this._createCallback();
      if (creationResponse) {
        this.#createPolicyNumberInput.value = "";
        this.#createPolicyPriceInput.value = "";
        this.#createSigningDateInput.value = "";
        this.#createValidUntillInput.value = "";
        await this.populateSelectElements();
      } else alert("Fetching error!");
    };
    this._appendButton(createDiv, "Create", createCallback);

    return createDiv;
  }
  _getUpdateDiv() {
    const updateDiv = this._createCudDiv();

    this._appendTitleLabel(updateDiv, "Create policy");

    const onSelectedCallback = async () => {
      const policy = await this._updateSelectCallback();

      if (policy) {
        this.#updateVehicleInput.value = policy.vehicleBodyId;
        this.#updateSigningDateInput.value = policy.signingDate;
        this.#updatePolicyPriceInput.value = policy.price;
        this.#updateValidUntillInput.value = policy.validUntill;
      } else alert("Fetching error!");
    };

    this.#updatePolicyNumberSelect = this._appendLabelAndSelect(
      updateDiv,
      "Policy number",
      onSelectedCallback
    );

    this.#updateSigningDateInput = this._appendLabelAndInput(
      updateDiv,
      "Signing date"
    );

    this.#updateSigningDateInput.disabled = true;

    this.#updateValidUntillInput = this._appendLabelAndInput(
      updateDiv,
      "Valid untill"
    );

    this.#updatePolicyPriceInput = this._appendLabelAndInput(
      updateDiv,
      "Price"
    );

    this.#updateVehicleInput = this._appendLabelAndInput(updateDiv, "Vehicle");

    this.#updateVehicleInput.disabled = true;

    const updateCallback = async () => {
      const updateResponse = await this._updateCallback();

      if (updateResponse) {
        await this.populateSelectElements();
        this.#updateVehicleInput.value = "";
        this.#updateSigningDateInput.value = "";
        this.#updatePolicyPriceInput.value = "";
        this.#updateValidUntillInput.value = "";
      } else alert("Fetching error!");
    };

    this._appendButton(updateDiv, "Update", updateCallback);

    return updateDiv;
  }
  _getDeleteDiv() {
    const deleteDiv = this._createCudDiv();

    this._appendTitleLabel(deleteDiv, "Delete vehicle");

    this.#deletePolicyNumberSelect = this._appendLabelAndSelect(
      deleteDiv,
      "Policy number"
    );
    const deleteCallback = async () => {
      const deleteResponse = await this._removeCallback();
      if (deleteResponse) {
        await this.populateSelectElements();
      } else alert("Fetching error!");
    };
    this._appendButton(deleteDiv, "Delete", deleteCallback);

    return deleteDiv;
  }
  async populateSelectElements() {
    const policyNumberOptions =
      await this.#updateAndDeletePolicyNumberSelectPopulateCallback();
    const vehicleIdOptions = await this.#createVehicleSelectPopulateCallback();

    DomHelper.clearSelectAndSetPlaceholder(
      this.#createVehicleSelect,
      "Vehicle"
    );

    DomHelper.clearSelectAndSetPlaceholder(
      this.#deletePolicyNumberSelect,
      "Policy number"
    );

    DomHelper.clearSelectAndSetPlaceholder(
      this.#updatePolicyNumberSelect,
      "Policy number"
    );

    DomHelper.populateSelect(
      this.#deletePolicyNumberSelect,
      policyNumberOptions
    );
    DomHelper.populateSelect(
      this.#updatePolicyNumberSelect,
      policyNumberOptions
    );
    DomHelper.populateSelect(this.#createVehicleSelect, vehicleIdOptions);
  }
}
