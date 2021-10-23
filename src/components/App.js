import React, {useEffect, useState} from "react";
import ChatBox from "./UI/ChatBox";
import SideBar from "./UI/SideBar";
import styles from '../styles/App.Module.css';
import ContextMenu from "./UI/ContextMenu";

const App = props => {
    const [context, setContext] = useState({
        xPos: `${0}px`,
        yPos: `${0}px`,
        showMenu: false,
    });

    const handleClick = () => {
        setContext({
            ...context,
            showMenu: false
        });
    }

    const handleContextMenu = (e) => {
        e.preventDefault();

        setContext({
            xPos: `${e.pageX}px`,
            yPos: `${e.pageY}px`,
            showMenu: true,
        });
    }

    useEffect(() => {
        document.addEventListener("click", handleClick)
        let ctxMenu = document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener(ctxMenu);
        }
    }, []);


    return (
        <>
            <ContextMenu {...context} />
            <div className={styles.container}>
                <div className={styles.sideBar}>
                    <SideBar />
                </div>
                <div className={styles.badge}>
                    <i className={styles.left}></i>
                    BETA
                </div>
                <div className={styles.main}>
                    <ChatBox />
                </div>
            </div>
        </>
    );
}

export default App;
