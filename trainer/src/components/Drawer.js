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
            position: "fixed",
            height: drawerConfig.titleHeight,
            lineHeight: drawerConfig.titleHeight,
            backgroundColor: drawerConfig.backgroundColor,
            color: drawerConfig.color,
            alignItems: "center",
            boxShadow: "0 5px 5px #666",
            borderBottom: "solid 2px " + drawerConfig.borderColor,
            zIndex: "10",
        }}>
            <DrawerButton text={props.menuText} toggleMethod={props.toggleMethod} open={props.menuOpen} />
            {props.title}
        </div>
    )
}

function DrawerButton(props) {
    return (
        <div style={{
            height: drawerConfig.titleHeight,
            backgroundColor: drawerConfig.backgroundColor,
            display: "flex",
            position: "absolute",
            top: "0",
            left: "0",
            alignItems: "center",
            cursor: "pointer",
            color: drawerConfig.color,
            borderBottom: "solid 2px " + drawerConfig.borderColor,
        }} onClick={props.toggleMethod} >
            {props.open ? <ChevronLeftIcon /> : <ChevronRightIcon /> } {props.text}
        </div >
    )
}

export function Drawer(props) {

    const toggleWidth = props.open ? "0" : "-" + drawerConfig.drawerWidth;

    return (
        <div style={{
            width: drawerConfig.drawerWidth,
            backgroundColor: drawerConfig.backgroundColor,
            transition: "all 0.3s ease-in-out",
            transform: "translate(" + toggleWidth + ")",
            position: "fixed",
            left: "0",
            height: "100vh",
            marginTop: drawerConfig.titleHeight,
            zIndex: "9",
        }}>
            {props.menu.map(link => (
                <Link to={link.path} style={{
                    color: drawerConfig.color, 
                    marginTop: "0.2em", 
                    textDecoration: "none", 
                    fontSize: "1.2em", 
                    display: "block"
                }} key={link.name}>{link.name}</Link>
            ))}
        </div>
    )
}