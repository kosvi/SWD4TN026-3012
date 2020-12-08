import { databaseSettings } from "../config/databaseSettings.js";
import { Log } from "./Log.js";

export class DatabaseAccessApi {

    static async getCustomers() {
        const responseJson = await InternalMethods.getData(databaseSettings.customersUrl);
        return responseJson.content;
    }

    static async getTrainings() {
        const responseJson = await InternalMethods.getData(databaseSettings.trainingsUrl);
        return responseJson.content;
    }

    static async getCustomerTrainings(url) {
        const responseJson = await InternalMethods.getData(url);
        return responseJson.content;
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

        static customerIdFromJson(customer) {
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

        static training(training) {
            const keys = ['date', 'duration', 'activity', 'customer'];
            for (let i = 0; i < keys.length; i++) {
                if (!training.hasOwnProperty(keys[i])) {
                    // key does not exist
                    return false;
                }
            }
            // check that customer-link is in valid form
            if (!(/https:\/\/customerrest.herokuapp.com\/api\/customers\/[0-9]+/.text(training.customer))) {
                Log.writeLog(this.className + ".Validate.training(), incorrect customer URL: " + training.customer, 1);
                return false;
            }
            // all tests passed -> valid training object
            return true;
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
            Log.writeLog("DatabaseAccessApi.postData(): " + response, 2);
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
            Log.writeLog(this.className + ".putData(): " + response, 2);
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
            Log.writeLog(this.className + ".deleteData(): " + response, 2);
            return true;
        } catch (error) {
            Log.writeLog(this.className + ".deleteData(): " + error, 1);
            return false;
        }
    }

}
