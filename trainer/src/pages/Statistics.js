import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { statisticsConfig } from "../config/statisticsConfig.js";
import { DatabaseAccessApi } from "../classes/DatabaseAccessApi.js";
import Loading from "../components/Loading.js";

import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";

export default function Statistics(props) {

    const [loading, setLoading] = useState(true);
    const [trainings, setTrainings] = useState([]);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [data, setData] = useState([]);
    /*    const data = [
            { name: "Spinning", duration: 200 },
            { name: "Walking", duration: 120 },
        ];*/

    useEffect(() => {
        // lataa ja laske
        if (props.customer < 0) {
            getAllTrainings();
        } else {
            getCustomerTrainings(props.customer);
        }
    }, []);

    const getAllTrainings = async () => {
        const responseJson = await DatabaseAccessApi.getTrainings();
        if (responseJson !== null) {
            // we have success?
            if (responseJson[0].hasOwnProperty("activity")) {
                // and the content is valid(?)
                const groupedTrainings = groupBy(responseJson, "activity");
                setTrainings(groupedTrainings);
                calculateTimes(groupedTrainings);
                setLoading(false);
            }
        }
    }

    const getCustomerTrainings = async (customerId) => {
        const responseJson = await DatabaseAccessApi.getCustomerTrainings(customerId);
        if (responseJson !== null) {
            // we have success(?)
            if (responseJson[0].hasOwnProperty("activity")) {
                const groupedTrainings = groupBy(responseJson, "activity");
                setTrainings(groupedTrainings);
                calculateTimes(groupedTrainings);
                await getCustomer(customerId);
                setLoading(false);
            }
        }
    }

    const getCustomer = async (customerId) => {
        const responseJson = await DatabaseAccessApi.getCustomer(customerId);
        if (responseJson !== null) {
            setFirstname(responseJson.firstname);
            setLastname(responseJson.lastname);
        }
    }

    const calculateTimes = (groupedTrainings) => {
        const data = [];
        const keys = Object.keys(groupedTrainings);
        for (let i = 0; i < keys.length; i++) {
            const activityTime = { name: keys[i], duration: sumBy(groupedTrainings[keys[i]], "duration") };
            data.push(activityTime);
        }
        setData(data);
    }

    if (loading) {
        return (
            <div>
                <Loading message="Downloading & processing" />
            </div>
        )
    }

    /*
     * SORRY, EN JAKSANUT ALKAA TAISTELLA TUON LABELIN KANSSA
     * SEN SAANTI PYSTYYN OLISI VAATINUT --- no tein sittenkin copy&pastella
     */
    return (
        <div>
            {props.customer >= 0 && <CustomerInfo firstname={firstname} lastname={lastname} />}
            {props.customer < 0 && <h1 style={{ marginBottom: "20px" }}>Overall statistics</h1>}
            <ResponsiveContainer width="100%" height={statisticsConfig.height}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis type="number" label={<AxisLabel axisType='yAxis'>Duration (min)</AxisLabel>} />
                    <Bar dataKey="duration" fill={statisticsConfig.color} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

function CustomerInfo(props) {
    return (
        <div>
            <b>Customer: </b>{props.firstname} {props.lastname}
        </div>
    )
}

// https://github.com/recharts/recharts/issues/184
const AxisLabel = ({ axisType, x, y, width, height, stroke, children }) => {
    const cx = 20;
    const cy = 100;
    const rot = `270 ${cx} ${cy}`;
    // tosin en ymmärrä miksi nämä on täällä, kun ei nuo x, y, width ja height tai stroke kuitenkaan saa arvoja
    /*    width=0;
        height=0;
        const isVert = axisType === 'yAxis';
        const cx = isVert ? x : x + (width / 2);
        const cy = isVert ? (height / 2) + y : y + height + 10;
        const rot = isVert ? `270 ${cx} ${cy}` : 0; */
    return (
        <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle">
            {children}
        </text>
    );
};