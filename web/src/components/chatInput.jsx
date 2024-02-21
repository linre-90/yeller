import { useState } from "react";
import { createUseStyles } from "react-jss"
import { AppButton } from "./appClicks";

const styles = createUseStyles({
    chatInput:{
        margin: "auto",
        width: "71%",
        display: "flex",
        marginTop: "5px"
    },
    form:{
        margin: "auto",
        width: "100%",
        display: "flex",
        gap: "10px",
        alignItems: "center"
    },
    writeBox: {
        resize:"none",
        flex: "10 1 auto",
        height: "100px",
        borderRadius: "10px",
        padding: "10px",
        fontSize: "1.rem",
        backgroundColor: "rgb(23, 34, 51)",
        border: "none",
        color: "white"
    },
    submit:{
        cursor: "pointer",
        height: "50px",
        width: "50px",
        borderRadius: "25px",
        border: "none",
        transition: "all .1s",
        "&:hover":{
            transform: "scale(1.1)"
        }

    }
});


export const ChatInput = ({handleMessageSend, handleLeave}) => {
    const classess = styles();
    const [message, setMessage] = useState("");

    const handleMessageSubmit = (event) => {
        if(event !== null){
            event.preventDefault();
        }
        handleMessageSend(message);
        setMessage("");
    }

    const onTextAreaKeyDown = (event) => {
        if(event.key !== null && event.key === "Enter"){
            handleMessageSubmit(null);
        }
    }

    return(
        <div className={classess.chatInput}>
            <form className={classess.form} onSubmit={handleMessageSubmit}>
                <textarea 
                    maxLength={300}
                    className={classess.writeBox}
                    value={message} 
                    onChange={(event) => setMessage(event.target.value)} 
                    onKeyDown={(event) => onTextAreaKeyDown(event)}
                ></textarea>
                <input className={classess.submit} type="submit" value={"send"} />
                <AppButton text="leave" actionCallback={handleLeave}/>
            </form>
        </div>
    )
}