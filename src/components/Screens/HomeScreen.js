import React, {lazy, useEffect, useState, Suspense} from "react";

// Components
import SideBar from "../UI/SideBar";
import ContextMenu from "../UI/ContextMenu";
import Navigation from "../UI/Navigation";

// Material UI Components
import Fab from '@mui/material/Fab';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// Stylesheets
import styles from '../../styles/HomeScreen.Module.css';
import {Backdrop, CircularProgress} from "@mui/material";

// Lazy loads
const ChatBoxComponent = lazy(() => import('../UI/ChatBox'));

const HomeScreen = () => {
    const [context, setContext] = useState({
        xPos: `${0}px`,
        yPos: `${0}px`,
        showMenu: false,
    });

    const [isOpen, setIsOpen] = useState(false);

    const IconDrawer = () => !isOpen
        ? <FormatAlignJustifyIcon />
        : <HighlightOffIcon />

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
        const handleClick = () => {
            setContext({
                ...context,
                showMenu: false
            });
        }

        document.addEventListener("click", handleClick)
        let ctxMenu = document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("contextmenu", ctxMenu);
        }
    }, [setContext]);


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
                    <Suspense
                        fallback={
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={true}
                                onClick={null}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        }>
                        <ChatBoxComponent />
                    </Suspense>
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

export default HomeScreen;
