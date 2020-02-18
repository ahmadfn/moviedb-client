import React from 'react';
import { useLocation } from 'react-router-dom';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';

const DropwdownNavItem = (props) => {
  const location = useLocation();

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('level');
    window.location.reload();
  }

  if (localStorage.getItem('token') && localStorage.getItem('level') === '1') {
    return (
      <Nav navbar>
        <NavItem>
          <NavLink href="/add-movie">Add movie</NavLink>
          <button
            className="btn btn-outline-dark border-0 px-1"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </NavItem>
      </Nav>
    );
  } else if (localStorage.getItem('token')) {
    return (
      <Nav navbar>
        <NavItem>
          <Button onClick={handleLogoutClick}>Logout</Button>
        </NavItem>
      </Nav>
    );
  } else {
    const signUpUrl = `/sign-up?previousPage=${location.pathname}`;
    const loginUrl = `/login?previousPage=${location.pathname}`;
    
    return (
      <Nav navbar>
        <NavItem>
          <NavLink className="text-dark" href={signUpUrl}>Sign Up</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="text-dark" href={loginUrl}>Sign In</NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default DropwdownNavItem;