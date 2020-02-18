import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { isEmpty } from 'validator';
import FlashAlert from '../../common/FlashAlert';

const AddMovieForm = (props) => {
  const [genres, setGenres] = useState([]);
  const [movieStatus, setMovieStatus] = useState([]);
  const [title, setTitle] = useState('');
  const [plot, setPlot] = useState('');
  const [casts, setCasts] = useState('');
  const [producer, setProducer] = useState('');
  const [country, setCountry] = useState('');
  const [genreId, setGenreId] = useState('');
  // const [poster, setPoster] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/No_image_available_400_x_600.svg/512px-No_image_available_400_x_600.svg.png');
  const [status, setStatus] = useState('');
  // const [releasedDate, setReleasedDate] = useState('');
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  
  const handleTitleChange = event => {
    const input = event.target.value
    if (title !== input && !isEmpty(input)) {
      setTitle(input);
    }
  }
  const handlePlotChange = event => {
    const input = event.target.value;
    if (plot !== input && !isEmpty(input)) {
      setPlot(input);
    }
  }
  const handleCastsChange = event => {
    const input = event.target.value;
    if (casts !== input && !isEmpty(input)) {
      setCasts(input);
    }
  }
  const handleProducerChange = event => {
    const input = event.target.value;
    if (producer !== input && !isEmpty(input)) {
      setProducer(input);
    }
  }
  const handleCountryChange = event => {
    const input = event.target.value;
    if (country !== input && !isEmpty(input)) {
      setCountry(input);
    }
  }
  const handleGenreSelect = event => {
    const id = Number(event.target.value);
    if (genreId !== id && !isEmpty(id)) {
      setGenreId(id);
    }
  }
  // const handlePosterChange = event => {
  //   if (event.target.value) {
  //     fetch(`${process.env.REACT_APP_baseURL}/upload`, {
  //        method: 'POST',
  //        headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       },
  //       body: JSON.stringify({
  //         file: event.target.value
  //       })
  //     })
  //     .then(response => response.json())
  //     .then(result => {

  //     })
  //     .catch(error => error);
  //   }
  // }
  const handleStatusSelect = event => {
    const input = event.target.value;
    if (status !== input && !isEmpty(input)) {
      setStatus(input);
    }
  }
  // const handleReleasedDateChange = event => {
  //   const input = event.target.value;
  //   if (releasedDate !== input) {
  //     setReleasedDate(input);
  //   }
  // }
  const handleSubmitClick = event => {
    fetch(`${process.env.REACT_APP_baseURL}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        title: title,
        plot: plot,
        main_casts: casts,
        producer: producer,
        country: country,
        genre_id: genreId,
        movie_status: status
        // movie_poster: poster,
        // released_at: releasedDate
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
    Promise.all([
      fetch(`${process.env.REACT_APP_baseURL}/genres`, { method: 'GET' }),
      fetch(`${process.env.REACT_APP_baseURL}/movie-status`, { method: 'GET' })
    ])
    .then(allResponses => {
      return [allResponses[0].json(), allResponses[1].json()];
    })
    .then(results => {
      const genresResult = results[0];
      const statusResult = results[1];

      genresResult
        .then(result => setGenres([...genres, ...result.data.name]))
        .catch(error => error);
      
      statusResult
        .then(result => setMovieStatus([...movieStatus, ...result.data.name]))
        .catch(error => error);
    })
    .catch(error => error);
  }, []); //eslint-disable-line

  let alertComponent;
  if (!isEmpty(alertMessage)) {
    alertComponent = (
      <FlashAlert type={alertType} message={alertMessage}></FlashAlert>
    );
  }

  return (
    <Container>
      {alertComponent}
      <Form>
        <FormGroup>
          <Label for="movieTitle">Title</Label>
          <Input type="text" name="title" id="movieTitle"
            onChange={handleTitleChange}
            placeholder="Enter movie title here" />
        </FormGroup>
        <FormGroup>
          <Label for="moviePlot">Plot</Label>
          <Input type="textarea" name="plot" id="moviePlot" 
            onChange={handlePlotChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="movieCasts">Main Casts</Label>
          <Input type="text" name="casts" id="movieCasts"
            onChange={handleCastsChange}
            placeholder="Enter movie casts here" />
        </FormGroup>
        <FormGroup>
          <Label for="movieProducer">Movie Producer</Label>
          <Input type="text" name="producer" id="movieProducer"
            onChange={handleProducerChange}
            placeholder="Enter movie producer here" />
        </FormGroup>
        <FormGroup>
          <Label for="movieCountry">Country</Label>
          <Input type="text" name="country" id="movieCountry"
            onChange={handleCountryChange}
            placeholder="Enter origin country here"
          />
        </FormGroup>
        <FormGroup>
          <Label for="movieGenre">Genre</Label>
          <Input type="select" name="genre" id="movieGenre"
            onClick={handleGenreSelect}
          >
            <option>--Choose one option--</option>
            {genres.map(genre => {
              return (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              );
            })}
          </Input>
        </FormGroup>
        {/*
        <FormGroup>
          <Label for="moviePoster">Movie Poster</Label>
          <Input type="file" name="poster" id="moviePoster"
            onChange={handlePosterChange}
          />
        </FormGroup>
        */}
        <FormGroup>
          <Label for="movieStatus">Movie Status</Label>
          <Input type="select" name="status" id="movieStatus"
            onClick={handleStatusSelect}
          >
            <option>--Choose one option--</option>
            {movieStatus.map(status => {
              return (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              );
            })}
          </Input>
        </FormGroup>
        <Button onClick={handleSubmitClick}>Submit</Button>
      </Form>
    </Container>
  );
}

export default AddMovieForm;