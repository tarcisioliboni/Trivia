import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import addEntryAction from '../redux/actions/rankingActions';
import { resetUserAction } from '../redux/actions/userActions';
import '../styles/Feedback.css';

class Feedback extends Component {
  componentDidMount() {
    const { addEntry, player } = this.props;

    const payload = {
      name: player.name,
      score: player.score,
      picture: `https://www.gravatar.com/avatar/${player.gravatarEmail}`,
    };

    addEntry(payload);
  }

  playAgain = () => {
    const { resetUser } = this.props;
    resetUser();
  }

  handleScore() {
    const { player: { assertions } } = this.props;
    let scorePhrase;
    const number = 3;

    if (assertions < number) {
      scorePhrase = 'Could be better...';
    } else if (assertions >= number) {
      scorePhrase = 'Well Done!';
    }

    return scorePhrase;
  }

  feedback() {
    const { player, history } = this.props;
    const { score, assertions } = player;

    if (player.name.length === 0) return <Redirect push to="/" />;
    return (
      <main>
        <Header />
        <section>
          <div className="feedback_container">
            <span className="textCard">
              Pontuação:
              {' '}
              <span data-testid="feedback-total-score">{ score }</span>
            </span>
            <span className="textCard">
              Acertos:
              {' '}
              <span data-testid="feedback-total-question">{ assertions }</span>
            </span>
            <h4 data-testid="feedback-text">{this.handleScore()}</h4>
            <button
              className="btn-ranking"
              type="button"
              onClick={ this.playAgain }
              data-testid="btn-play-again"
            >
              Play Again
            </button>
            <button
              className="btn-ranking"
              type="button"
              data-testid="btn-ranking"
              onClick={ () => history.push('/ranking') }
            >
              Ranking
            </button>
          </div>
        </section>
      </main>
    );
  }

  render() {
    return (
      <>
        {this.feedback()}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEntry: (info) => dispatch(addEntryAction(info)),
  resetUser: () => dispatch(resetUserAction()),
});

const mapStateToProps = (state) => ({
  player: state.player,
});

Feedback.propTypes = {
  player: PropTypes.shape(PropTypes.any),
  addEntry: PropTypes.func,
  resetUser: PropTypes.func,
  history: PropTypes.shape(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
