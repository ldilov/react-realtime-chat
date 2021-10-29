import React, {useEffect} from "react";

// CSS
import styles from '../../styles/InputError.Module.css';

// MaterialUI Components
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import useCustomStyles from "../../hooks/useCustomStyles";

// Constants
const ERR_TIMEOUT_SECONDS = 4;

// Component
const InputError = props => {
    const {errors, updateErrors, inputRef} = props;
    const [customStyles] = useCustomStyles();

    useEffect(() => {
        const timer = setTimeout(() => {
            updateErrors([]);
        }, ERR_TIMEOUT_SECONDS * 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [errors, updateErrors])

    if (!errors || errors.length < 1) {
        return null;
    }

    const errorElements = errors.map((err, index) => {
        return (
            <li key={index} className={styles.errorMsg}>{err}</li>
        );
    })

    return (
        <Popper
            placement="bottom"
            disablePortal={false}
            modifiers={[
                {
                    name: 'flip',
                    enabled: true,
                    options: {
                        altBoundary: true,
                        rootBoundary: 'document',
                        padding: 8,
                    },
                },
                {
                    name: 'preventOverflow',
                    enabled: true,
                    options: {
                        altAxis: true,
                        altBoundary: true,
                        tether: true,
                        rootBoundary: 'document',
                        padding: 8,
                    },
                }
            ]}
            anchorEl={inputRef}
            open={errors.length > 0}>
            <Alert severity="error" variant="filled">
                <AlertTitle>Error</AlertTitle>
                <ul>
                    {errorElements}
                </ul>
            </Alert>
            <Box
                sx={customStyles.arrow}
            />
        </Popper>
    );
};

export default React.memo(InputError);
