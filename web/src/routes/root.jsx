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
        color: "yellow",
        fontSize: "1.5rem",
        textAlign: "center",
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
            <p className={classes.helptext}>Seeking info about Yeller? Visit: <AppLink navigationAddress="/help" text="Get help!"/></p>
            <div className={classes.rootPage}>
                <AppLink navigationAddress="/join" text="Join/Create room" />
            </div>
        </>
    )
}