import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loginAction } from '../redux/actions/userActions';
import logo from '../img/trivia.png';
import '../styles/Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;

    this.setState(() => ({
      [name]: value,
    }));
  }

  handleLogin = () => {
    const { email, name } = this.state;
    const { login } = this.props;
    login(email, name);
  }

  isFormValid = () => {
    const { name, email } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;

    if (name.length < 1) return false;
    if (!emailRegex.test(email)) return false;

    return true;
  }

  render() {
    const { handleLogin, handleInput, isFormValid } = this;
    const { name, email } = this.state;
    const { questions } = this.props;

    if (questions.length) return <Redirect push to="/game" />;
    return (
      <div className="loginPage container">
        <div className="login-area">
          <img src={ logo } className="logo-tribia" alt="" />
          <input
            data-testid="input-player-name"
            name="name"
            className="email"
            value={ name }
            onChange={ handleInput }
            placeholder="Nome do Jogador"
          />
          <input
            data-testid="input-gravatar-email"
            name="email"
            className="email"
            value={ email }
            onChange={ handleInput }
            placeholder="Email"
          />
          <button
            data-testid="btn-play"
            type="button"
            className="button-play"
            onClick={ handleLogin }
            disabled={ !isFormValid() }
          >
            Play
          </button>
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              className="button-config"
              type="button"
            >
              Settings
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.player.questions,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, name) => dispatch(loginAction(email, name)),
});

Login.propTypes = {
  login: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.any),
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
