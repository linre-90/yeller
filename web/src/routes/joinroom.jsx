import { createUseStyles } from "react-jss"
import { JoinNamedRoom } from "../components/appForms";
import { useNavigate } from "react-router-dom";
import React from "react";

const styles = createUseStyles({
    formContainer: {
        width:"33%",
        margin: "auto"
    },
    formHeader: {
        fontSize: "2rem",
        color: "white"
    }
});


/**
 * @typedef {Object} formData
 * @property {String} username
 * @property {String} roomName
 */

/**
 * Render join room page.
 * @returns {React.JSX.Element}
 */
export const JoinRoom = () => {
    const classes = styles();
    const navigate = useNavigate();

    /**
     * Handle join room form submission.
     * @param {formData} formData 
     */
    const handleJoinRoomSubmit = (formData) => navigate(`/chat/${formData.roomName}/${formData.username}`);

    return(
        <div className={classes.formContainer}>
            <p className={classes.formHeader}>Join/Create room</p>
            <JoinNamedRoom formSubmitHandler={handleJoinRoomSubmit} />
        </div>
    )
}