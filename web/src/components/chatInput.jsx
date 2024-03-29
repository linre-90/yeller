import React, { useEffect, useState, useRef } from "react";
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
    },
    leaveBtn: {
        display: "flex",
        padding: "5px",
        paddingTop: "20px",
        paddingBottom: "20px",
    }
});


/**
 * Render chat input filed component.
 * @param {{handleMessageSend: (arg0: String) =>void, handleLeave: () => void, respondUser: string, resetRespondUser: () => void}} props 
 * @returns 
 */
export const ChatInput = ({handleMessageSend, handleLeave, respondUser, resetRespondUser}) => {
    const classess = styles();
    const messageTextRef = useRef(null)
    const [message, setMessage] = useState("");

    /**
     * Submit message form.
     * @param {React.FormEvent} event 
     */
    const handleMessageSubmit = (event) => {
        if(event !== null){
            event.preventDefault();
        }
        handleMessageSend(message);
        setMessage("");
        resetRespondUser();
    }

    /**
     * Submit form on enter press.
     * @param {React.KeyboardEvent} event 
     */
    const onTextAreaKeyDown = (event) => {
        if(event.key !== null && event.key === "Enter"){
            event.preventDefault();
            if(message.length > 0){
                handleMessageSubmit(null);
            }
        }
    }

    // Add respond user To message.
    useEffect(() => {
        if(respondUser !== undefined && respondUser.length > 0){
            setMessage(respondUser + " " + message);
            if(messageTextRef.current !== null){
                messageTextRef.current.focus();
            }
        }
    }, [respondUser]);

    return(
        <div className={classess.chatInput}>
            <form className={classess.form} onSubmit={handleMessageSubmit}>
                <textarea 
                    ref={messageTextRef}
                    minLength={1}
                    maxLength={300}
                    className={classess.writeBox}
                    value={message} 
                    onChange={(event) => setMessage(event.target.value)} 
                    onKeyDown={(event) => onTextAreaKeyDown(event)}
                ></textarea>
                <input className={classess.submit} type="submit" value={"send"} />
            </form>
            <div className={classess.leaveBtn}>
                <AppButton text="leave" actionCallback={handleLeave}/>
            </div>
        </div>
    )
}