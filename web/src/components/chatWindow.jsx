import { useEffect, useRef } from "react";
import { createUseStyles } from "react-jss"

const styles = createUseStyles({
    chatWindow:{
        margin: "auto",
        width: "70%",
        backgroundColor: "rgb(23, 34, 51)",
        padding: "10px",
        height: "65vh",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        gap: "5px",
        borderRadius: "10px"
    },
    leaveBtnContainer:{
        width:"70%",
        margin: "auto"
    }
});


/**
 * Creates chat window that contains Message components
 * @param {{children: Message}} param0 
 * @returns 
 */
export const ChatWindow = ({children}) => {
    const chatWindowRef = useRef(null);

    useEffect(() => {
        if(chatWindowRef && chatWindowRef.current){
            chatWindowRef.current.scroll({top: chatWindowRef.current.scrollHeight, left: 0, behaviour:"smooth"});
        }
    },[children]);

    const classess = styles(); 
    return(
        <div>
            <div ref={chatWindowRef} className={classess.chatWindow}> 
                {children}
            </div>
        </div>
    )
}