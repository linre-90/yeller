import { createUseStyles } from "react-jss"

const styles = createUseStyles({
    chatMessage:{
        boxSizing: "border-box",
        width: "100%",
        borderRadius: "5px",
        padding: "10px",
        color: "white",
        backgroundColor: "rgb(50, 74, 110)"
    },user:{
        marginRight: "20px",
        border: "1px solid white",
        padding: "5px",
        borderRadius: "5px",
        cursor: "pointer"
    },
    chatMessageHighlight: {
        color: "yellow",
    }
});


/**
 * Render single chat message
 * @param {{user: string, message: string, handleUsernameCopy: (username: string) => void, highlight: boolean}} props 
 */
export const Message = ({user, message, handleUsernameCopy, highlight}) => {
    const classes = styles();

    /**
     * Copy username to message.
     * @param {String} text 
     */
    const copyUsername = (text) => {
        handleUsernameCopy(`@${text} `);
    }
    if(highlight){
        return(
            <div className={classes.chatMessage}>
                <p className={classes.chatMessageHighlight}><span onClick={() => copyUsername(user)} className={classes.user}>{user}</span>{message}</p>
            </div>
        )
    }
    return(
        <div className={classes.chatMessage}>
            <p><span onClick={() => copyUsername(user)} className={classes.user}>{user}</span>{message}</p>
        </div>
    )
    
}