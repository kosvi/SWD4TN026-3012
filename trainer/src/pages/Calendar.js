import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { calendarSettings } from "../config/calendarSettings.js";
import { DatabaseAccessApi } from "../classes/DatabaseAccessApi.js";
import Loading from "../components/Loading.js";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function TrainingCalendar(props) {

    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([{ start: moment("2020-12-11 09:20", moment.defaultFormat).toDate(), end: moment("2020-12-11 10:20", moment.defaultFormat).toDate(), title: "Something" }]);

    useEffect(() => {
        const loadTrainings = async () => {
            const responseJson = await DatabaseAccessApi.getTrainings();
            if (responseJson != null) {
                // we got something
                if (responseJson[0].hasOwnProperty("activity")) {
                    // lets create calendar events from those trainings
                    var newEvents = [];
                    for (let i = 0; i < responseJson.length; i++) {
                        newEvents.push(constructEvent(responseJson[i]));
                    }
                    setEvents(newEvents);
                }
            }
            setLoading(false);
        }
        loadTrainings();
    }, []);

    const constructEvent = (training) => {
        if (training.customer !== null && training.date !== null && training.activity !== null) {
            const eventStart = moment(training.date, moment.defaultFormat).toDate();
            const eventEnd = moment(eventStart).add(training.duration, 'm').toDate();
            const customerName = training.customer.firstname + " " + training.customer.lastname;
            const customerActivity = training.activity;
            const eventTitle = customerActivity + " / " + customerName;
            const newEvent = { start: eventStart, end: eventEnd, title: eventTitle };
            return newEvent;
        } else {
            return { start: new Date(), end: new Date(), title: "empty" };
        }
    }

    if (loading) {
        return (
            <Loading message="Loading trainings" />
        )
    }

    return (
        <div>
            <Calendar
                localizer={localizer}
                defaultView={calendarSettings.defaultView}
                defaultDate={new Date()}
                events={events}
                style={{ height: calendarSettings.height }}
            />
        </div>
    )
}