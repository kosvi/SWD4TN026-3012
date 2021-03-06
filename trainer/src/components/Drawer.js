import React, { useState } from "react";
import { Link } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
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
            <DrawerButton text={props.menuText} toggleMethod={props.toggleMethod} closeMethod={props.closeMethod} open={props.menuOpen} />
            {props.title}
        </div>
    )
}

function DrawerButton(props) {
    return (
        <ClickAwayListener onClickAway={props.closeMethod}>
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
                {props.open ? <ChevronLeftIcon /> : <ChevronRightIcon />} {props.text}
            </div >
        </ClickAwayListener>
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

export function HelpButton(props) {

    const [open, setOpen] = useState(false);
    const [translateValue, setTranslateValue] = useState('-' + drawerConfig.helpHeight);

    const handleClickAway = () => {
        setOpen(false);
        setTranslateValue("-" + drawerConfig.helpHeight);
    }

    const toggleOpen = () => {
        if (open) {
            setTranslateValue("-" + drawerConfig.helpHeight);
        } else {
            setTranslateValue("0");
        }
        setOpen(!open);
    }

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div style={{
                    position: "fixed",
                    display: "flex",
                    alignItems: "center",
                    top: "0",
                    right: "0",
                    height: drawerConfig.titleHeight,
                    lineHeight: drawerConfig.titleHeight,
                    color: drawerConfig.color,
                    zIndex: "11",
                    cursor: "pointer",
                }} onClick={toggleOpen}>
                    Help {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </div>
            </ClickAwayListener>
            <div style={{
                position: "fixed",
                top: "0",
                right: "0",
                zIndex: "5",
                marginTop: drawerConfig.titleHeight,
                padding: "1.5em",
                border: "solid 2px " + drawerConfig.helpBorderColor,
                borderRadius: "0 0 0.5em 0.5em",
                backgroundColor: drawerConfig.helpBackgroundColor,
                width: drawerConfig.drawerWidth,
                height: drawerConfig.helpHeight,
                overflowY: "auto",
                transition: "all 0.3s ease-in-out",
                transform: "translateY(" + translateValue + ")",
                textAlign: "left",
            }}>
                {props.content.split('\n').map((line, index) => <p key={index} style={{ marginTop: "10px" }}>{line}</p>)}
            </div>
        </>
    )
}