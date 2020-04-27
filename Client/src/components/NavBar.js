import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import store from '../store'
import { Redirect, Route } from 'react-router-dom';
import Heading from  './expensesComponents/Header'
import { logout } from '../actions/Action'
import { connect } from 'react-redux'
import Balance from './expensesComponents/Balance'
import IncomeExpenses from './expensesComponents/IncomeExpenses'
import TransactionList from './expensesComponents/TransactionList'
import AddTransaction from './expensesComponents/AddTransaction'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    Container
} from 'reactstrap';


const NavBar = (props) => {
    const [ isOpen, setIsopen ] = useState( false )
    const history = useHistory()
    const toggle = () => {
        setIsopen( !isOpen);
    }
    const redirect = (
        <React.Fragment>
        
            <Redirect to='/login' />
           
        </React.Fragment>
)
    const onLogout = () => {
        store.dispatch( logout() );
        history.push('/login')
    }
    const {isAuthenticated} = props.transaction
    return (
        <React.Fragment>
        <Navbar color="dark" dark expand="sm" className="mb-5 bg-blue">
                    <Container fluid={true}>
                        <NavbarBrand><Link to="/">TrackIt</Link>
            </NavbarBrand>
                        <NavbarToggler onClick={ toggle } />
                        <Collapse isOpen={ isOpen } navbar>
                            <Nav className="ml-auto" navbar>

                               
                              {isAuthenticated ?  <NavItem>
                                <NavLink>
                                    <Link  style={ { color: 'white', textDecoration: 'none' } } onClick={onLogout}>Logout</Link>
                                </NavLink>
                            </NavItem> : '' }
                               
                               
                                <NavItem>
                                    <NavLink>
                                        <a href="https://github.com/seyi-js/React-Expense-Tracker" target="_blank" style={ { color: 'white', textDecoration: 'none' } }><i className="fab fa-github"></i> GitHub </a>
                                    </NavLink>
                                </NavItem>
                                
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
              
                            {isAuthenticated ?  <div className="container">
                            <Route exact path="/expenses">
                            <Heading />
                                    <Balance />
                                    <IncomeExpenses/>
                                    <TransactionList/>
                                    <AddTransaction/>
                                    </Route>
                            </div> :  redirect  }         
               
    </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    transaction: state.transaction
})
export default connect(mapStateToProps, {logout})(NavBar)