import React, { useState, useEffect } from "react";
import Refresh from "@material-ui/icons/Refresh";

export default function Loading(props) {

    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (props.message) {
            setMsg(props.message);
        }
    }, []);

    return (
        <div style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            top: "0",
            left: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                border: "solid 0.3em black",
                borderRadius: "1em",
                backgroundColor: "white",
                color: "black",
                padding: "3em",
                minWidth: "20vw",
                alignItems: "center",
            }}>
                <p>{msg}</p>
                <Refresh />
            </div>
        </div>
    )
}