import React, { useEffect, useState } from "react";

import { DatabaseAccessApi, DatabaseObjectMethods } from "../classes/DatabaseAccessApi.js";
import { AppSettings } from "../config/AppSettings.js";
import moment from "moment";

export default function Home() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = async () => {
        const responseJson = await DatabaseAccessApi.getTrainings();
        if (responseJson !== null) {
            setTrainings(responseJson.sort(DatabaseObjectMethods.Array.getSortOrder("date")));
        }
    }

    const createTrainingBoxes = (index) => {
        if (trainings.length > index) {
            return (
                <TrainingBox activity={trainings[index].activity} date={trainings[index].date} customer={trainings[index].customer} />
            )
        }
        else {
            return null;
        }
    }

    return (
        <div onClick={createTrainingBoxes}>
            {/*
            This is home!
            <br /><br />
            Yeah, thank you all for visiting this awesome website!
            */}
            <h1>Latest trainings</h1>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                {createTrainingBoxes(0)}
                {createTrainingBoxes(1)}
                {createTrainingBoxes(2)}
            </div>
        </div>
    )
}

// This here function is used to create those nice boxes for latest trainings!
function TrainingBox(props) {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            textAlign: "left",
            marginTop: "1.4em",
        }}>
            <h3>{moment(props.date).format(AppSettings.dateFormat)}</h3>
            Customer: {props.customer.firstname} {props.customer.lastname}
            <br />
            Activity: {props.activity}
        </div>
    )
}