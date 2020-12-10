import React, { useState } from "react";

// IMPORT MATERIAL-UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

// Database utilities
import { DatabaseAccessApi } from "../classes/DatabaseAccessApi.js";

// Some settings
import { AppSettings } from "../config/AppSettings.js";
import { formStyles, formDiv, formTextField, formButtonDiv } from "../config/formSettings.js";

export default function AddCustomer(props) {

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    });

    const valueChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    const submit = async () => {
        const status = await DatabaseAccessApi.addCustomer(customer);
        if (status === false) {
            return;
        }
        props.saveMethod();
    }

    return (
        <div style={{
            display: "flex",
            background: formStyles.backgroundCurtain,
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <div style={formDiv}>
                <h3 style={{ marginBottom: "1em" }}>Add customer</h3>
                <TextField style={formTextField} onChange={valueChanged} name="firstname" label="Firstname" value={customer.firstname} variant={AppSettings.materialVariant} />
                <TextField style={formTextField} onChange={valueChanged} name="lastname" label="Lastname" value={customer.lastname} variant={AppSettings.materialVariant} />
                <TextField style={formTextField} onChange={valueChanged} name="streetaddress" label="Streetaddress" value={customer.streetaddress} variant={AppSettings.materialVariant} />
                <TextField style={formTextField} type="number" onChange={valueChanged} name="postcode" label="Postcode" value={customer.postcode} variant={AppSettings.materialVariant} />
                <TextField style={formTextField} onChange={valueChanged} name="city" label="City" value={customer.city} variant={AppSettings.materialVariant} />
                <TextField style={formTextField} type="email" onChange={valueChanged} name="email" label="Email" value={customer.email} variant={AppSettings.materialVariant} />
                <TextField style={formTextField} onChange={valueChanged} name="phone" label="Phone" value={customer.phone} variant={AppSettings.materialVariant} />
                <div style={formButtonDiv}>
                    <Button onClick={props.closeMethod} variant={AppSettings.materialVariant} color="secondary" startIcon={<CancelIcon />}>Cancel</Button>
                    <Button onClick={submit} variant={AppSettings.materialVariant} color="primary" startIcon={<SaveIcon />}>Save</Button>
                </div>
            </div>
        </div >
    )
}