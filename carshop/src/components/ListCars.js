import React, { useState } from "react";

import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Loading from "./Loading.js";

export default function ListCars() {

    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);

    const fetchAllCars = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://carrestapi.herokuapp.com/cars');
            const responseJson = response.json();
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div>
            Carlist
        </div>
    )
}