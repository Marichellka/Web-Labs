import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './TodoItem';
import classes from './Form.scss';

function Form ({ToDoList, onToggle, deleteTask, onCreate}) {
    const [newTodo, setNewTodo] = useState('');

    function addHandler(event) {
        event.preventDefault();
        if(newTodo!=''){
            onCreate(newTodo);
            setNewTodo('');
        }
    }

    return (
        <form className={classes.toDoForm} onSubmit={addHandler}>
            <ul className={classes.list}>
                {ToDoList.sort((a,b)=>{b.id-a.id}).map(task=> {
                    return (
                        <ToDoItem 
                            task={task} 
                            key={task.id} 
                            setChecked={onToggle}
                            deleteTask={deleteTask}
                        />
                    )
                })}
            </ul>
            <div className={classes.newTask}>
                <input placeholder="Title..." value={newTodo} 
                onChange={event => setNewTodo(event.target.value)}/>
                <button type="submit" className={classes.addButton} >Add</button>
            </div>
        </form>
    );
};

Form.propTypes = {
    ToDoList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle: PropTypes.func.isRequired, 
    deleteTask: PropTypes.func.isRequired,
    onCreate:  PropTypes.func.isRequired
}

export default Form;