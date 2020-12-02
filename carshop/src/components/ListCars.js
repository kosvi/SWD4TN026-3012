import React, { useState, useEffect, useRef } from "react";

import Button from "@material-ui/core/Button";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Loading from "./Loading.js";
import { ServerAPI } from "../classes/ServerAPI.js";

export default function ListCars(props) {

    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);
    const gridRef = useRef();

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

    const deleteCars = () => {
        const amountSelected = gridRef.current.getSelectedNodes().length;
        if(amountSelected>0) {
            if(window.confirm("Are you sure you want to delete " + amountSelected + " cars?")) {
                // ok, user wants to delete these cars
                for(let i = 0;i<amountSelected;i++) {
                    let id = gridRef.current.getSelectedNodes()[i].childIndex;
                    setCars(cars.filter((car, index) => index !== id));
                    ServerAPI.deleteCar(id);
                }
            }
        }
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div>
            <Button onClick={deleteCars} variant="outlined" color="primary">Delete</Button>
            <div className="ag-theme-material" style={{ height: props.height, width: props.width, margin: 'auto' }}>
                <AgGridReact animateRows='true' ref={gridRef} onGridReady={params => gridRef.current = params.api} rowSelection="multiple" columnDefs={columns} rowData={cars}>
                </AgGridReact>
            </div>
        </div>
    )
}