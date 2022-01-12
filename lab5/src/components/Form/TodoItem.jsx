import React from 'react';
import PropTypes from 'prop-types';
import classes from './Form.scss';

function ToDoItem({task, setChecked, deleteTask}){
    return (
        <li className={task.Checked? classes.checked : ``} onClick={() => setChecked(task.id, task.Checked) }>
            {task.taskName}
            &nbsp;
            ({task.Date})
            <span className={classes.close} onClick={() => deleteTask(task.id)}>
                &times;
            </span>
        </li>
    )
}

ToDoItem.propTypes = {
    task: PropTypes.object.isRequired,
    setChecked: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
}

export default ToDoItem;
