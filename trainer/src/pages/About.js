import React from "react";

import { DatabaseAccessApi } from "../classes/DatabaseAccessApi.js";

export default function About() {

    const resetDatebase = async () => {
        if (window.confirm("This will reset database, are you sure?")) {
            if (window.prompt("Do you really want me to reset database?") === "Yes, please!") {
                await DatabaseAccessApi.resetDatabase();
            }
        }
    }

    return (
        <>
            <div onClick={resetDatebase}>
                <h2>This is about!</h2>
            </div>
            <div style={{
                maxWidth: "400px",
                textAlign: "left",
                margin: "50px auto",
            }}>
                Hei! <br /><br />
                Nimeni on <a href="https://www.linkedin.com/in/ville-j-koskela/">Ville Koskela</a>.
                Tämä on kurssityöni <a href="https://www.haaga-helia.fi/">Haaga-Helian</a> frontend-kurssille.
        </div>
        </>
    )
}