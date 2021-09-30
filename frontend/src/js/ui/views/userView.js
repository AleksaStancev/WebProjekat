import { UserModel } from "../../data/models/userModel.js";
import { DomHelper } from "../../helpers/domHelper.js";
import { BaseView } from "./baseView.js";
export class UserView extends BaseView {
  #createNameInput;
  #createSurnameInput;
  #createCityInput;
  #createStreetInput;
  #createStreetNumberInput;
  #createIdNumberInput;
  #createUniqueBirthNumberInput;
  #updateNameInput;
  #updateSurnameInput;
  #updateCityInput;
  #updateStreetInput;
  #updateStreetNumberInput;
  #updateIdNumberInput;
  #updateUniqueBirthNumberSelect;
  #deleteUniqueBirthNumberSelect;
  #updateAndDeleteUniqueBirthNumberSelectPopulateCallback;
  constructor(
    createCallback,
    updateCallback,
    removeCallback,
    updateSelectCallback,
    updateAnddeleteUniqueBirthNumberSelectPopulateCallback
  ) {
    super(
      "Users",
      [
        "Unique birth number",
        "Id number",
        "Name",
        "Surname",
        "City",
        "Street",
        "Street number",
      ],
      createCallback,
      updateCallback,
      removeCallback,
      updateSelectCallback
    );
    this.#updateAndDeleteUniqueBirthNumberSelectPopulateCallback =
      updateAnddeleteUniqueBirthNumberSelectPopulateCallback;
  }
  _getCreateDiv() {
    const createDiv = this._createCudDiv();

    this._appendTitleLabel(createDiv, "Create user");

    this.#createNameInput = this._appendLabelAndInput(createDiv, "Name");

    this.#createSurnameInput = this._appendLabelAndInput(createDiv, "Surname");

    this.#createCityInput = this._appendLabelAndInput(createDiv, "City");

    this.#createStreetInput = this._appendLabelAndInput(createDiv, "Street");

    this.#createStreetNumberInput = this._appendLabelAndInput(
      createDiv,
      "Street number"
    );

    this.#createIdNumberInput = this._appendLabelAndInput(
      createDiv,
      "Id number"
    );

    this.#createUniqueBirthNumberInput = this._appendLabelAndInput(
      createDiv,
      "Unique birth number"
    );

    const createCallback = async () => {
      const user = new UserModel(
        this.#createNameInput.value,
        this.#createSurnameInput.value,
        this.#createCityInput.value,
        this.#createStreetInput.value,
        this.#createStreetInput.value,
        this.#createIdNumberInput.value,
        this.#createUniqueBirthNumberInput.value
      );

      const creationResponse = await this._createCallback(user);
      if (creationResponse) {
        this.populateSelectElements();
        this.#createIdNumberInput.value = "";
        this.#createStreetInput.value = "";
        this.#createCityInput.value = "";
        this.#createStreetNumberInput.value = "";
        this.#createNameInput.value = "";
        this.#createSurnameInput.value = "";
        this.#createUniqueBirthNumberInput.value = "";
      } else alert("Fetching error!");
    };

    this._appendButton(createDiv, "Create", createCallback);

    return createDiv;
  }
  _getUpdateDiv() {
    const updateDiv = this._createCudDiv();

    this._appendTitleLabel(updateDiv, "Update user");

    const onSelectedCallback = async () => {
      const user = await this._updateSelectCallback(
        this.#updateUniqueBirthNumberSelect.value
      );
      if (user) {
        this.#updateIdNumberInput.value = user.idCardNumber;
        this.#updateStreetInput.value = user.street;
        this.#updateCityInput.value = user.city;
        this.#updateStreetNumberInput.value = user.streetNumber;
        this.#updateNameInput.value = user.name;
        this.#updateSurnameInput.value = user.surname;
      } else alert("Fetching error!");
    };

    this.#updateUniqueBirthNumberSelect = this._appendLabelAndSelect(
      updateDiv,
      "Unique birth number",
      onSelectedCallback
    );

    this.#updateNameInput = this._appendLabelAndInput(updateDiv, "Name");

    this.#updateSurnameInput = this._appendLabelAndInput(updateDiv, "Surname");

    this.#updateCityInput = this._appendLabelAndInput(updateDiv, "City");

    this.#updateStreetInput = this._appendLabelAndInput(updateDiv, "Street");

    this.#updateStreetNumberInput = this._appendLabelAndInput(
      updateDiv,
      "Street number"
    );

    this.#updateIdNumberInput = this._appendLabelAndInput(
      updateDiv,
      "Id number"
    );

    const updateCallback = async () => {
      const user = new UserModel(
        this.#updateNameInput.value,
        this.#updateSurnameInput.value,
        this.#updateCityInput.value,
        this.#updateStreetInput.value,
        this.#updateStreetInput.value,
        this.#updateIdNumberInput.value,
        this.#updateUniqueBirthNumberSelect.value
      );
      const updateResponse = await this._updateCallback(user);
      if (updateResponse) {
        await this.populateSelectElements();
        this.#updateIdNumberInput.value = "";
        this.#updateStreetInput.value = "";
        this.#updateCityInput.value = "";
        this.#updateStreetNumberInput.value = "";
        this.#updateNameInput.value = "";
        this.#updateSurnameInput.value = "";
      } else alert("Fetching error!");
    };
    this._appendButton(updateDiv, "Update", updateCallback);

    return updateDiv;
  }
  _getDeleteDiv() {
    const deleteDiv = this._createCudDiv();

    this._appendTitleLabel(deleteDiv, "Delete user");

    this.#deleteUniqueBirthNumberSelect = this._appendLabelAndSelect(
      deleteDiv,
      "Unique birth number"
    );

    const deleteCallback = async () => {
      const deleteResponse = await this._removeCallback(this.#deleteUniqueBirthNumberSelect.value);
      if (deleteResponse) {
        await this.populateSelectElements();
      } else alert("Fetching error!");
    };

    this._appendButton(deleteDiv, "Delete", deleteCallback);
    return deleteDiv;
  }

  async populateSelectElements() {
    const uniqueBirthNumberOptions =
      await this.#updateAndDeleteUniqueBirthNumberSelectPopulateCallback();

    DomHelper.clearSelectAndSetPlaceholder(
      this.#deleteUniqueBirthNumberSelect,
      "Unique birth number"
    );

    DomHelper.clearSelectAndSetPlaceholder(
      this.#updateUniqueBirthNumberSelect,
      "Unique birth number"
    );

    DomHelper.populateSelect(
      this.#deleteUniqueBirthNumberSelect,
      uniqueBirthNumberOptions
    );
    DomHelper.populateSelect(
      this.#updateUniqueBirthNumberSelect,
      uniqueBirthNumberOptions
    );
  }
}
