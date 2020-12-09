import React from "react";

// IMPORT MATERIAL-UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

// Some settings
import { AppSettings } from "../config/AppSettings.js";

export default function AddTraining(props) {
    return (
        <div>
            <TextField name="date" label="Date" variant={AppSettings.materialVariant} />
            <TextField name="activity" label="Activity" variant={AppSettings.materialVariant} />
            <TextField name="duration" label="Duration" variant={AppSettings.materialVariant} />
            <Button variant={AppSettings.materialVariant} color="secondary" startIcon={<CancelIcon />}>Cancel</Button>
            <Button variant={AppSettings.materialVariant} color="primary" startIcon={<SaveIcon />}>Save</Button>
        </div>
    )
}