import React, { useState } from 'react';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import styles from "../styles/form.module.css";
import { fuels } from "../config/fuels.js";
import Loading from "./Loading.js";

export default function AddCarForm() {

    const [loading, setLoading] = useState(false);
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
    }

    const onChangeNumberInput = (event) => {
        let num = parseInt(event.target.value);
        setCar({ ...car, [event.target.name]: num });
    }

    const submitTheCar = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://carrestapi.herokuapp.com/cars', {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json',
                },
                body: JSON.stringify({
                    brand: car.brand,
                    model: car.model,
                    color: car.color,
                    fuel: car.fuel,
                    year: car.year,
                    price: car.price,
                })
            });
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    if (loading) {
        return (
            <div>
                <Loading message="Saving car" />
            </div>
        )
    }

    return (
        <div>
            <fieldset className={styles.formFieldset}>
                <legend>Add a car</legend>
                <p><TextField name="brand" label="Brand" onChange={onChangeTextInput} value={car.brand} variant="outlined" /></p>
                <p><TextField name="model" label="Model" onChange={onChangeTextInput} value={car.model} variant="outlined" /></p>
                <p><TextField name="color" label="Color" onChange={onChangeTextInput} value={car.color} variant="outlined" /></p>
                <p>
                    <TextField name="fuel" select label="Fuel" onChange={onChangeTextInput} value={car.fuel} variant="outlined" SelectProps={{ native: true, }} helperText="Please select car fuel">
                        {fuels.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </p>
                <p><TextField name="year" label="Year" onChange={onChangeNumberInput} value={car.year} variant="outlined" type="number" /></p>
                <p><TextField name="price" label="Price" onChange={onChangeNumberInput} value={car.price} variant="outlined" type="number" /></p>
                <p className={styles.alignRight}>
                    <Button onClick={submitTheCar} variant="outlined" color="primary" startIcon={<SaveIcon />}>
                        Save
                    </Button>
                </p>
            </fieldset>
        </div>
    )
}