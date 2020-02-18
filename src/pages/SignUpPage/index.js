import React, { useState } from 'react';
import { Form, FormGroup, Label,
  FormText, Container, Input } from 'reactstrap';
import { isEmail, isEmpty, contains, isLength } from 'validator';
import FlashAlert from '../../common/FlashAlert';

const SignUpPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  
  const handleEmailChange = event => {
    const inputEmail = event.target.value;

    switch(isEmail(inputEmail)){
      case 'true':
        setEmail(inputEmail);
        break;
      default:
        setAlertType('error');
        setAlertMessage('Please input a valid email address');
    }
  }
  const handlePasswordChange = event => {
    const inputPassword = event.target.value;
    
    if (isEmpty(inputPassword) && contains(inputPassword, ' ')) {
      setAlertType('error');
      setAlertMessage('Password cannot be empty or contains space');
    } else if (isLength(inputPassword) < 12) {
      setAlertType('error');
      setAlertMessage('Password must be at least 12 characters');
    } else {
      setPassword(inputPassword);
    }
  }
  const signUpFunction = event => {
    fetch(`${process.env.REACT_APP_baseURL}/users`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(result => {
      setAlertType(result.status);
      switch(result.status) {
        case 'success':
          setAlertMessage(result.message);
          break;
        default:
          setAlertMessage(result.message);
      }
    })
    .catch(error => error);
  }
  const handleClickSubmit = event => {
    event.preventDefault();
    signUpFunction();
  }
  const handleEnterPress = event => {
    event.preventDefault();
    if (event.key === 'Enter') { signUpFunction() }
  }

  let alertComponent;
  if (!isEmpty(alertMessage)) {
    alertComponent = (
      <FlashAlert type={alertType} message={alertMessage}></FlashAlert>
    );
  }

  return (
    <Container>
      {alertComponent}
      <h3 className="text-center my-5">Sign Up Form</h3>
      <Form>
        <FormGroup>
          <Label for="userEmail">Email*</Label>
          <Input type="email" name="email" id="userEmail"
            placeholder="Enter your email here"
            onChange={handleEmailChange} 
          />
        </FormGroup>
        <FormGroup>
          <Label for="userPassword">Password*</Label>
          <Input type="password" name="password" id="userPassword"
            placeholder="Enter your password here"
            onChange={handlePasswordChange}
          />
          <FormText color="muted">
            Password must be at least 12 characters
          </FormText>
        </FormGroup>
        <FormText color="muted">*Required</FormText>
        <button
          className="my-2 btn btn-primary"
          onClick={handleClickSubmit}
          onKeyPress={handleEnterPress}
        >
          Submit
        </button>
      </Form>
    </Container>
  );
}

export default SignUpPage;