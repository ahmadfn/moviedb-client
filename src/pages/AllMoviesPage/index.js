import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, Button, CardImg, CardTitle, CardText,
  CardBody, Container, Col, Row
} from 'reactstrap';


const AllMoviesPage = (props) => {
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState([]);
  const [favouriteId, setFavouriteId] = useState([]);
  const [count, setCount] = useState(0);

  const handleLikeClick = event => {
    const hasLiked = movieId.includes(Number(event.target.value));
    if (event.target.value !== undefined && !hasLiked) {
      setMovieId([...movieId, Number(event.target.value)]);
      setCount(count + 1);
    }
  }
  const handleAddClick = event => {
    const hasAdded = favouriteId.includes(Number(event.target.value));
    if (event.target.value !== undefined && !hasAdded) {
      setFavouriteId([...favouriteId, Number(event.target.value)]);
    }
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_baseURL}/movies`, {
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
      <h1>All Movies</h1>
      <Row>
        {movies.map(movie => {
          const url = `/movies/${movie.id}`;
          const isLiked = movieId.includes(movie.id);
          const isAdded = favouriteId.includes(movie.id);

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
                  <CardTitle className="my-1 text-capitalize text-primary">
                    {movie.title}
                  </CardTitle>
                  <CardText className="my-1 text-capitalize text-secondary">
                    Genre: {movie.Genre.name}
                  </CardText>
                  <div className="d-flex justify-content-around">
                    <Button
                      color="primary"
                      className="my-2"
                      value={movie.id}
                      onClick={handleLikeClick}
                    >
                      <i className="fas fa-thumbs-up"></i> {
                        isLiked ? movie.likes_count + 1 : movie.likes_count
                      }
                    </Button>
                    <Button
                      outline={isAdded ? false : true}
                      disabled={movie.id === undefined ? true : false}
                      color="secondary"
                      value={movie.id}
                      className="my-2"
                      onClick={handleAddClick}
                    >
                      <i className="far fa-star"></i>
                    </Button>
                  </div>
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

export default AllMoviesPage;