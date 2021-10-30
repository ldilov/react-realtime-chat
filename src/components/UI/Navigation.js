import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";

// Custom Hooks
import useCustomStyles from "../../hooks/useCustomStyles";
import useAuth from "../../hooks/useAuth";

// Material UI Components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navigation = props => {
    const {isOpen, onClick} = props;
    const [customStyles] = useCustomStyles();
    const [authData, destroyAuthData] = useAuth();

    useEffect(() => {
        if(!authData){
            props.history.push('/login');
        }
    }, [authData, props.history])

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={onClick}
            onKeyDown={() => {}}
        >
            <List>
                <ListItem
                    button key="Sign Out"
                    sx={customStyles.listItem}
                    onClick={() => destroyAuthData()}
                >
                    <ListItemIcon sx={customStyles.listItemIcon} className="itemIcon">
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Drawer
            PaperProps={{
                sx:customStyles.drawer
            }}
            anchor='left'
            onClick={onClick}
            open={isOpen}
            onClose={() => {}}
        >
            {list('left')}
        </Drawer>
    );
}

export default React.memo(withRouter(Navigation));
