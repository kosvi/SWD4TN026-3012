import React, { useState } from 'react';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { formSettings } from "../config/formSettings.js";

import { ServerAPI } from "../classes/ServerAPI.js";
import styles from "../styles/AddCarForm.module.css";
import { fuels } from "../config/fuels.js";
import Loading from "./Loading.js";

export default function AddCarForm(props) {

    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: 0,
        price: 0,
    });

    const onChangeTextInput = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
        setShowMessage(false);
    }

    const onChangeNumberInput = (event) => {
        let num = parseInt(event.target.value);
        setCar({ ...car, [event.target.name]: num });
        setShowMessage(false);
    }

    const resetForm = () => {
        setCar({
            brand: '',
            model: '',
            color: '',
            fuel: '',
            year: 0,
            price: 0,
        });
    }

    const submitTheCar = async () => {
        setLoading(true);
        let success = await ServerAPI.postCar(car);
        // if success = 0 -> success 
        //   show a message telling that to the user
        if (success) {
            setMessage("Car added succesfully!");
            setShowMessage(true);
        }
        // if success != 0 -> fail (also tell that!)
        else {
            setMessage("Failed to add car!");
            setShowMessage(true);
        }
        resetForm();
        setLoading(false);
    }

    return (
        <div className={styles.carSubmitDiv}>
            <fieldset className={styles.formFieldset}>
                <div className={styles.alignRight}>
                    <Button onClick={props.closeMethod}>
                        Close
                    </Button>
                </div>
                <legend>Add a car</legend>
                <p><TextField name="brand" label="Brand" onChange={onChangeTextInput} value={car.brand} variant={formSettings.variant} /></p>
                <p><TextField name="model" label="Model" onChange={onChangeTextInput} value={car.model} variant={formSettings.variant} /></p>
                <p><TextField name="color" label="Color" onChange={onChangeTextInput} value={car.color} variant={formSettings.variant} /></p>
                <p>
                    <TextField name="fuel" select label="Fuel" onChange={onChangeTextInput} value={car.fuel} variant={formSettings.variant} SelectProps={{ native: true, }} helperText="Please select car fuel">
                        {fuels.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </p>
                <p><TextField name="year" label="Year" onChange={onChangeNumberInput} value={car.year} variant={formSettings.variant} type="number" /></p>
                <p><TextField name="price" label="Price" onChange={onChangeNumberInput} value={car.price} variant={formSettings.variant} type="number" /></p>
                {loading ?
                    (<div className={styles.loadingIcon}>
                        <Loading />
                    </div>
                    ) :
                    (<div className={styles.spaceBetween}>
                        <Button onClick={resetForm} variant={formSettings.variant} color="secondary" startIcon={<CancelIcon />}>
                            Reset
                        </Button>
                        <Button onClick={submitTheCar} variant={formSettings.variant} color="primary" startIcon={<SaveIcon />}>
                            Save
                        </Button>
                    </div>
                    )
                }
                {showMessage ?
                    (<div className={styles.message}>
                        {message}
                    </div>
                    ) :
                    ""}
            </fieldset>
        </div>
    )
}