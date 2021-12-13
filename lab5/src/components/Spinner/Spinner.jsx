import React from 'react';
import ClockLoader from "react-spinners/ClockLoader";

import classes from './Spinner.scss';

function Spinner() {
    return( 
        <div className={classes.spinner}>
            <ClockLoader color='#576b8f' loading={true} size={300} />
        </div>
    );
};

export default Spinner;