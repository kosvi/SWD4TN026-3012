import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";

export default function CustomerButton(props) {

    const [linkPath, setLinkPath] = useState('');

    useEffect(() => {
        setLinkPath("/customer/" + props.id);
    }, []);

    return (
        <div>
            <Link to={linkPath} style={{ color: "black" }}>
                <SearchIcon />
            </Link>
        </div>
    )
}
