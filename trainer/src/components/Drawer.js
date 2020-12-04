import React from "react";
import { Link } from "react-router-dom";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { drawerConfig } from "../config/drawerConfig.js";

/*
 * I mostly use inline styling with the elements
 * because it's easier to set them in a config file
 */

export function TitleBar(props) {
    return (
        <div style={{
            width: "100vw",
            height: drawerConfig.titleHeight,
            lineHeight: drawerConfig.titleHeight,
            backgroundColor: drawerConfig.backgroundColor,
            color: drawerConfig.color,
            alignItems: "center",
            boxShadow: "0 5px 5px #666",
            top: "0",
            left: "0",
        }}>
            {props.title}
        </div>
    )
}

export function DrawerButton(props) {
    return (
        <div style={{
            height: drawerConfig.titleHeight,
            width: drawerConfig.drawerWidth,
            backgroundColor: drawerConfig.backgroundColor,
            display: "flex",
            position: "fixed",
            top: "0",
            left: "0",
            alignItems: "center",
            color: drawerConfig.color,
        }} onClick={props.toggleMethod} >
            {props.open ? <ChevronLeftIcon /> : <ChevronRightIcon /> } {props.text}
        </div >
    )
}

export function Drawer(props) {

    const toggleWidth = props.open ? "0" : "-" + drawerConfig.drawerWidth;

    return (
        <div style={{
            minHeight: "100vh",
            width: drawerConfig.drawerWidth,
            backgroundColor: drawerConfig.backgroundColor,
            transition: "all 0.3s ease-in-out",
            transform: "translate(" + toggleWidth + ")",
            position: "fixed",
            display: "flex",
            flexDirection: "column",
        }}>
            {props.menu.map(link => (
                <Link to={link.path} style={{color: drawerConfig.color, textDecoration: "none", fontSize: "1.2em"}} key={link.name}>{link.name}</Link>
            ))}
        </div>
    )
}