import { ProxyState } from "../AppState.js";
import Car from "../Models/Car.js";
import { api } from '../Services/AxiosService.js';

class CarService {
  constructor() {
    this.getCars()
  }
  getCars() {
    api.get("cars").then(res => {
      ProxyState.cars = res.data.data.map(rawCarData => new Car(rawCarData))
    }).catch(err => console.error(err))
  }

  postCar(newCar) {
    api.post("car", newCar).then(res => {
      this.getCars()
    }).catch(err => console.error(err))
  }
  editCar(editedCar) {
    api.put("cars/" + editedCar._id, editedCar).then(res => {
      //TODO add this to page without reloading
      this.getCars()
    }).catch(err => console.error(err))
  }

  deleteCar(carId) {
    api.delete("cars/" + carId).then(res => {
      console.log(res.data);
      this.getCars()
    }).catch(err => console.error(err))
  }
}

export const carService = new CarService();

