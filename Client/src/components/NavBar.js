import React, { useState } from 'react'
import { Link } from 'react-router-dom';

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
import { connect } from 'react-redux';

const NavBar = () => {
    const [ isOpen, setIsopen ] = useState( false )
    
    const toggle = () => {
        setIsopen( !isOpen);
    }

    return (
        <React.Fragment>
        <Navbar color="dark" dark expand="sm" className="mb-5 bg-blue">
                    <Container fluid={true}>
                        <NavbarBrand href='/'>TrackIt
            </NavbarBrand>
                        <NavbarToggler onClick={ toggle } />
                        <Collapse isOpen={ isOpen } navbar>
                            <Nav className="ml-auto" navbar>

                                <NavItem>
                                    <NavLink>
                                        <Link to='/' style={ { color: 'white', textDecoration: 'none' } }>Home</Link>
                                    </NavLink>
                                </NavItem>
                              
                                <NavItem>
                                    <NavLink>
                                        <Link to="" style={ { color: 'white', textDecoration: 'none' } }>Logout</Link>
                                    </NavLink>
                                </NavItem>
                               
                                <NavItem>
                                    <NavLink>
                                        <a href="https://github.com/seyi-js/Ecommerce-App/" target="_blank" style={ { color: 'white', textDecoration: 'none' } }><i className="fab fa-github"></i> GitHub </a>
                                    </NavLink>
                                </NavItem>
                                
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
              
        
    </React.Fragment>
    )
}


export default NavBar