import { createUseStyles } from "react-jss"
import { JoinNamedRoom } from "../components/appForms";
import { useNavigate } from "react-router-dom";

const styles = createUseStyles({
    formContainer:{
        width:"33%",
        margin: "auto"
    },
    formHeader: {
        fontSize: "2rem",
        color: "white"
    }
});

/**
 * Render join room form component
 * @returns 
 */
export const JoinRoom = () => {
    const classes = styles();
    const navigate = useNavigate();
    const handleUserSubmit = (formData) => {
        navigate(`/chat/${formData.roomName}/${formData.username}`)
    }

    return(
        <div className={classes.formContainer}>
            <p className={classes.formHeader}>Join/Create room</p>
            <JoinNamedRoom formSubmitHandler={handleUserSubmit} />
        </div>
    )
}