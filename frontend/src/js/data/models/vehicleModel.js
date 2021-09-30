export class VehicleModel {
  #bodyId;
  #brand;
  #model;
  #color;
  #yearOfManufacuture;
  #licencePlate;
  #engineVolume;
  #userUniqueBirthNumber;
  constructor(
    bodyId,
    brand,
    model,
    color,
    yearOfManufacture,
    licencePlate,
    engineVolume,
    userUniqueBirthNumber
  ) {
    this.#bodyId = bodyId;
    this.#brand = brand;
    this.#model = model;
    this.#color = color;
    this.#yearOfManufacuture = yearOfManufacture;
    this.#licencePlate = licencePlate;
    this.#engineVolume = engineVolume;
    this.#userUniqueBirthNumber = userUniqueBirthNumber;
  }

  get bodyId() {
    return this.#bodyId;
  }
  get brand() {
    return this.#brand;
  }

  get model() {
    return this.#model;
  }

  get color() {
    return this.#color;
  }

  get yearOfManufacture() {
    return this.#yearOfManufacuture;
  }

  get licencePlate() {
    return this.#licencePlate;
  }

  get engineVolume() {
    return this.#engineVolume;
  }

  get userUniqueBirthNumber() {
    return this.#userUniqueBirthNumber;
  }
}
