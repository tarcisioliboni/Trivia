import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Header.css';
import Logo from '../img/trivia.png';

class Header extends Component {
  render() {
    const { player: { name, score, gravatarEmail } } = this.props;

    return (
      <header>
        <img src={ Logo } alt="" />
        <div className="info">
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="Avatar" />
          <strong data-testid="header-player-name">
            {`Jogando como ${name}`}
          </strong>
          <span>|</span>
          <p data-testid="header-score">
            {`${score} pontos`}
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  player: PropTypes.shape(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps)(Header);
