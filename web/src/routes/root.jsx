import React from "react";
import { AppLink } from "../components/appClicks"
import { createUseStyles } from "react-jss"

const styles = createUseStyles({
    rootPage: {
        width: "100%",
        paddingTop: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px"
    },
    mainHeader: {
        color: "white",
        fontSize: "4rem",
        textAlign: "center"
    },
    secondaryHeader:{
        color: "white",
        fontSize: "2.5rem",
        textAlign: "center",
        textDecoration: "underline",
        fontWeight: "lighter"
    },
    helptext:{
        color: "white",
        textAlign: "center",
    },
    warningTxt: {
        border: "2px solid yellow",
        padding: "5px",
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: "2rem",
        color: "yellow",
        textAlign: "center"
    }
});

/**
 * Render root landing page.
 * @returns {React.JSX.Element}
 */
export const Root = () => {
    const classes = styles();
    
    return (
        <>
            <p className={classes.mainHeader}>Yeller!</p>
            <p className={classes.secondaryHeader}><i>...Home for internet trolls since 2024...</i></p>
            <p className={classes.warningTxt}>
                WARNING! Yeller is completely open discussion portal where anybody can write anything. 
                There will be improper and hostile content. If you are sensitive to bad language,
                hate speech or other types of improper human behaviour please go back.
            </p>
            <p className={classes.helptext}>Seeking info about Yeller? Visit: <AppLink navigationAddress="/help" text="Get help!"/></p>
            <div className={classes.rootPage}>
                <AppLink navigationAddress="/join" text="Join/Create room" />
            </div>
        </>
    )
}