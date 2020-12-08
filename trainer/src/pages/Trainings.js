// REACT
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';

// AG-GRID
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridSettings } from "../config/AgGridSettings.js";

// MATERIAL-UI 
import Button from "@material-ui/core/Button";

// MOMENT
import moment from "moment";

// CUSTOM COMPONENTS
import Loading from "../components/Loading.js";

// APP LOGIC
import { DatabaseAccessApi } from "../classes/DatabaseAccessApi.js";

export default function TrainingList(props) {

    const [loading, setLoading] = useState(true);
    const [trainings, setTrainings] = useState([]);
    const [customer, setCustomer] = useState([]);

    const [gridApi, setGridApi] = useState(null);
    const gridRef = useRef();
    const { id } = useParams();

    useEffect(() => {
        getTrainings();
    }, []);

    const onGridReady = (params) => {
        setGridApi(params.api);
        gridRef.current = params.api;
    }

    const getTrainings = async () => {
        setLoading(true);
        var allTrainings;
        if (typeof id === 'undefined') {
            allTrainings = await DatabaseAccessApi.getTrainings();
        } else {
            allTrainings = await DatabaseAccessApi.getCustomerTrainings(id);
            const currentCustomer = await DatabaseAccessApi.getCustomer(id);
            if (currentCustomer != null) {
                setCustomer(currentCustomer);
            }
        }
        if (allTrainings != null) {
            if (allTrainings[0].hasOwnProperty("activity")) {
                setTrainings(allTrainings);
            }
            else {
                setTrainings([]);
            }
        }
        setLoading(false);
    }

    const columns = [
        { headerName: "Activity", field: "activity" },
        { headerName: "Date", field: "date", cellRenderer: (data) => { return moment(data.date).format('MMMM Do YYYY') } },
        { headerName: "Duration", field: "duration" },
    ];

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            {typeof id !== 'undefined' && <CustomerInfo firstname={customer.firstname} lastname={customer.lastname} />}
            <div className="ag-theme-material" style={{ height: AgGridSettings.height, width: AgGridSettings.width, margin: "auto" }}>
                <AgGridReact
                    defaultColDef={{
                        flex: 1,
                        minWidth: 200,
                        sortable: true,
                        filter: true,
                        floatingFilter: true,
                    }}
                    animateRows='true'
                    ref={gridRef}
                    rowSelection={AgGridSettings.rowSelection}
                    onGridReady={onGridReady}
                    columnDefs={columns}
                    rowData={trainings}
                >
                </AgGridReact>
            </div>
        </>
    )
}

function CustomerInfo(props) {
    return (
        <div className="ag-theme-material" style={{
            textAlign: AgGridSettings.aboveDivAlign,
            marginLeft: AgGridSettings.aboveDivMargin,
        }}>
            <Link to="/customers" style={{ color: "blue" }}>back to customerlist</Link><br /><br />
            <b>Customer:</b> {props.firstname} {props.lastname}
        </div>
    )
}