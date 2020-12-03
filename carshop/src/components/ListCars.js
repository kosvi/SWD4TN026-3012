import React, { useState, useEffect, useRef } from "react";

import Button from "@material-ui/core/Button";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { formSettings } from "../config/formSettings.js";

import Loading from "./Loading.js";
import { ServerAPI } from "../classes/ServerAPI.js";

export default function ListCars(props) {

    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);
    const [gridApi, setGridApi] = useState(null);
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

    const onGridReady = (params) => {
        setGridApi(params.api);
        gridRef.current = params.api;
    }

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
        if (amountSelected > 0) {
            if (window.confirm("Are you sure you want to delete " + amountSelected + " cars?")) {
                if (amountSelected > formSettings.deleteExtraConfirmationLimit) {
                    if (!window.confirm("Are you sure you wish to PERMANENTY delete these cars?")) {
                        return;
                    }
                }
                // ok, user wants to delete these cars
                for (let i = 0; i < amountSelected; i++) {
                    let id = gridRef.current.getSelectedNodes()[i].childIndex;
                    setCars(cars.filter((car, index) => index !== id));
                    ServerAPI.deleteCar(gridRef.current.getSelectedNodes()[i].data);
                }
            }
        } else {
            // not a single car selected
            alert("Choose atleast a single car to delete. You can choose multiple cars by pressing ctrl.");
        }
    }

    const editCar = () => {
        const amountSelected = gridRef.current.getSelectedNodes().length;
        if (amountSelected !== 1) {
            alert("You have to select a single car to edit it.");
        } else {
            // props.editMethod(gridRef.current.getSelectedNodes()[0]);
            // let pieces = gridRef.current.getSelectedNodes()[0].data._links.car.href.split("/cars/");
            // const id = pieces[1];
            props.editMethod(gridRef.current.getSelectedNodes()[0].data);
        }
    }

    const exportToCsv = () => {
        const params = {
            suppressQuotes: true,
            skipHeader: false,
            filename: "export.csv",
        };
        gridApi.exportDataAsCsv(params);
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <div style={{ textAlign: "left" }}>
                Actions:&nbsp;
                <Button onClick={props.addMethod} variant={formSettings.variant} color="primary">Add</Button>
                <Button onClick={editCar} variant={formSettings.variant} color="primary">Edit</Button>
                <Button onClick={deleteCars} variant={formSettings.variant} color="primary">Delete</Button>
                <Button onClick={getCars} variant={formSettings.variant} color="primary">Refresh</Button>
                <Button onClick={exportToCsv} variant={formSettings.variant} color="primary">Export to CSV</Button>
            </div >
            <div className="ag-theme-material" style={{ height: props.height, width: props.width, margin: 'auto' }}>
                <AgGridReact
                    animateRows='true'
                    ref={gridRef}
                    onGridReady={onGridReady}
                    rowSelection="multiple"
                    pagination="true"
                    paginationPageSize={props.pageSize}
                    columnDefs={columns}
                    rowData={cars}>
                </AgGridReact>
            </div>
        </>
    )
}