import { UserModel } from "./models/userModel.js";
import { PolicyModel } from "./models/policyModel.js";
import { VehicleModel } from "./models/vehicleModel.js";
import { serverUrl } from "../../constants.js";

export class DataManager {
  constructor() {}

  async createUser(user) {
    const response = await fetch(serverUrl + "/Users/CreateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.ok;
  }

  async updateUser(user) {
    const response = await fetch(serverUrl + "/Users/UpdateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.ok;
  }

  async deleteUser(uniqueBirthNumber) {
    const response = await fetch(
      serverUrl +
        "/Users/DeleteUserById?UniqueBirthNumber=" +
        uniqueBirthNumber,
      {
        method: "DELETE",
      }
    );
    return response.ok;
  }

  async getAllUniqueBirthNumbers() {
    const response = await fetch(
      serverUrl + "/Users/GetAllUniqueBirthNumbers",
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();
    return responseJson;
  }

  async getAllUsers() {
    return ["1", "2", "3", "12  "];
  }

  async getUser(uniqueBirthNumber) {
    const response = await fetch(
      serverUrl + "/Users/GetUserById?UniqueBirthNumber=" + uniqueBirthNumber,
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();
    return responseJson;
  }

  async createVehicle() {
    return true;
  }

  async updateVehicle() {
    return true;
  }

  async deleteVehice() {
    return true;
  }

  async getAllBodyIds() {
    return ["1", "2", "3", "7"];
  }

  async getAllVehicles() {
    return ["1", "2", "3", "55"];
  }

  async getVehicle() {
    return new VehicleModel("A", "B", "C", "D", "E", "F", "G", "12");
  }

  async createPolicy() {
    return true;
  }

  async updatePolicy() {
    return true;
  }

  async deletePolicy() {
    return true;
  }

  async getAllPolicyNumbers() {
    return ["1", "2", "3", "3"];
  }

  async getAllPolicies() {
    return ["1", "2", "3", "3"];
  }

  async getPolicy() {
    return new PolicyModel("A", "B", "C", "D", "E");
  }
}
