import React, { useState } from 'react';
import { Form, FormGroup,
  Label, FormText, Container, Input } from 'reactstrap';
import { isEmail, isEmpty, contains } from 'validator';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import FlashAlert from '../../common/FlashAlert';

const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [hasSucceed, setHasSucceed] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const parsed = queryString.parse(props.location.search);
  
  const handleEmailChange = event => {
    const inputEmail = event.target.value;
    
    switch(isEmail(inputEmail)){
      case true:
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
      setHasFailed(true);
      setAlertType('error');
      setAlertMessage('Password cannot be empty or contains space');
    } else if (inputPassword.length < 12) {
      setHasFailed(true);
      setAlertType('error');
      setAlertMessage('Password must be at least 12 characters');
    } else {
      setPassword(inputPassword);
    }
  }
  const loginFunction = () => {
    fetch(`${process.env.REACT_APP_baseURL}/auth/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(result => {
      switch(result.status) {
        case 'success':
          setHasSucceed(true);
          setAlertType('success');
          setAlertMessage(result.message);
          break;
        default:
          setHasFailed(true);
          setAlertType('error');
          setAlertMessage(result.message);
      }
      return result.data;
    })
    .then((data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('level', data.user_level === 'admin' ? 1 : 2);
    })
    .catch(error => error);
  }
  const handleClickSubmit = event => {
    event.preventDefault();
    loginFunction();
  }
  const handleEnterPress = event => {
    event.preventDefault();
    if (event.key === "Enter") { loginFunction() }
  }

  let alertComponent;
  if (hasSucceed) {
    alertComponent = (
      <FlashAlert type={alertType} message={alertMessage}></FlashAlert>
    ); 
    const previous = parsed.previousPage;
    const url = previous && previous !== '/sign-up' ? previous : '/';
    return <Redirect to={url}></Redirect>
  }
  if (hasFailed) {
    alertComponent = (
      <FlashAlert type={alertType} message={alertMessage}></FlashAlert>
    );
  }

  return (
    <Container className="my-5">
      {alertComponent}
      <h3 className="text-center">Login Form</h3>
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

export default LoginPage;