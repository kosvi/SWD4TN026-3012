// REACT
import React, { useState, useEffect, useRef } from "react";

// AG-GRID
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

// MATERIAL-UI 
import Button from "@material-ui/core/Button";

// CUSTOM COMPONENTS
import Loading from "../components/Loading.js";

// APP LOGIC
import { DatabaseAccessApi } from "../classes/DatabaseAccessApi.js";

export default function CustomerList(props) {

    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);

    const [showAddress, setShowAddress] = useState(true);
    const [showContact, setShowContact] = useState(true);

    const [gridApi, setGridApi] = useState(null);
    const gridRef = useRef();

    useEffect(() => {
        getCustomers();
    }, []);

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

    const columns = [
        { headerName: "Firstname", field: "firstname" },
        { headerName: "Lastname", field: "lastname" },
        { headerName: "Streetaddress", field: "streetaddress", hide: !showAddress },
        { headerName: "City", field: "city", hide: !showAddress },
        { headerName: "Postcode", field: "postcode", flex: 1, hide: !showAddress },
        { headerName: "Email", field: "email", hide: !showContact },
        { headerName: "Phone", field: "phone", flex: 1, hide: !showContact },
    ];

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <div className="ag-theme-material" style={{ textAlign: "left", marginLeft: "5vw" }}>
                <label>
                    <input type="checkbox" name="address" onChange={toggleGridVisibility} checked={showAddress} /> Address information
            </label><br />
                <label>
                    <input type="checkbox" name="contact" onChange={toggleGridVisibility} checked={showContact} /> Contact information
            </label>
            </div>
            <div className="ag-theme-material" style={{ height: "90vh", width: "100vw", margin: "auto" }}>
                <AgGridReact
                    defaultColDef={{
                        flex: 2,
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
                    rowData={customers}
                >
                </AgGridReact>
            </div>
        </>
    )
}