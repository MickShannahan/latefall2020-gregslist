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
      console.log(res.data.data)
    }).catch(err => console.error(err))
  }

  postCar(newCar) {
    api.post("cars", newCar).then(res => {
      ProxyState.cars = [...ProxyState.cars, new Car(res.data.data)]
    }).catch(err => console.error(err))
  }
  editCar(editedCar) {
    api.put("cars/" + editedCar._id, editedCar).then(res => {
      let indexToRemove = ProxyState.cars.findIndex(c => c._id == editedCar.id)
      ProxyState.cars = ProxyState.cars.splice(indexToRemove, 1, editedCar)
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

