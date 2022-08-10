import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetUserAction } from '../redux/actions/userActions';
import '../styles/Ranking.css';

const NUMBER_FOUR = 4;
class Ranking extends Component {
  handleClick = () => {
    const { resetQuestion, history } = this.props;
    resetQuestion();
    history.push('/');
  }

  render() {
    const { ranking } = this.props;
    const rankingPlayers = ranking.sort((a, b) => b.score - a.score);
    const [first, second, third, ...rest] = rankingPlayers;

    return (
      <div className="ranking-container">
        <h1 className="ranking-title" data-testid="ranking-title">RANKING</h1>

        <div className="ranking">
          { first && (
            <div className="gold">
              <h2>{`1. ${first.name} 🥇`}</h2>
              <span>{`${first.score} points`}</span>
            </div>
          )}

          { second && (
            <div className="silver">
              <h2>{`2. ${second.name} 🥈`}</h2>
              <span>{`${second.score} points`}</span>
            </div>
          )}

          { third && (
            <div className="bronze">
              <h2>{`3. ${third.name} 🥉`}</h2>
              <span>{`${third.score} points`}</span>
            </div>
          )}

          { rest.map((player, index) => (
            <div
              key={ index }
              className="rest_container"
            >
              <h4
                data-testid={ `player-name-${index}` }
              >
                {`${index + NUMBER_FOUR}. ${player.name}`}
              </h4>
              <p
                data-testid={ `player-score-${index}` }
              >
                {`${player.score} points`}
              </p>
            </div>
          )) }
        </div>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClick }
          className="buttonHome"
        >
          Home
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetQuestion: () => dispatch(resetUserAction()),
});

const mapStateToProps = (state) => ({
  ranking: state.ranking,
});

Ranking.propTypes = {
  resetQuestion: PropTypes.func,
  history: PropTypes.shape({ push: PropTypes.func }),
  ranking: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
