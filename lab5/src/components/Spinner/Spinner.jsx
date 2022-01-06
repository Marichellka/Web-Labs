import React from 'react';
import PropTypes from 'prop-types';
import ClockLoader from "react-spinners/ClockLoader";
import variables from '../../shared/scss/_shared.scss';
import classes from './Spinner.scss';

function Spinner({visibility}) {
    return( 
        <div className={`${classes.spinner} ${visibility? ``: classes.none}`}>
            <ClockLoader color={variables.spinnercolor} loading={true} size={300} />
        </div>
    );
};

Spinner.propTypes = {
    visibility: PropTypes.bool.isRequired
}

export default Spinner;