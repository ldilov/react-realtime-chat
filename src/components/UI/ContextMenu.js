import React, {useState} from "react";

// Material UI Components
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';

// Stylesheets
import styles from '../../styles/Context.Module.css';


const ContextMenuMemo = props => {
    const {xPos, yPos, showMenu} = props;
    const [copyData, setCopyData] = useState(null);

    if(!showMenu) {
        return null;
    }

    const clickCopyHandler = () => {
        setCopyData(window.getSelection().toString());
    }

    const clickPasteHandler = () => {
        const pasteText = document.querySelector("textarea");
        pasteText.focus();
        pasteText.value = copyData;
    }

    return (
        <div className={styles.contextContainer}>
            <Paper sx={{ width: 300, maxWidth: '20%', position: 'fixed', transform: `translate3d(${xPos}, ${yPos}, 0)`}}>
                <MenuList>
                    <MenuItem onClick={clickCopyHandler}>
                        <ListItemIcon>
                            <ContentCut fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Cut</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘X
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={clickCopyHandler}>
                        <ListItemIcon>
                            <ContentCopy fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Copy</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘C
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={clickPasteHandler}>
                        <ListItemIcon>
                            <ContentPaste fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Paste</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘V
                        </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <Cloud fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Web Clipboard</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
        </div>
    );
};

const ContextMenu = React.memo(ContextMenuMemo);
export default ContextMenu;
