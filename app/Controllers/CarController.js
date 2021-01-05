import { ProxyState } from "../AppState.js";
import { carService } from "../Services/CarService.js";


//Private
function _draw() {
  let template = ""
  ProxyState.cars.forEach(c => template += c.Template)
  document.getElementById("cars").innerHTML = template
}

//Public
export default class CarController {
  constructor() {
    ProxyState.on("cars", _draw);
    _draw()
  }

  postCar(e) {
    e.preventDefault()
    let formData = e.target
    let newCar = {
      make: formData.make.value,
      model: formData.model.value,
      year: formData.year.value,
      imgUrl: formData.imgUrl.value,
      price: formData.price.value,
      description: formData.description.value
    }
    carService.postCar(newCar)
    formData.reset()
  }

  editCar(e, carId) {
    e.preventDefault()
    let formData = e.target
    let editedCar = {
      make: formData.make.value,
      model: formData.model.value,
      year: formData.year.value,
      imgUrl: formData.imgUrl.value,
      price: formData.price.value,
      description: formData.description.value,
      _id: carId
    }
    // @ts-ignore
    $('#editCarModal-' + carId).modal('toggle')
    carService.editCar(editedCar)
  }

  deleteCar(carId) {
    carService.deleteCar(carId)
  }

}
