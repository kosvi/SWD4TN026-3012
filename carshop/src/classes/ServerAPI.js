import { serverSettings } from "../config/serverSettings.js";
import { fuels } from "../config/fuels.js";

export class ServerAPI {
    static async postCar(car) {
        if (!ServerAPI.checkIfCarIsOk(car)) {
            // car is not a valid car
            return false;
        }
        try {
            const response = await fetch(serverSettings.urlBase, {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json',
                },
                body: JSON.stringify(car),
            });
            return true;
        } catch (error) {
            console.log("ServerApi.postCar(): " + error);
            return false;
        }
    }

    static async fetchAllCars() {
        try {
            const response = await fetch(serverSettings.urlBase);
            const responseJson = await response.json();
            return responseJson._embedded.cars;
        } catch (error) {
            console.log("ServerApi.fetchAllCars(): " + error);
            return null;
        }
    }

    static async getSingleCar(id) {
        try {
            const response = await fetch(serverSettings.urlBase + "/" + id);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log("ServerApi.getSingleCar(): " + error);
            return null;
        }
    }

    static async deleteCar(id) {
        console.log(serverSettings.urlBase + "/" + id);
        return true;
        try {
            const response = await fetch(serverSettings.urlBase + "/" + id, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
            });
            return true;
        } catch (error) {
            console.log("ServerApi.deleteCar(): " + error);
            return false;
        }
    }

    static async updateCar(id, car) {
        if (!ServerAPI.checkIfCarIsOk(car)) {
            // car is not a valid car
            return false;
        }
        try {
            const response = await fetch(serverSettings.urlBase + "/" + id, {
                method: 'PUT',
                header: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(car),
            });
            return true;
        } catch (error) {
            console.log("ServerApi.updateCar(): " + error);
            return false;
        }
    }

    static checkIfCarIsOk(car) {
        let keys = ['brand', 'model', 'color', 'fuel', 'year', 'price'];
        for (let i = 0; i < keys.length; i++) {
            if (!car.hasOwnProperty(keys[i])) {
                // key does not exist
                return false;
            }
        }
        // keys exist, ok
        if (car.brand.length < serverSettings.brandMinLength) {
            return false;
        }
        if (car.model.length < serverSettings.modelMinLength) {
            return false;
        }
        // I could check the fuel here also!
        // brand and model are ok
        if (isNaN(car.year) || isNaN(car.price)) {
            return false;
        }
        return true;
    }
}
