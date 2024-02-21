import { createUseStyles } from "react-jss"
import { useState } from "react";

const styles = createUseStyles({
    formContainer: {
        width: "100%"
    },
    formLabel: {
        display: "block",
        color: "white",
        marginTop: "10px",
        marginBottom: "5px",
        width: "100%"
    },
    formInput: {
        border: "none",
        padding: "4px",
        borderRadius: "6px",
        width: "100%"
    },
    formSubmit: {
        width: "100%",
        display: "block",
        marginTop: "20px",
        color: "white",
        backgroundColor: "green",
        border: "none",
        padding: "5px",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "all .1s",
        "&:hover": {
            transform: "scale(1.1)"
        }
    }
});

/**
 * Render signup form.
 * @param {{formSubmitHandler: function}} props 
 */
export const JoinNamedRoom = ({ formSubmitHandler }) => {
    const [formFill, setFormFill] = useState({username: "", roomName: ""});
    const classes = styles();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add some random number to username.
        const randomNumber = Math.floor(Math.random() * 9999);
        const fullUsername = formFill.username.concat(randomNumber.toString());
        formSubmitHandler({ roomName: formFill.roomName, username: fullUsername });
    }

    return (
        <div className={classes.formContainer}>
            <form onSubmit={handleSubmit}>
            <label className={classes.formLabel}>Room name</label>
                <input 
                    className={classes.formInput} 
                    value={formFill.roomName} 
                    onChange={(event) => setFormFill({...formFill, roomName: event.target.value})} 
                    type="text" 
                    minLength={3}
                    maxLength={100} 
                    required />
                <label className={classes.formLabel}>Username</label>
                <input 
                    className={classes.formInput} 
                    value={formFill.username} 
                    onChange={(event) => setFormFill({...formFill, username: event.target.value})} 
                    type="text" 
                    minLength={3}
                    maxLength={200} 
                    required 
                />
                <input className={classes.formSubmit} type="submit" value="Submit" />
            </form>
        </div>
    )
}
