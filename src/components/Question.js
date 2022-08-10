import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { correctAnswerAction } from '../redux/actions/userActions';
import '../styles/Game.css';

const ONE_SECOND = 1000;

class Question extends Component {
  constructor(props) {
    super(props);

    this.interval = setInterval(this.decrementTimer, ONE_SECOND);

    this.state = {
      answers: [],
      wasClicked: false,
      timer: 30,
    };
  }

  componentDidMount() {
    this.shuffleAnswers();
  }

  componentDidUpdate(prev) {
    const { question } = this.props;

    if (question.question !== prev.question.question) {
      this.shuffleAnswers();
    }
  }

  startTimer = () => {
    this.interval = setInterval(this.decrementTimer, ONE_SECOND);
  }

  stopTimer = () => {
    clearInterval(this.interval);
    this.interval = null;
  }

  decrementTimer = () => {
    this.setState((prev) => ({
      timer: prev.timer - 1,
    }), this.checkTimer);
  }

  restartTimer = () => {
    this.setState({ timer: 30 });
    this.startTimer();
  }

  checkTimer = () => {
    const { timer } = this.state;
    if (timer > 0) return;

    this.stopTimer();
    this.handleAnswer({});
  }

  shuffleAnswers = () => {
    const { question } = this.props;

    const result = [];
    const answers = [...question.incorrect_answers, question.correct_answer];
    let incorrectIndex = 0;

    const { length } = answers;
    for (let i = 0; i < length; i += 1) {
      const randomIndex = Math.floor(Math.random() * answers.length + 0);
      const [selectedItem] = answers.splice(randomIndex, 1);

      if (selectedItem === question.correct_answer) { // Caso resposta esteja correta
        result.push({
          value: selectedItem,
          correct: true,
        });
      } else { // Caso resposta esteja incorreta
        result.push({
          value: selectedItem,
          correct: false,
          index: incorrectIndex,
        });
        incorrectIndex += 1;
      }
    }

    this.setState({ answers: result });
  }

  handleAnswer = ({ target }) => {
    const { correctAnswer, question } = this.props;
    const { timer } = this.state;
    this.setState({ wasClicked: true });
    this.stopTimer();

    const answer = target?.dataset.testid;
    console.log(answer);

    if (answer === 'correct-answer') {
      correctAnswer(question.difficulty, timer);
    }
  }

  handleNext = () => {
    const { nextQuestion } = this.props;

    this.setState({ wasClicked: false, timer: 30 });
    this.startTimer();
    nextQuestion();
  }

  render() {
    const { question, questionNumber } = this.props;
    const { answers, wasClicked, timer } = this.state;

    return (
      <div className="question_container">
        <div className="question_controls">
          <div className="timer_container">
            <span>{timer}</span>
          </div>
          <div>
            <h2>{ questionNumber }</h2>
            <p data-testid="question-category">{ question.category }</p>
          </div>
          { wasClicked ? (
            <button
              type="button"
              className="nextBtn"
              onClick={ this.handleNext }
              data-testid="btn-next"
            >
              Next
            </button>
          ) : (
            <span />
          ) }
        </div>

        <div className="question_content">

          <p data-testid="question-text">{ question.question }</p>
        </div>

        <div
          data-testid="answer-options"
          id="answer-options"
          className={
            wasClicked
              ? 'answer_container'
              : undefined
          }
        >
          { answers.map((answer) => (
            <button
              type="button"
              className={ answer.correct ? 'answer correct' : 'answer wrong' }
              key={ answer.value }
              disabled={ wasClicked }
              data-testid={ answer.correct
                ? 'correct-answer'
                : `wrong-answer-${answer.index}` }
              onClick={ this.handleAnswer }
            >
              { answer.value }
            </button>
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  correctAnswer: (difficulty, timer) => dispatch(correctAnswerAction(difficulty, timer)),
});

Question.propTypes = {
  question: PropTypes.shape(PropTypes.any),
  nextQuestion: PropTypes.func,
  correctAnswer: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Question);
