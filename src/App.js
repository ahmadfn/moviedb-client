import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AllMoviesPage from './pages/AllMoviesPage';
import DetailPage from './pages/DetailPage';
import SearchResultPage from './pages/SearchResultPage';
import GenreListPage from './pages/GenreListPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AddMovieForm from './pages/AddMovieForm';
import Header from './common/Header';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/add-movie" exact component={AddMovieForm}></Route>
        <Route path="/movies" exact component={AllMoviesPage}></Route>
        <Route path="/movies/:id" exact component={DetailPage}></Route>
        <Route path="/search" exact component={SearchResultPage}></Route>
        <Route path="/genres" exact component={GenreListPage}></Route>
        <Route path="/sign-up" exact component={SignUpPage}></Route>
        <Route path="/login" exact component={LoginPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
