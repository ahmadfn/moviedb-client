import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Collapse, Navbar, NavbarToggler,
  NavbarBrand, NavLink
} from 'reactstrap';
import DropdownNav from './DropdownNav';

const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [movieToFind, setMovieToFind] = useState('');
  const [searchInputIsFilled, setSearchInputIsFilled] = useState(false);

  const toggleNavbar = () => setCollapsed(!collapsed);
  const searchUrl = `/search?title=${movieToFind.toLowerCase()}`;

  const handleSearchTitleChange = event => {
    const title = event.target.value;
    const titleToFind = title.trim().split(' ').join('+');
    setMovieToFind(titleToFind);
  }
  const searchResult = () => {
    setSearchInputIsFilled(true);
    sessionStorage.setItem('reload', true);
  }
  const handleSearchClick = event => {
    event.preventDefault();
    searchResult();
  }
  const handleEnterPress = event => {
    event.preventDefault();
    if (event.key === "Enter") {
      searchResult();
    }
  }

  if (searchInputIsFilled) {
    return <Redirect to={searchUrl}></Redirect>
  }

  return (
    <div className="container-fluid px-0">
      <Navbar className="bg-info py-3" light>
        <NavbarBrand href="/" className="mr-auto">MovieDB</NavbarBrand>
        <div>
          <NavLink href="/movies" className="text-dark">
            Browse All Movies
          </NavLink>
        </div>
        <div>
          <NavLink href="/genres" className="text-dark">
            Browse by Genre
          </NavLink>
        </div>
        <form className="mx-5 w-50">
          <input
            type="search"
            className="mx-1 border border-dark bg-info rounded py-1 w-50 pl-2"
            placeholder="Find by title"
            onChange={handleSearchTitleChange}
          />
          <button
            className="border-0 rounded p-2 bg-info"
            onClick={handleSearchClick}
            onKeyPress={handleEnterPress}
          >
            <i className="fa fa-search"></i>
          </button>
        </form>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <DropdownNav></DropdownNav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;