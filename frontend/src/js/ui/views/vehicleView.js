import { DomHelper } from "../../helpers/domHelper.js";
import { BaseView } from "./baseView.js";

export class VehicleView extends BaseView {
  #createBodyNumberInput;
  #createBrandInput;
  #createModelInput;
  #createColorInput;
  #createYearOfManifactureInput;
  #createLicencePlateInput;
  #createEngineVolumeInput;
  #updateBrandInput;
  #updateModelInput;
  #updateColorInput;
  #updateYearOfManifactureInput;
  #updateLicencePlateInput;
  #updateEngineVolumeInput;
  #updateBodyNumberSelect;
  #deleteBodyNumberSelect;
  #createUniqueBirthNumberSelect;
  #updateUniqueBirthNumberSelect;
  #updateAndDeleteBodyIdSelectPopulateCallback;
  #createAndUpdateUniqueBirthNumberSelectPopulateCallback;
  constructor(
    createCallback,
    updateCallback,
    removeCallback,
    updateSelectCallback,
    updateAndDeleteBodyIdSelectPopulateCallback,
    createAndUpdateUniqueBirthNumberSelectPopulateCallback
  ) {
    super(
      "Vehicles",
      [
        "Body id",
        "Brand",
        "Model",
        "Color",
        "Year of manufacture",
        "Licence plate",
        "Engine volume",
      ],
      createCallback,
      updateCallback,
      removeCallback,
      updateSelectCallback
    );
    this.#updateAndDeleteBodyIdSelectPopulateCallback =
      updateAndDeleteBodyIdSelectPopulateCallback;
    this.#createAndUpdateUniqueBirthNumberSelectPopulateCallback =
      createAndUpdateUniqueBirthNumberSelectPopulateCallback;
  }
  _getCreateDiv() {
    const createDiv = this._createCudDiv();

    this._appendTitleLabel(createDiv, "Create vehicle");

    this.#createBodyNumberInput = this._appendLabelAndInput(
      createDiv,
      "Body id"
    );

    this.#createBrandInput = this._appendLabelAndInput(createDiv, "Brand");

    this.#createModelInput = this._appendLabelAndInput(createDiv, "Model");

    this.#createColorInput = this._appendLabelAndInput(createDiv, "Color");

    this.#createYearOfManifactureInput = this._appendLabelAndInput(
      createDiv,
      "Year of manifacture"
    );

    this.#createLicencePlateInput = this._appendLabelAndInput(
      createDiv,
      "Licence plate"
    );

    this.#createEngineVolumeInput = this._appendLabelAndInput(
      createDiv,
      "Engine volume"
    );

    this.#createUniqueBirthNumberSelect = this._appendLabelAndSelect(
      createDiv,
      "Owner"
    );

    const createCallback = async () => {
      const createResponse = await this._createCallback();
      if (createResponse) {
        this.populateSelectElements();
        this.#createBrandInput.value = "";
        this.#createModelInput.value = "";
        this.#createColorInput.value = "";
        this.#createYearOfManifactureInput.value = "";
        this.#createLicencePlateInput.value = "";
        this.#createEngineVolumeInput.value = "";
        this.#createBodyNumberInput.value = "";
      } else alert("Fetching error!");
    };
    this._appendButton(createDiv, "Create", createCallback);
    return createDiv;
  }

  _getUpdateDiv() {
    const updateDiv = this._createCudDiv();

    this._appendTitleLabel(updateDiv, "Update vehicle");

    const onSelectedCallback = async () => {
      const vehicle = await this._updateSelectCallback();
      if (vehicle) {
        await this.populateSelectElements();
        this.#updateBrandInput.value = vehicle.brand;
        this.#updateModelInput.value = vehicle.model;
        this.#updateColorInput.value = vehicle.color;
        this.#updateYearOfManifactureInput.value = vehicle.yearOfManufacture;
        this.#updateLicencePlateInput.value = vehicle.licencePlate;
        this.#updateEngineVolumeInput.value = vehicle.engineVolume;
        this.#updateUniqueBirthNumberSelect.value =
          vehicle.userUniqueBirthNumber;
      } else alert("Fetching error!");
    };

    this.#updateBodyNumberSelect = this._appendLabelAndSelect(
      updateDiv,
      "Body id",
      onSelectedCallback
    );

    this.#updateBrandInput = this._appendLabelAndInput(updateDiv, "Brand");

    this.#updateModelInput = this._appendLabelAndInput(updateDiv, "Model");

    this.#updateColorInput = this._appendLabelAndInput(updateDiv, "Color");

    this.#updateYearOfManifactureInput = this._appendLabelAndInput(
      updateDiv,
      "Year of manifacture"
    );

    this.#updateLicencePlateInput = this._appendLabelAndInput(
      updateDiv,
      "Licence plate"
    );

    this.#updateEngineVolumeInput = this._appendLabelAndInput(
      updateDiv,
      "Engine volume"
    );

    this.#updateUniqueBirthNumberSelect = this._appendLabelAndSelect(
      updateDiv,
      "Owner"
    );

    const updateCallback = async () => {
      const updateResponse = await this._updateCallback();
      if (updateResponse) {
        await this.populateSelectElements();
        this.#updateBrandInput.value = "";
        this.#updateModelInput.value = "";
        this.#updateColorInput.value = "";
        this.#updateYearOfManifactureInput.value = "";
        this.#updateLicencePlateInput.value = "";
        this.#updateEngineVolumeInput.value = "";
      } else alert("Fetching error");
    };
    this._appendButton(updateDiv, "Create", updateCallback);

    return updateDiv;
  }
  _getDeleteDiv() {
    const deleteDiv = this._createCudDiv();

    this._appendTitleLabel(deleteDiv, "Delete vehicle");

    this.#deleteBodyNumberSelect = this._appendLabelAndSelect(
      deleteDiv,
      "Body id"
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
    const bodyIdOptions =
      await this.#updateAndDeleteBodyIdSelectPopulateCallback();

    const uniqueBirthNumberOptions =
      await this.#createAndUpdateUniqueBirthNumberSelectPopulateCallback();

    DomHelper.clearSelectAndSetPlaceholder(
      this.#createUniqueBirthNumberSelect,
      "Owner"
    );

    DomHelper.clearSelectAndSetPlaceholder(
      this.#updateUniqueBirthNumberSelect,
      "Owner"
    );

    DomHelper.clearSelectAndSetPlaceholder(
      this.#deleteBodyNumberSelect,
      "Body id"
    );

    DomHelper.clearSelectAndSetPlaceholder(
      this.#updateBodyNumberSelect,
      "Body id"
    );

    DomHelper.populateSelect(this.#updateBodyNumberSelect, bodyIdOptions);
    DomHelper.populateSelect(
      this.#updateUniqueBirthNumberSelect,
      uniqueBirthNumberOptions
    );
    DomHelper.populateSelect(this.#deleteBodyNumberSelect, bodyIdOptions);
    DomHelper.populateSelect(
      this.#createUniqueBirthNumberSelect,
      uniqueBirthNumberOptions
    );
  }
}
