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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Snackbar from "@material-ui/core/Snackbar";
import { snackBarSettings, snackBarStyle } from "../config/snackBarConfig.js";

// MOMENT
import moment from "moment";

// CUSTOM COMPONENTS
import Loading from "../components/Loading.js";
import AddTraining from "../components/AddTraining.js";
import CustomerButton from "../components/CustomerButton.js";
import { HelpButton } from "../components/Drawer.js";
import { helpContents } from "../config/helpContent.js";

// APP LOGIC
import { AppSettings } from "../config/AppSettings.js";
import { DatabaseAccessApi } from "../classes/DatabaseAccessApi.js";

export default function TrainingList(props) {

    const [loading, setLoading] = useState(true);
    const [trainings, setTrainings] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [columns, setColumns] = useState([]);
    const [formOpen, setFormOpen] = useState(false);

    // Snackbar messages
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");

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
            setColumns(columnsWithNames);
        } else {
            allTrainings = await DatabaseAccessApi.getCustomerTrainings(id);
            setColumns(columnsWithoutNames);
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

    const deleteTraining = async (training) => {
        const trainingUrl = training.links[0].href;
        if (window.confirm("Are you sure you want to delete " + training.activity.toLowerCase() + "?")) {
            const status = await DatabaseAccessApi.deleteTrainingWithUrl(trainingUrl);
            if (status !== false) {
                // halpaa ja likasta kuin dissais puhevikasta...
                await getTrainings();
                handleSnackOpen("Deleted");
            } else {
                handleSnackOpen("Failed");
            }
        }
    }

    const toggleFormOpen = () => {
        if (customer !== null) {
            setFormOpen(!formOpen);
        }
    }

    const saveSuccess = async () => {
        // edelleen halpaa ja likaista
        await getTrainings();
        setFormOpen(false);
        handleSnackOpen("Training saved!");
    }

    // for the snackbar
    const handleClose = () => {
        setSnackOpen(false);
        setSnackMessage("");
    }

    const handleSnackOpen = (message) => {
        setSnackMessage(message);
        setSnackOpen(true);
    }

    const columnsWithNames = [
        { headerName: "Firstname", field: "customer.firstname" },
        { headerName: "Lastname", field: "customer.lastname" },
        // { headerName: "Firstname", cellRenderer: function (params) { return params.data.customer.firstname }, sortable: false },
        // { headerName: "Lastname", cellRenderer: function (params) { return params.data.customer.lastname }, sortable: false },
        { headerName: "Activity", field: "activity" },
        // { headerName: "Date", field: "date", cellRenderer: (data) => { return moment(data.date).format(AppSettings.dateFormat) } },
        { headerName: "Date", field: "date", cellRenderer: (params) => { return moment(params.data.date).format(AppSettings.dateFormat); } },
        { headerName: "Duration", field: "duration" },
        { headerName: "", field: "", flex: 1, sortable: false, filter: false, cellRendererFramework: params => <CustomerButton id={params.data.customer.id} /> },
    ];
    const columnsWithoutNames = [
        { headerName: "Activity", field: "activity" },
        { headerName: "Date", field: "date", cellRenderer: (params) => { return moment(params.data.date).format(AppSettings.dateFormat); } },
        { headerName: "Duration", field: "duration" },
        { headerName: "", field: "", flex: 1, sortable: false, filter: false, cellRendererFramework: params => <DeleteForeverIcon style={{ color: "red", cursor: "pointer" }} onClick={() => deleteTraining(params.data)} /> }
    ];

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            {typeof id !== 'undefined' && <CustomerInfo customer={customer} />}
            {typeof id !== 'undefined' && <Button onClick={toggleFormOpen} variant={AppSettings.materialVariant}>Add training</Button>}
            {typeof id === 'undefined' && <HelpButton content={helpContents.trainings} />}
            <div className="ag-theme-material" style={{ height: AgGridSettings.height, width: AgGridSettings.width, margin: "auto" }}>
                <AgGridReact
                    defaultColDef={{
                        flex: 3,
                        minWidth: AgGridSettings.colMinWidth,
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
                    pagination={AgGridSettings.pagination}
                    paginationPageSize={AgGridSettings.paginationPageSize}
                    paginationAutoPageSize={AgGridSettings.paginationAutoPageSize}
                >
                </AgGridReact>
                {formOpen && <AddTraining customer={customer} closeMethod={toggleFormOpen} saveMethod={saveSuccess} />}
            </div>
            <Snackbar open={snackOpen} autoHideDuration={snackBarSettings.autoHideDuration} onClose={handleClose}>
                <div style={snackBarStyle}>{snackMessage}</div>
            </Snackbar>
        </>
    )
}

function CustomerInfo(props) {

    return (
        <div className="ag-theme-material" style={{
            textAlign: AgGridSettings.aboveDivAlign,
            marginLeft: AgGridSettings.aboveDivMargin,
        }}>
            {/*<Link to="/customers" style={{ color: "blue" }}>back to customerlist</Link><br /><br />*/}
            <div style={{ marginTop: "20px" }}><b>Customer:</b> {props.customer.firstname} {props.customer.lastname}</div>
        </div>
    )
}
