import React from "react";
import { useParams } from "react-router";

import Trainings from "../pages/Trainings.js";

export default function Customer(props) {

    const { id } = useParams();

    return (
        <div>
            <Trainings customer={id} />
        </div>
    )
}