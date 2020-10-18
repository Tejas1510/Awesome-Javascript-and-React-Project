import React, { useContext, useState } from 'react';
import { Container,Form,Button,FormGroup,Label,Col,Input,Row,Card,CardBody,CardHeader,CardFooter } from 'reactstrap';

import firebase from "firebase/app"
//it will automatically kick in the app.js and acces auth and config

import { UserContext } from '../context/UserContext';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = ()=>{
  const context = useContext(UserContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = ()=>{
        firebase.auth()
            .signInWithEmailAndPassword(email,password)
            .then(re=>{
                console.log(re)
                context.setUser({email: re.user.email, uid:re.user.uid})
            })
            .catch(err=>{
                console.log(err)
                toast(err.message, {
                    type: "error"
                })
            })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        handleSignUp();
    }

    if(context.user?.uid)
    {
        return <Redirect to="/"></Redirect>
    }
    else{
        return (
            <Container className='text-center'>
                <Row>
                    <Col lg={6} className='offset-lg-3 mt-5'>
                        <Card>
                            <Form onSubmit={handleSubmit}>
                                <CardHeader className=''>SignIn here</CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                        <Label for='email' sm={3}>
                                            Email
                                        </Label>
                                        <Col sm={9}>
                                            <Input
                                                type='email'
                                                name='email'
                                                id='email'
                                                placeholder='provide your email'
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for='password' sm={3}>
                                            Password
                                        </Label>
                                        <Col sm={9}>
                                            <Input
                                                type='password'
                                                name='password'
                                                id='password'
                                                placeholder='your password here'
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                                <CardFooter>
                                    <Button type='submit' block color='primary'>
                                        Sign In
                                    </Button>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SignUp