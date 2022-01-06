import React from 'react';
import PropTypes from 'prop-types';
import classes from './Message.scss';

function Message({visibility, setVisibility}){
    return <div className={`${classes.message} ${visibility? ``: classes.none}`} >
        {'Error :( \n Check your connection'}
        <span onClick={() => setVisibility(false)}>Ok</span>
        </div>;
};

Message.propTypes = {
    visibility: PropTypes.bool.isRequired,
    setVisibility: PropTypes.func.isRequired
}

export default Message;