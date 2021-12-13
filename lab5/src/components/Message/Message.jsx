import React from 'react';
import PropTypes from 'prop-types';

import classes from './Message.scss';
import { useState } from 'react/cjs/react.development';

function Message({messageText}){
    const [messageVisibility, setMessageVisibility] = useState(true);

    return <div className={`${classes.message} ${messageVisibility? ``: classes.none}`} >
        {messageText}
        <span onClick={() => setMessageVisibility(false)}>Ok</span>
        </div>;
};

Message.propTypes = {
    messageText: PropTypes.string.isRequired
}

export default Message;