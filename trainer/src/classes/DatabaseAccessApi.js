import { databaseSettings } from "../config/databaseSettings.js";
import { Log } from "./Log.js";

export class DatabaseAccessApi {

    static async getCustomers() {
        const responseJson = await InternalMethods.getData(databaseSettings.customersUrl);
        if (responseJson != null) {
            return responseJson.content;
        }
        return null;
    }

    static async getCustomer(id) {
        const responseJson = await InternalMethods.getData(databaseSettings.customerUrl.replace("{id}", id));
        return responseJson;
    }

    static async getCustomerByUrl(url) {
        const responseJson = await InternalMethods.getData(url);
        return responseJson;
    }

    static async updateCustomerByCustomer(customer) {
        if (DatabaseObjectMethods.Validate.customerWithLink(customer)) {
            const status = await InternalMethods.putData(customer.links[0].href, customer);
            return status;
        }
        return false;
    }

    static async deleteCustomerWithUrl(url) {
        const status = await InternalMethods.deleteData(url);
        return status;
    }

    static async getTrainings() {
        const responseJson = await InternalMethods.getData(databaseSettings.fullTrainingsUrl);
        return responseJson;
    }

    static async getCustomerTrainings(id) {
        const responseJson = await InternalMethods.getData(databaseSettings.customerTrainingsUrl.replace("{id}", id));
        if (responseJson != null) {
            return responseJson.content;
        }
        return null;
    }

    static async addCustomerTraining(training) {
        if (DatabaseObjectMethods.Validate.training(training)) {
            const status = await InternalMethods.postData(databaseSettings.trainingsUrl, training);
            return status;
        }
        return false;
    }

    static async deleteTrainingWithUrl(url) {
        const status = await InternalMethods.deleteData(url);
        return status;
    }

    // Used to reset the database if needed
    static async resetDatabase() {
        const url = databaseSettings.baseUrl + "reset/";
        await InternalMethods.postData(url, {});
    }

}

export class DatabaseObjectMethods {

    static className = "DatabaseObjectMethods";

    // This is a nested class to hold all methods to extract data from database objects
    static Extract = class {

        static customerIdFromCustomer(customer) {
            try {
                const parts = customer.links[0].href.split("/customers/");
                return parts[1];
            } catch (error) {
                Log.writeLog(this.className + ".Extract.customerIdFromJson(): " + error, 1);
            }
        }
    }

    // This is a nested class to hold all methods to validate objects in database use
    static Validate = class {

        static customer(customer) {
            const keys = ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone', 'content'];
            for (let i = 0; i < keys.length; i++) {
                if (!customer.hasOwnProperty(keys[i])) {
                    // key does not exist
                    return false;
                }
            }
            if (customer.firstname < databaseSettings.nameMinLength || customer.lastname < databaseSettings.nameMinLength) {
                return false;
            }
            // all tests passed -> valid customer object
            return true;
        }

        static customerWithLink(customer) {
            if (customer.hasOwnProperty("links")) {
                return this.customer(customer);
            }
            return false;
        }

        static training(training) {
            const keys = ['date', 'duration', 'activity', 'customer'];
            for (let i = 0; i < keys.length; i++) {
                if (!training.hasOwnProperty(keys[i])) {
                    // key does not exist
                    return false;
                }
            }
            // all tests passed -> valid training object
            return true;
        }

        static trainingWithLink(training) {
            // check that customer-link is in valid form
            if (!(/https:\/\/customerrest.herokuapp.com\/api\/customers\/[0-9]+/.text(training.customer))) {
                Log.writeLog(this.className + ".Validate.training(), incorrect customer URL: " + training.customer, 1);
                return false;
            }
            return this.training(training);
        }
    }

    static Array = class {

        static getSortOrder(property) {
            return function (a, b) {
                if (a[property] > b[property]) {
                    return -1;
                } else if (a[property] < b[property]) {
                    return 1;
                }
                return 0;
            }
        }
    }

}

class InternalMethods {

    /*
     * THE ACTUAL GET/POST/PUT/DELETE FUNCTIONS!
     */

    static className = "DatabaseAccessApi.InternalMethods";

    static async getData(url) {
        try {
            const response = await fetch(url);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            Log.writeLog(this.className + ".getData(): " + error, 1);
            return null;
        }
    }

    static async postData(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json',
                },
                body: JSON.stringify(data),
            });
            Log.writeLog("DatabaseAccessApi.postData(): ", 2);
            Log.writeLog(response, 2);
            return true;
        } catch (error) {
            Log.writeLog(this.className + ".postData(): " + error, 1);
            return false;
        }
    }

    static async putData(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'Application/json',
                },
                body: JSON.stringify(data),
            });
            Log.writeLog(this.className + ".putData(): ", 2);
            Log.writeLog(response, 2);
            return true;
        } catch (error) {
            Log.writeLog(this.className + ".putData(): " + error, 1);
            return false;
        }
    }

    static async deleteData(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'Application/json',
                },
            });
            Log.writeLog(this.className + ".deleteData(): ", 2);
            Log.writeLog(response, 2);
            return true;
        } catch (error) {
            Log.writeLog(this.className + ".deleteData(): " + error, 1);
            return false;
        }
    }

}
