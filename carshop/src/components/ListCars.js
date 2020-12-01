import React, { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Loading from "./Loading.js";
import { ServerAPI } from "../classes/ServerAPI.js";

export default function ListCars() {

    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);

    const columns = [
        { headerName: "Brand", field: "brand", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Model", field: "model", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Color", field: "color", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Fuel", field: "fuel", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Year", field: "year", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Price", field: "price", sortable: true, filter: true, floatingFilter: true },
    ]

    useEffect(() => {
        getCars();
    }, []);

    const getCars = async () => {
        setLoading(true);
        const allCars = await ServerAPI.fetchAllCars();
        if (allCars != null) {
            setCars(allCars);
        }
        setLoading(false);
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div>
            <div className="ag-theme-material" style={{ height: '800px', width: '70%', margin: 'auto' }}>
                <AgGridReact animateRows='true' columnDefs={columns} rowData={cars}>
                </AgGridReact>
            </div>
        </div>
    )
}