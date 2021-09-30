import { DataManager } from "./data/dataManager.js";
import { DomHelper } from "./helpers/domHelper.js";
import { UIManager } from "./ui/uiManager.js";
import { PolicyView } from "./ui/views/policyView.js";
import { UserView } from "./ui/views/userView.js";
import { VehicleView } from "./ui/views/vehicleView.js";

export class InsuranceCompany {
  #uiManager;
  #userView;
  #policyView;
  #vehicleView;
  #dataManager;
  constructor() {
    this.#uiManager = new UIManager(
      DomHelper.createAndAppendElement(document.body, "div")
    );

    this.#dataManager = new DataManager();

    this.#userView = new UserView(
      this.#dataManager.createUser,
      this.#dataManager.updateUser,
      this.#dataManager.deleteUser,
      this.#dataManager.getUser,
      this.#dataManager.getAllUniqueBirthNumbers
    );
    this.#vehicleView = new VehicleView(
      this.#dataManager.createVehicle,
      this.#dataManager.updateVehicle,
      this.#dataManager.deleteVehice,
      this.#dataManager.getVehicle,
      this.#dataManager.getAllBodyIds,
      this.#dataManager.getAllUniqueBirthNumbers
    );
    this.#policyView = new PolicyView(
      this.#dataManager.createPolicy,
      this.#dataManager.updatePolicy,
      this.#dataManager.deletePolicy,
      this.#dataManager.getPolicy,
      this.#dataManager.getAllBodyIds,
      this.#dataManager.getAllPolicyNumbers
    );
  }

  async start() {
    await this.#uiManager.appendPannel(this.#userView);
    this.#uiManager.appendTable(this.#userView);
    await this.#uiManager.appendPannel(this.#vehicleView);
    this.#uiManager.appendTable(this.#vehicleView);
    await this.#uiManager.appendPannel(this.#policyView);
    this.#uiManager.appendTable(this.#policyView);
  }
}
