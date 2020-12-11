import React, { useState } from "react";

// IMPORT MATERIAL-UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

// Database utilities
import { DatabaseAccessApi } from "../classes/DatabaseAccessApi.js";

import moment from "moment";

// Some settings
import { AppSettings } from "../config/AppSettings.js";
import { formStyles, formDiv, formTextField, formButtonDiv } from "../config/formSettings.js";

export default function AddTraining(props) {

    const [training, setTraining] = useState({ date: '', activity: '', duration: '', customer: props.customer.links[1].href });
    const [trainingTime, setTrainingTime] = useState('');

    const valueChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    const timeChanged = (event) => {
        setTrainingTime(event.target.value);
    }

    const submit = async () => {
        const newTraining = { ...training, date: moment(training.date + " " + trainingTime).toISOString(true) };
        const status = await DatabaseAccessApi.addCustomerTraining(newTraining);
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
                <h3 style={{ marginBottom: "1em" }}>Add training</h3>
                {props.customer.firstname} {props.customer.lastname}
                <TextField style={formTextField} type="date" InputLabelProps={{ shrink: true }} onChange={valueChanged} name="date" label="Date" value={training.date} variant={AppSettings.materialVariant} />
                <TextField style={formTextField} type="time" InputLabelProps={{ shrink: true }} onChange={timeChanged} name="time" label="Time" variant={AppSettings.materialVariant} />
                <TextField style={formTextField} onChange={valueChanged} name="activity" label="Activity" value={training.activity} variant={AppSettings.materialVariant} />
                <TextField style={formTextField} type="number" onChange={valueChanged} name="duration" label="Duration" value={training.duration} variant={AppSettings.materialVariant} />
                <div style={formButtonDiv}>
                    <Button onClick={props.closeMethod} variant={AppSettings.materialVariant} color="secondary" startIcon={<CancelIcon />}>Cancel</Button>
                    <Button onClick={submit} variant={AppSettings.materialVariant} color="primary" startIcon={<SaveIcon />}>Save</Button>
                </div>
            </div>
        </div >
    )
}