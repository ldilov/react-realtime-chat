const useMessageStyles = (uid) => {
    const currentUserId = 1;

    let styles = null;

    if(uid === currentUserId){
        styles = require('../styles/MessageSent.Module.css');
    } else {
        styles =  require('../styles/MessageResponse.Module.css');
    }

    return {styles};
}

export default useMessageStyles;
