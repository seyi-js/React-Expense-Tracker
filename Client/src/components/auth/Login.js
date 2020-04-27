import React, { useState, useEffect } from 'react'
import {useHistory, Redirect, Link} from 'react-router-dom'
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux'
import { login } from '../../actions/Action'
import store from '../../store';
const Login = ( props ) => {
    const [ message, setMessage ] = useState( null );
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const history = useHistory()
    const onSubmit = ( e ) => {
        e.preventDefault();
        const newUser = {
            
            email,
            password,
            
        }
        store.dispatch(login( newUser ))
        

    }
    useEffect( () => {
        const { error} = props;
        const { isAuthenticated } = props.transaction;
        console.log(isAuthenticated)
        if ( error.id === 'LOGIN_FAIL' ) {
            setMessage( error.msg.msg )
        } else {
            setMessage( null )
            if ( isAuthenticated ) {
                history.push('/expenses')
            }
    
        }

       
    } )
    
    return (
        <>
            <div className="container ">
                <h1 className="text-center" style={ { marginBottom: "10px" } }>Login to start Tracking Your Expenses</h1>
            { message ? <Alert color="danger">{ message }</Alert> : null }
        <Form onSubmit={onSubmit} >
        <FormGroup>
           
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Enter Email" className="mb-3" onChange={e => setEmail(e.target.value) } />
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Enter Password" className="mb-3"
                onChange={e => setPassword(e.target.value) } />
           
            <Button color="dark" style={ { marginTop: "2rem" } } block>
                Register
    </Button>
        </FormGroup>
    </Form>
    
    <p> New here? <span><Link to="/register" >Register </Link></span></p>
    </div>
        </>
    )
}

const mapStateToProps = state => ( {
    transaction: state.transaction,
    error : state.error
})
export default connect(mapStateToProps, {login})(Login)