import React, {useState, useEffect} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useSubscription } from '@apollo/client';
import Form from './components/Form/Form.jsx';
import Message from './components/Message/Message';
import Spinner from './components/Spinner/Spinner';
import config from './config.js';
import './index.scss';

function App () {
    const [checking] = useMutation(config['check']);
    const [adding] = useMutation(config['add']);
    const [deleting] = useMutation(config['delete']);
    const { data, loading, error } = useSubscription(config['subscription']);
    const {
        loginWithRedirect, logout, isAuthenticated, loading: authLoading
    } = useAuth0();

    function toggleToDo(id, checked){
        const variables = { 'id':id, 'checked': !checked };
        checking({ variables });
    }

    function deleteToDo(id){
        const variables = {'id':id};
        deleting({ variables });
    }

    function addToDo(inputValue){
        const variables = {'task':{'taskName': inputValue}};
        adding({ variables });
    }

    if (loading || authLoading) {
        return(
            <div>
                <Spinner/>
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
          <header>
              Please log in
              <button onClick={() => loginWithRedirect()}>Log In</button>
          </header>
              
        );
    }

    if (error){
        return(
            <div>
                <Message messageText={'Error :( \n Check your connection'} />
                <Spinner/>
            </div>
        )
    }

    return(
        <div>
            <header>
                Stuff I need to do:
                <button onClick={() => logout()}>Log out</button>
            </header>
            <Form ToDoList={data.ToDoList} onToggle={toggleToDo} 
            deleteTask={deleteToDo} onCreate={addToDo}/>
        </div>
    )
}

export default App;