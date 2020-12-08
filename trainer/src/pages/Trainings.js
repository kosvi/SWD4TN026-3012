// REACT
import React, { useState, useEffect, useRef } from "react";

// AG-GRID
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

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

    const [gridApi, setGridApi] = useState(null);
    const gridRef = useRef();

    useEffect(() => {
        if (props.customerTrainingUrl) {
            getTrainings(props.customerTrainingUrl);
        }
        getTrainings("");
    }, []);

    const onGridReady = (params) => {
        setGridApi(params.api);
        gridRef.current = params.api;
    }

    const getTrainings = async (url) => {
        setLoading(true);
        var allTrainings;
        if (url.length < 1) {
            allTrainings = await DatabaseAccessApi.getTrainings();
        } else {
            allTrainings = await DatabaseAccessApi.getCustomerTrainings(url);
        }
        if (allTrainings != null) {
            setTrainings(allTrainings);
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
            <div className="ag-theme-material" style={{ height: "90vh", width: "100vw", margin: "auto" }}>
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
                    rowSelection="multiple"
                    onGridReady={onGridReady}
                    columnDefs={columns}
                    rowData={trainings}
                >
                </AgGridReact>
            </div>
        </>
    )
}