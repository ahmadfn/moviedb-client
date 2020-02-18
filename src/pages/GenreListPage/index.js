import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, Button, CardTitle,
  Container, Col, Row
} from 'reactstrap';


const GenreListPage = (props) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_baseURL}/genres`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(result => {
      setGenres([...genres, ...result.data]);
    })
    .catch(error => error);
  }, []); // eslint-disable-line

  return (
    <Container className="my-4">
      <h3>Find all the movies by your preferrable genre:</h3>
      <Row>
        {genres.map(genre => {
          const url = `/search?genre=${genre.id}&genreName=${genre.name}`

          return (
            <Col sm="3" className="my-2" key={genre.id}>
              <Card body inverse color="success" className="text-center">
                <CardTitle className="text-capitalize font-weight-bold">
                  {genre.name}
                </CardTitle>
                <Link to={url}>
                  <Button color="primary" className="w-100">
                    Browse
                  </Button>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default GenreListPage;