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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {


    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        // e.preventDefault();

        if (passwordRef.current.value !== null && emailRef.current.value !== null) {
            signInWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            ).then(user => user ? navigate("/") : null).catch(error => alert(error.message))

            // e.target["email"].value = null;
            // e.target["password"].value = null;

            // console.log(emailRef.current.value);
            // console.log(passwordRef.current.value);
        }
    }

    return (
        <MDBContainer className="my-5">

            <MDBCard>
                <MDBRow className='g-0'>

                    <MDBCol md='6'>
                        <MDBCardImage sizes="sm" src={LogoPic} className='img-fluid' />
                    </MDBCol>

                    <MDBCol md='6'>
                        <MDBCardBody className='d-flex flex-column'>

                            <div className='d-flex flex-row mt-2'>
                                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                                <span className="h1 fw-bold mb-0">Share my Bills</span>
                            </div>

                            <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                            <MDBInput wrapperClass='mb-4' ref={emailRef} label='Email address' id='formControlLg' type='email' size="lg" required />
                            <MDBInput wrapperClass='mb-4' ref={passwordRef} label='Password' id='formControlLg' type='password' size="lg" required />

                            <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={() => handleSubmit()}>Login</MDBBtn>
                            <a className="small text-muted" href="#!">Forgot password?</a>
                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="signup" style={{ color: '#393f81' }}>Register here</a></p>

                            <div className='d-flex flex-row justify-content-start'>
                                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                                <a href="#!" className="small text-muted">Privacy policy</a>
                            </div>

                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>

        </MDBContainer>
    )
};


export default LoginPage;