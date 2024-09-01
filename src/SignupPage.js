import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
} from 'mdb-react-ui-kit';
import LogoPic from "./LogoPic.png";
import { useRef } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import db, { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { changeDisplayName } from './features/counter/userSlice';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';

const SignupPage = () => {

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = () => {


        if (passwordRef.current.value !== null && emailRef.current.value !== null && nameRef.current.value !== null) {
            if (passwordRef.current.value === confirmPasswordRef.current.value) {
                const newUser = {
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    displayName: nameRef.current.value
                };
                createUserWithEmailAndPassword(
                    auth,
                    newUser.email,
                    newUser.password
                ).then(async user => {
                    if (user) {
                        updateProfile(auth.currentUser, {
                            displayName: newUser.displayName
                        });



                        const usersCollectionRef = collection(db, `users`);
                        const newUser2 = {
                            displayName: newUser.displayName,
                            email: newUser.email,
                            householdId: null,
                            uid: user.user.uid
                        };

                        // const docRef = doc(usersCollectionRef);
                        // await setDoc(docRef, newUser2);
                        // console.log(docRef.id)

                        addDoc(usersCollectionRef, newUser2);

                        dispatch(changeDisplayName(newUser));
                        navigate("/");
                    }
                }).catch(error => console.log(error.message))






            };


        };
    };
    return (
        <Container className="my-5">

            <Card>
                <Row className='g-0'>

                    <Col md='6'>
                        <Card.Img sizes="sm" src={LogoPic} className='img-fluid' />
                    </Col>

                    <Col md='6'>
                        <Card.Body className='d-flex flex-column'>

                            <div className='d-flex flex-row mt-2'>
                                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                                <span className="h1 fw-bold mb-0">Share my Bills</span>
                            </div>

                            <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Create an Account</h5>

                            <MDBInput wrapperClass='mb-4' ref={nameRef} label='Name' id='formControlLg' type='text' size="lg" required />
                            <MDBInput wrapperClass='mb-4' ref={emailRef} label='Email address' id='formControlLg' type='email' size="lg" required />
                            <MDBInput wrapperClass='mb-4' ref={passwordRef} label='Password' id='formControlLg' type='password' size="lg" required />
                            <MDBInput wrapperClass='mb-4' ref={confirmPasswordRef} label='ConfirmPassword' id='formControlLg' type='password' size="lg" required />


                            <Button className="mb-4 px-5" color='dark' size='lg' onClick={() => handleSubmit()}>Sign Up</Button>
                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Have an account? <a href="/" style={{ color: '#393f81' }}>Login here</a></p>

                            <div className='d-flex flex-row justify-content-start'>
                                <a href='/' className="small text-muted me-1" disabled>Terms of use.</a>
                                <a href='/' className="small text-muted">Privacy policy</a>
                            </div>

                        </Card.Body>
                    </Col>

                </Row>
            </Card>

        </Container>
    )
};


export default SignupPage;