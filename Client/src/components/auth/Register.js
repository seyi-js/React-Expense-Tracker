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
import { register } from '../../actions/Action'
import store from '../../store';
const Register = ( props ) => {
    const [ message, setMessage ] = useState( null );
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const history = useHistory()
    const onSubmit = ( e ) => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
            password2
        }
        store.dispatch(register( newUser ))
        

    }
    useEffect( () => {
        const { error} = props;
        const { isAuthenticated } = props.transaction;
        console.log(isAuthenticated)
        if ( error.id === 'REGISTER_FAIL' ) {
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
                <h1 className="text-center" style={ { marginBottom: "10px" } }>Register to start Tracking Your Expenses</h1>
            { message ? <Alert color="danger">{ message }</Alert> : null }
        <Form onSubmit={onSubmit} >
        <FormGroup>
            <Label for="name">Name</Label>
           
            <Input type="text" name="name" id="name" placeholder="Enter Name" className="mb-3" onChange={e => setName(e.target.value) } />
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Enter Email" className="mb-3" onChange={e => setEmail(e.target.value) } />
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Enter Password" className="mb-3"
                onChange={e => setPassword(e.target.value) } />
            <Label for="password">Confirm Password</Label>
            <Input type="password" name="password2" id="password2" placeholder="Confirm Password"
                className="mb-3" onChange={ e => setPassword2(e.target.value) } />
            <Button color="dark" style={ { marginTop: "2rem" } } block>
                Register
    </Button>
        </FormGroup>
    </Form>
    
    <p> Already have an account? <span><Link to="/login" >Login </Link></span></p>
    </div>
        </>
    )
}

const mapStateToProps = state => ( {
    transaction: state.transaction,
    error : state.error
})
export default connect(mapStateToProps, {register})(Register)