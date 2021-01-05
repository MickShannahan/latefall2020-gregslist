import { ProxyState } from "../AppState.js";
import Car from "../Models/Car.js";
import { api } from '../Services/AxiosService.js';

class CarService {
  constructor() {
    this.getCars()
  }
  async getCars() {
let res = await api.get("cars")
console.log(res.data.data)
ProxyState.cars = res.data.data.map(rawCarData => new Car(rawCarData))
  }

  async postCar(newCar) {
    let res = await api.post("cars", newCar)
    console.log(res.data)
    ProxyState.cars = [...ProxyState.cars, new Car(res.data.data)]
  }
  async editCar(editedCar) {
    let res = await api.put("cars/" + editedCar._id, editedCar)
    console.log(res.data)
    let indexToRemove = ProxyState.cars.findIndex(c => c._id == editedCar.id)
    ProxyState.cars = ProxyState.cars.splice(indexToRemove, 1, editedCar)
  }

  async deleteCar(carId) {
      let res = await api.delete("cars/" + carId)
      console.log(res.data)
      ProxyState.cars.filter(c => c._id != carId)
  }
}

export const carService = new CarService();

