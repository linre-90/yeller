import React from "react";
import { createUseStyles } from "react-jss"
import { Link } from "react-router-dom";

const styles = createUseStyles({
    appButton: {
        color: "white",
        padding: "5px",
        margin: "5px",
        backgroundColor: "rgb(0,0,0,0)",
        border: "1px solid white",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "transform .1s",
        "&:hover":{
            transform: "scale(1.25)"
        }
    },
});

/**
 * Render application themed button.
 * @param {{text:string, actionCallback: function}} props 
 * @returns Custom application button
 */
export const AppButton = ({text, actionCallback}) => {
    const classes = styles();
    return(
        <button className={classes.appButton} onClick={actionCallback}>{text}</button>
    )
}

/**
 * Render application themed button.
 * @param {{navigationAddress: string}} props 
 * @returns Custom application button
 */
export const AppLink = ({text, navigationAddress}) => {
    const classes = styles();
    return(
        <Link className={classes.appButton} to={navigationAddress}>{text}</Link>
    )
}