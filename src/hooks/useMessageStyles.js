import useAuth from "./useAuth";

const useMessageStyles = (uid) => {
    const [authData] = useAuth();
    const currentUserId = authData.user_id;

    let styles = null;

    if(uid === currentUserId){
        styles = require('../styles/MessageSent.Module.css');
    } else {
        styles =  require('../styles/MessageResponse.Module.css');
    }

    return {styles};
}

export default useMessageStyles;
