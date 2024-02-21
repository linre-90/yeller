import { createUseStyles } from "react-jss"

const styles = createUseStyles({
    helpPage: {
    "& p": {
        width: "100%",
        paddingTop: "20px",
        textAlign: "center",
        color: "white",
        margin: "auto"
    }}
});


/**
 * Render help pages.
 * @returns 
 */
export const Help = () => {
    const classes = styles();
    return(
        <div className={classes.helpPage}>
            <p>No this does not provide mental help for you weirdos... This is about Yeller app.</p>
            <p>1. If there is problem clear browser history...</p>
            <p>2. If there is problem clear browser history...</p>
            <p>3. If there is problem clear browser history...</p>
            <p>Last resort. Check mirror...</p>
        </div>
    )
}