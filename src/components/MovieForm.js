import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.movie };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
  }

  handleSubmit() {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  updateMovie(field, newValue) {
    this.setState({ [field]: newValue });
  }

  renderTitleInput() {
    const { title } = this.state;

    return (
      <div className="form-title">
        <label htmlFor="movie_title" className="label-title">
          Título
          <input
            placeholder="Insira o título"
            id="movie_title"
            type="text"
            className="validate"
            value={ title }
            onChange={ (event) => this.updateMovie('title', event.target.value) }
          />
        </label>
      </div>
    );
  }

  renderSubtitleInput() {
    const { subtitle } = this.state;

    return (
      <div className="form-subtitle">
        <label htmlFor="movie_subtitle" className="label-subtitle">
          Subtítulo
          <input
            placeholder="Insira o subtítulo"
            id="movie_subtitle"
            type="text"
            value={ subtitle }
            onChange={ (event) => this.updateMovie('subtitle', event.target.value) }
          />
        </label>
      </div>
    );
  }

  renderImagePathInput() { // para inserir uma imagem o caminho é: images/nome da imagem (funcionando")
    const { imagePath } = this.state;

    return (
      <div className="form-image">
        <label htmlFor="movie_image" className="label-image">
          Imagem
          <input
            placeholder="Insira o caminho da imagem"
            id="movie_image"
            type="text"
            value={ imagePath }
            onChange={ (event) => this.updateMovie('imagePath', event.target.value) }
          />
        </label>
      </div>
    );
  }

  renderStorylineInput() {
    const { storyline } = this.state;

    return (
      <div className="form-storyline">
        <label htmlFor="movie_storyline" className="label-storyline">
          Sinopse
          <textarea
            placeholder="Insira a sinopse do filme"
            id="movie_storyline"
            value={ storyline }
            onChange={ (event) => this.updateMovie('storyline', event.target.value) }
          />
        </label>
      </div>
    );
  }

  renderGenreSelection() {
    const { genre } = this.state;
    return (
      <div className="form-genre">
        <label htmlFor="movie_genre" className="label-genre">
          Gênero
          <select
            id="movie_genre"
            value={ genre }
            onChange={ (event) => this.updateMovie('genre', event.target.value) }
          >
            <option value="action">Ação</option>
            <option value="comedy">Comédia</option>
            <option value="thriller">Suspense</option>
            <option value="fantasy">Fantasia</option>
          </select>
        </label>
      </div>
    );
  }

  renderRatingInput() {
    const { rating } = this.state;
    return (
      <div className="form-rating">
        <label htmlFor="movie_rating" className="label-rating">
          Avaliação
          <input
            placeholder="Dê a avaliação do filme"
            id="movie_rating"
            type="number"
            step={ 0.1 }
            min={ 0 }
            max={ 5 }
            value={ rating }
            onChange={ (event) => this.updateMovie('rating', event.target.value) }
          />
        </label>
      </div>
    );
  }

  renderSubmitButton() {
    return (
      <div className="container-btn-form">
        <button type="button" onClick={ this.handleSubmit }>
          Submit
        </button>
        <>
          <Link to="/" className="link-undo">
            <FontAwesomeIcon icon={faUndo} className="link-icon" /> 
              VOLTAR
          </Link>
        </>
      </div>
    );
  }

  render() {
    return (
      <div>
        <form>
          {this.renderTitleInput()}
          {this.renderSubtitleInput()}
          {this.renderImagePathInput()}
          {this.renderStorylineInput()}
          {this.renderGenreSelection()}
          {this.renderRatingInput()}
          {this.renderSubmitButton()}
        </form>
      </div>
    );
  }
}

export default MovieForm;

MovieForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    imagePath: PropTypes.string,
    storyline: PropTypes.string,
    genre: PropTypes.string,
    rating: PropTypes.number,
  }),
};

MovieForm.defaultProps = {
  movie: {
    id: 0,
    title: '',
    subtitle: '',
    storyline: '',
    rating: 0,
    genre: '',
    imagePath: '',
  },
};
