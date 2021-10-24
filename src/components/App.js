import React, {useEffect, useState} from "react";
import ChatBox from "./UI/ChatBox";
import SideBar from "./UI/SideBar";
import styles from '../styles/App.Module.css';
import ContextMenu from "./UI/ContextMenu";
import Navigation from "./UI/Navigation";
import Fab from '@mui/material/Fab';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const App = props => {
    const [context, setContext] = useState({
        xPos: `${0}px`,
        yPos: `${0}px`,
        showMenu: false,
    });

    const [isOpen, setIsOpen] = useState(false);

    const IconDrawer = () => !isOpen
        ? <FormatAlignJustifyIcon />
        : <HighlightOffIcon />

    const handleClick = () => {
        setContext({
            ...context,
            showMenu: false
        });
    }

    const handleClickDrawer = () => {
        setIsOpen(!isOpen);
    };

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
            document.removeEventListener("contextmenu", ctxMenu);
        }
    }, []);


    return (
        <>
            <Navigation isOpen={isOpen} onClick={handleClickDrawer}/>
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
            <Fab color="primary" aria-label="add" sx={customStyles.navIcon} onClick={handleClickDrawer}>
               <IconDrawer />
            </Fab>
        </>
    );
}

const customStyles = {
  navIcon: {
      position: 'fixed',
      right: 1,
      bottom: 1
  }
};

export default App;
