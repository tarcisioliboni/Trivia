import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Question';
import '../styles/Game.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
  }

  nextQuestion = () => {
    this.setState((prev) => ({
      index: prev.index + 1,
    }));
  }

  render() {
    const { index } = this.state;
    const { questions } = this.props;
    const questionNumber = `Question ${index + 1} of ${questions.length}`;

    const REDIRECT_INDEX = questions.length;
    if (index === REDIRECT_INDEX) return <Redirect push to="/feedback" />;
    return (
      <div className="game_container">
        <Header />
        <Question
          questionNumber={ questionNumber }
          nextQuestion={ this.nextQuestion }
          question={ questions[index] }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({ questions: player.questions });

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(Game);
