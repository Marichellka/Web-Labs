import React, {useState} from 'react';
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
    const [oldData, setData] = useState(data);
    const {
        loginWithRedirect, logout, isAuthenticated, loading: authLoading
    } = useAuth0();
    const [spinner, setSpinner] = useState(false);
    const [message, setMessage] = useState(false);
    const [isoffline, setOffline] = useState(false);

    window.onoffline = () =>{
        setOffline(true);
    }

    window.ononline = () =>{
        setOffline(false);
    }

    if (data !== oldData) {
        setData(data);
        setSpinner(false);
    }

    function toggleToDo(id, checked){
        setSpinner(true);
        if(isoffline){
            setMessage(true);
        }
        else{
            const variables = { 'id':id, 'checked': !checked };
            checking({ variables });
        }
    }

    function deleteToDo(id){
        setSpinner(true);
        if(isoffline){
            setMessage(true);
        }
        else{
            const variables = {'id':id};
            deleting({ variables });
        }
    }

    function addToDo(inputValue){
        setSpinner(true);
        if(isoffline){
            setMessage(true);
        }
        else{
            const variables = {'task':{'taskName': inputValue}};
            adding({ variables });
        }
    }

    if (loading || authLoading) {
        return(
            <div>
                <Spinner visibility={true}/>
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
          <header>
              Please log in
              <button onClick={loginWithRedirect}>Log In</button>
          </header>
              
        );
    }

    if (error){
        return(
            <div>
                <Message visibility={message} setVisibility={setMessage} />
                <Spinner visibility={true}/>
            </div>
        )
    }

    return(
        <div>
            <header>
                Stuff I need to do:
                <button onClick={logout}>Log out</button>
            </header>
            <Form ToDoList={data.ToDoList} onToggle={toggleToDo} 
            deleteTask={deleteToDo} onCreate={addToDo}/>
            <Message visibility={message} setVisibility={(state) => {
                setMessage(state);
                setSpinner(false);
            }} />
            <Spinner visibility={spinner}/>
        </div>
    )
}

export default App;