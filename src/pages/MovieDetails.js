import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      movie: '',
      loading: true,
    };
    this.fetchAPI = this.fetchAPI.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  deleteCard = async () => {
    const { match } = this.props;
    const { id } = match.params;
    await movieAPI.deleteMovie(id);
  }

  fetchAPI() {
    const { match } = this.props;
    const { id } = match.params;
    movieAPI.getMovie(id).then((filterByMovie) => {
      this.setState({
        movie: filterByMovie,
        loading: false,
      });
    });
  }

  render() {
    const { movie, loading } = this.state;
    const { imagePath, title, subtitle, storyline, genre, rating, id } = movie;

    return (
      <div>
        {
          loading ? (
            <Loading />
          ) : (
            <div data-testid="movie-details">
              <img alt="Movie Cover" src={ `../${imagePath}` } />
              <p>{`Title: ${title}`}</p>
              <p>{`Subtitle: ${subtitle}`}</p>
              <p>{`Storyline: ${storyline}`}</p>
              <p>{`Genre: ${genre}`}</p>
              <p>{`Rating: ${rating}`}</p>
              <button type="button">
                <Link
                  to={ {
                    pathname: `/movies/${id}/edit`,
                    state: { params: { id } },
                  } }
                >
                  EDITAR
                </Link>
              </button>
              <button type="button">
                <Link to="/" onClick={ this.deleteCard }>
                  DELETAR
                </Link>
              </button>
              <button type="button">
                <Link to="/">
                  VOLTAR
                </Link>
              </button>
            </div>)
        }
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};

export default MovieDetails;
