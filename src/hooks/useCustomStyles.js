import {useState} from "react";

const initStyles = {
    LoadingButton: {
        borderRadius: "10px",
        backgroundColor: "inherit",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        padding: "15px 26px",
        fontSize: "16px",
        "&:hover": {
            background: "#03e9f4",
            color: "#141e30",
            borderRadius: "5px",
            boxShadow: "0 0 5px #03e9f4, 0 0 15px #03e9f4, 0 0 2px #03e9f4, 0 0 1px #03e9f4",
        },
        "&:disabled": {
            background: "#03e9f4",
            color: "#141e30",
        }
    },
    arrow: {
        position: "relative",
        mt: "10px",
        "&::before": {
            backgroundColor: "#d32f2f",
            content: '""',
            display: "block",
            position: "absolute",
            width: '1rem',
            height: '1rem',
            top: -18,
            transform: "rotate(45deg)",
            left: "calc(50% - 6px)"
        }
    },
    listItemIcon: {
        color:'white',
        "&:hover":{
            color: 'black'
        }
    },
    listItem: {
        "&:hover":{
            backgroundColor: 'white',
            color: 'black',
            "& > .itemIcon":{
                color: 'black !important',
            },
        },
    },
    drawer: {
        backgroundColor: "#121212",
        color: "white",
    }
}

const useCustomStyles= () => {
    const [state, setState] = useState(initStyles);

    const addCustomStyle = (styleObj) => {
        setState({
            ...state,
            styleObj
        });
    }

    return [ state, addCustomStyle ]
}

export default useCustomStyles;
