import React  from 'react';
import { Switch, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import Header from  './components/Header'
import './App.css'
import Balance from './components/Balance'
import IncomeExpenses from './components/IncomeExpenses'
import TransactionList from './components/TransactionList'
import AddTransaction from './components/AddTransaction'

export const App =()=> {


    
        return (
             <Provider store={store}>
                <Switch>
                    <React.Fragment>
                    
                    
                      <Header /> 

                <div className="container">
                        <Balance />
                        <IncomeExpenses/>
                        <TransactionList/>
                        <AddTransaction/>
                </div>


                    
                    
                </React.Fragment>
                </Switch>
                </Provider>
        )
    
}


export default App
