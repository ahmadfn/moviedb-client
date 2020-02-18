import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, Button, CardImg, CardTitle, CardText,
  CardBody, Container, Col, Row
} from 'reactstrap';
import queryString from 'query-string';


const SearchResultPage = (props) => {
  const [movies, setMovies] = useState([]);
  const parsed = queryString.parse(props.location.search);
  let isTrue = sessionStorage.getItem('reload');

  if (isTrue) {
    window.location.reload();
    sessionStorage.removeItem('reload');
  }
  
  let query, value;
  if (parsed.title) {
    query = 'title';
    value = parsed.title;
  } else {
    query = 'genre';
    value = parsed.genre;
  }

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_baseURL}/movies?${query}=${value}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(result => {
      setMovies([...movies, ...result.data.rows]);
    })
    .catch(error => error);
  }, []); // eslint-disable-line

  return (
    <Container className="my-3">
      <h1>Search results:</h1>
      <h2 className="text-secondary">
        "{query}: {parsed.genreName ? parsed.genreName : value}"
      </h2>
      <Row>
        {movies.map(movie => {
          const url = `/movies/${movie.id}`;
          
          let genreText;
          if (movie.hasOwnProperty('Genre')) {
            genreText = (
              <CardText className="mt-2 text-capitalize">
                {movie.Genre.name}
              </CardText>
            );
          }

          return (
            <Col sm="2" className="my-2" key={movie.id}>
              <Card key={movie.id} className="w-100">
                <CardImg
                  top
                  src={movie.movie_poster}
                  className="w-100"
                  alt="Movie poster"
                />
                <CardBody>
                  <CardTitle className="text-capitalize text-primary">
                    {movie.title}
                  </CardTitle>
                  {genreText}
                  <Button outline color="primary">
                    <i className="fas fa-thumbs-up"></i> {movie.likes_count}
                  </Button>
                  <CardText className="mt-2">{movie.producer}</CardText>
                  <Link to={url}>
                    <Button className="w-100 bg-primary">Detail</Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default SearchResultPage;