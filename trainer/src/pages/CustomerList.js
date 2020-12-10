// REACT
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// AG-GRID
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridSettings } from "../config/AgGridSettings.js";

// MATERIAL-UI 
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Snackbar from "@material-ui/core/Snackbar";

// CUSTOM COMPONENTS
import { helpContents } from "../config/helpContent.js";
import { HelpButton } from "../components/Drawer.js";
import Loading from "../components/Loading.js";
import CustomerButton from "../components/CustomerButton.js";

// APP LOGIC
import { DatabaseAccessApi, DatabaseObjectMethods } from "../classes/DatabaseAccessApi.js";
import { GridApi } from "ag-grid-community";
import { snackBarSettings, snackBarStyle } from "../config/snackBarConfig.js";

export default function CustomerList(props) {

    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);

    // Used to choose what content is shown in the grid
    const [showAddress, setShowAddress] = useState(true);
    const [showContact, setShowContact] = useState(true);

    // Snackbar messages
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");

    // gridApi could be used for accessing grid data, we use it for CSV export
    const [gridApi, setGridApi] = useState(null);
    const gridRef = useRef();

    useEffect(() => {
        // on load we fetch customers to populate the grid
        getCustomers();
    }, []);

    // this function is used for toggling grid content. 
    // (could be done prettier)
    const toggleGridVisibility = (event) => {
        if (event.target.name === "address") {
            setShowAddress(!showAddress);
        }
        else if (event.target.name === "contact") {
            setShowContact(!showContact);
        }
    }

    const onGridReady = (params) => {
        setGridApi(params.api);
        gridRef.current = params.api;
    }

    const getCustomers = async () => {
        setLoading(true);
        const allCustomers = await DatabaseAccessApi.getCustomers();
        // if allCustomers == null, get failed
        if (allCustomers != null) {
            setCustomers(allCustomers);
        }
        setLoading(false);
    }

    const deleteCustomer = async (customer) => {
        const customerUrl = customer.links[0].href;
        if (window.confirm("Are you sure you want to delete " + customer.firstname + " " + customer.lastname + "?")) {
            const status = await DatabaseAccessApi.deleteCustomerWithUrl(customerUrl);
            if (status !== false) {
                // halpaa ja likasta kuin dissais puhevikasta...
                await getCustomers();
                handleSnackOpen("Deleted");
            } else {
                handleSnackOpen("Failed");
            }
        }
    }

    // We will use this function to update user to Rest API
    const cellValueChanged = async (event) => {
        const status = await DatabaseAccessApi.updateCustomerByCustomer(event.data);
        if (status !== false) {
            handleSnackOpen("Save successfull");
        }
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

    const columns = [
        { headerName: "Firstname", field: "firstname" },
        { headerName: "Lastname", field: "lastname" },
        { headerName: "Streetaddress", field: "streetaddress", hide: !showAddress },
        { headerName: "City", field: "city", hide: !showAddress },
        { headerName: "Postcode", field: "postcode", flex: 1, hide: !showAddress },
        { headerName: "Email", field: "email", hide: !showContact },
        { headerName: "Phone", field: "phone", flex: 1, hide: !showContact },
        { headerName: "", field: "", flex: 1, sortable: false, filter: false, cellRendererFramework: params => <CustomerButton id={DatabaseObjectMethods.Extract.customerIdFromCustomer(params.data)} /> },
        { headerName: "", field: "", flex: 1, sotrable: false, filter: false, cellRendererFramework: params => <DeleteForeverIcon style={{ color: "red", cursor: "pointer" }} onClick={() => deleteCustomer(params.data)} /> },
    ];

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <HelpButton content={helpContents.customers} />
            <div className="ag-theme-material" style={{
                textAlign: AgGridSettings.aboveDivAlign,
                marginLeft: AgGridSettings.aboveDivMargin,
            }}>
                <label>
                    <input type="checkbox" name="address" onChange={toggleGridVisibility} checked={showAddress} /> Address information
            </label>
            &nbsp;
            <label>
                    <input type="checkbox" name="contact" onChange={toggleGridVisibility} checked={showContact} /> Contact information
            </label>
            </div>
            <div className="ag-theme-material" style={{ height: AgGridSettings.height, width: AgGridSettings.width, margin: "auto" }}>
                <AgGridReact
                    defaultColDef={{
                        flex: 2,
                        minWidth: AgGridSettings.colMinWidth,
                        sortable: true,
                        filter: true,
                        floatingFilter: true,
                        editable: true,
                    }}
                    animateRows='true'
                    ref={gridRef}
                    rowSelection={AgGridSettings.rowSelection}
                    onGridReady={onGridReady}
                    columnDefs={columns}
                    rowData={customers}
                    pagination={AgGridSettings.pagination}
                    paginationPageSize={AgGridSettings.paginationPageSize}
                    paginationAutoPageSize={AgGridSettings.paginationAutoPageSize}
                    onCellValueChanged={cellValueChanged}
                >
                </AgGridReact>
            </div>
            <Snackbar open={snackOpen} autoHideDuration={snackBarSettings.autoHideDuration} onClose={handleClose}>
                <div style={snackBarStyle}>{snackMessage}</div>
            </Snackbar>
        </>
    )
}

/*
function CustomerButton(props) {

    const [linkPath, setLinkPath] = useState('');

    useEffect(() => {
        setLinkPath("/customer/" + props.id);
    }, []);

    return (
        <div>
            <Link to={linkPath} style={{ color: "black" }}>
                <SearchIcon />
            </Link>
        </div>
    )
}
*/
