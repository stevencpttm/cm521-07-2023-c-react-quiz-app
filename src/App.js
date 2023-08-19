import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    corrects: 0,
    currentIndex: 0,
    buttonClass: ["", "", "", ""],
    statusBarWidth: "1%",
    topics: [
      {
        question: "JavaScript 與 Java 有什麼關係？",
        answers: [
          {
            value: "同公司的產品",
            correct: false,
          },
          {
            value: "新版與舊版的關係",
            correct: false,
          },
          {
            value: "一點關係也沒有",
            correct: true,
          },
          {
            value: "JavaScript 是 Java 的 Web 版本",
            correct: false,
          },
        ],
      },
      {
        question: "發明 React JS 的公司是？",
        answers: [
          {
            value: "Google",
            correct: false,
          },
          {
            value: "Facebook",
            correct: true,
          },
          {
            value: "Apple",
            correct: false,
          },
          {
            value: "Microsoft",
            correct: false,
          },
        ],
      },
    ],
  };

  answerHandler = (answerIndex) => {
    // 1. Check if the clicked button is the correct answer
    const isCorrect =
      this.state.topics[this.state.currentIndex].answers[answerIndex].correct;

    // 2. If the answer is correct, set this.state.corrects + 1
    if (isCorrect) {
      this.setState({
        corrects: this.state.corrects + 1,
      });
    }

    // 3. Adjust buttonClass to show whether the answer is correct
    // By setting the relevant classes
    const newButtonClass = [...this.state.buttonClass];
    newButtonClass[answerIndex] = isCorrect ? "correct" : "wrong";

    this.setState({
      buttonClass: newButtonClass,
    });

    // 4. Switch to the next question after 1 second
    setTimeout(() => {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        buttonClass: ["", "", "", ""],
        statusBarWidth: `${
          ((this.state.currentIndex + 1) / this.state.topics.length) * 100
        }%`,
      });
    }, 1000);
  };

  startOver = () => {
    this.setState({
      corrects: 0,
      currentIndex: 0,
      buttonClass: ["", "", "", ""],
      statusBarWidth: "1%",
    });
  };

  render() {
    const topic = this.state.topics[this.state.currentIndex];

    return (
      <div className="App">
        <div
          className="statusBar"
          style={{
            width: this.state.statusBarWidth,
          }}
        ></div>

        {this.state.currentIndex < this.state.topics.length ? (
          <div className="topics-container">
            <h2>{topic.question}</h2>

            {topic.answers.map((answer, index) => {
              return (
                <button
                  className={this.state.buttonClass[index]}
                  key={index}
                  onClick={() => this.answerHandler(index)}
                >
                  {answer.value}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="fireworks">
            <div className="before"></div>
            <div className="after"></div>
            <div className="result">
              <h2>Completed!</h2>
              <h3>
                Your Score is{" "}
                {Math.round(
                  (this.state.corrects / this.state.topics.length) * 100
                ) || 0}
              </h3>
              <button onClick={this.startOver}>Start Over</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
