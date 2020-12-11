import React from "react";
import { useParams } from "react-router";

import Trainings from "./Trainings.js";
import Statistics from "./Statistics";

export default function Customer(props) {

    const { id } = useParams();

    return (
        <div>
            <Trainings customer={id} />
        </div>
    )
}

export function CustomerStats(props) {

    const { id } = useParams();

    return (
        <div>
            <Statistics customer={id} />
        </div>
    )
}