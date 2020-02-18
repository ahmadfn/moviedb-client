import React, { useState, useEffect } from 'react';
import {
  Card, Button, CardText,
  CardBody, Container, Row
} from 'reactstrap';
import { isEmpty } from 'validator';
import FlashAlert from '../../common/FlashAlert';

const DetailPage = (props) => {
  const [movieId, setMovieId] = useState(null);
  const [movieTitle, setMovieTitle] = useState('');
  const [moviePlot, setMoviePlot] = useState('');
  const [movieCasts, setMovieCasts] = useState('');
  const [movieProducer, setMovieProducer] = useState('');
  const [movieCountry, setMovieCountry] = useState('');
  const [movieLikesCount, setMovieLikesCount] = useState(0);
  const [movieGenre, setMovieGenre] = useState('');
  const [moviePoster, setMoviePoster] = useState('');
  const [movieStatus, setMovieStatus] = useState('');
  const [movieReleasedDate, setMovieReleasedDate] = useState('');
  const [count, setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleLikeClick = event => {
    if (!hasLiked) {
      setCount(count + 1);
      setHasLiked(true);
    }

    fetch(`${process.env.REACT_APP_baseURL}/movies/${props.match.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        
      })
    })
    .then()
    .catch(error => error);
  }
  const handleAddClick = event => {
    fetch(`${process.env.REACT_APP_baseURL}/favourites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        movie_id: movieId
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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_baseURL}/movies/${props.match.params.id}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(result => {
      setMovieId(result.data.id);
      setMovieTitle(result.data.title);
      setMoviePlot(result.data.plot);
      setMovieCasts(result.data.main_casts);
      setMovieProducer(result.data.producer);
      setMovieCountry(result.data.country);
      setMovieLikesCount(result.data.likes_count);
      setMovieGenre(result.data.Genre.name);
      setMoviePoster(result.data.movie_poster);
      setMovieStatus(result.data.MovieStatus.name);
      setMovieReleasedDate(result.data.released_at);
    })
    .catch(error => error);
  }, []); // eslint-disable-line

  let alertComponent;
  if (!isEmpty(alertMessage)) {
    alertComponent = (
      <FlashAlert type={alertType} message={alertMessage}></FlashAlert>
    );
  }

  return (
    <Container className="mt-5">
      {alertComponent}
      <Row className="justify-content-center">
        <img src={moviePoster} alt="Movie poster"/>
        <Card className="w-75 mx-2">
          <CardBody>
            <h3 className="text-capitalize">{movieTitle} ({movieCountry})</h3>
            <p>Date release: {movieReleasedDate}</p>
            <Button outline color="primary" onClick={handleLikeClick}>
              <i className="fas fa-thumbs-up"></i> {movieLikesCount + count}
            </Button>
            <CardText className="mt-3">Plot: {moviePlot}</CardText>
            <CardText className="mt-3">Genre: {movieGenre}</CardText>
            <CardText className="mt-3">Status: {movieStatus}</CardText>
            <CardText className="mt-3">Producer: {movieProducer}</CardText>
            <CardText className="mt-3">
              Main casts: {movieCasts.split(',').map(cast => {
                return (
                  <span key={cast} className="text-primary ml-1">
                    {cast},
                  </span>
                )
              })}
            </CardText>
          </CardBody>
          <div className="d-flex justify-content-start mb-3 mx-3">
            <Button
              color="primary w-100"
              value={movieId}
              onClick={handleAddClick}
            >
              Add to Favourite
            </Button>
          </div>
        </Card>
      </Row>
    </Container>
  );
}

export default DetailPage;