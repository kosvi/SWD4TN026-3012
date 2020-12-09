import React from "react";

export default function PopMessages(props) {

    if (props.messages.length < 1) {
        return null;
    }

    return (
        <div style={{
            position: "fixed",
            bottom: "0",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "6",
        }}>
            {props.messages.map((msg, index) => <Pop message={msg.text} key={index} />)}
        </div>
    )
}

function Pop(props) {
    return (
        <div style={{
            width: "200px",
            background: "rgba(0, 0, 0, 0.6)",
            color: "white",
            padding: "0.4em",
            border: "solid 2px black",
            borderRadius: "0.2em",
            marginBottom: "1.2em",
        }}>
            {props.message}
        </div>
    )
}