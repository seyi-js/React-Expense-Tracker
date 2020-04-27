import React, {useEffect}  from 'react';
import { Switch, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import NavBar from './components/NavBar'
import Login from './components/auth/Login'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {verifyUser} from './actions/Action'
import Register from './components/auth/Register'


export const App =()=> {

        useEffect( () => {
                store.dispatch(verifyUser())
        },[])
    
        return (
             <Provider store={store}>
                <Switch>
                    <React.Fragment>

                    <NavBar />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    
                    
               


                    
                    
                </React.Fragment>
                </Switch>
                </Provider>
        )
    
}


export default App
