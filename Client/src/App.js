import React, {useEffect}  from 'react';
import { Switch, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import NavBar from './components/NavBar'
import Login from './components/auth/Login'
import Heading from  './components/expensesComponents/Header'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {verifyUser} from './actions/Action'
import Register from './components/auth/Register'
import Balance from './components/expensesComponents/Balance'
import IncomeExpenses from './components/expensesComponents/IncomeExpenses'
import TransactionList from './components/expensesComponents/TransactionList'
import AddTransaction from './components/expensesComponents/AddTransaction'

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
                    
                    
                                        
                <div className="container">
                <Route exact path="/expenses">
                <Heading />
                        <Balance />
                        <IncomeExpenses/>
                        <TransactionList/>
                        <AddTransaction/>
                        </Route>
                </div>


                    
                    
                </React.Fragment>
                </Switch>
                </Provider>
        )
    
}


export default App
