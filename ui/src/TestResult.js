import React from "react";
import ReactDOM from 'react-dom/client';
import './App.css';

class TestResult extends React.Component {
    constructor(props) {
  	
        super(props);
        this.state = {
          time: "01:03",
          errors: "5",

        };
    }

    render() {
        return (
            <div className="test-result">
                <span>Результаты первого тестирования</span>
                <br />
                <p>Затраченное время: </p>
                <p>{ this.state.time }</p>
                <br />
                <p>Количество ошибок: </p>
                <p>{ this.state.errors }</p>
                <br />
                <button className="register">Продолжить</button>
            </div>
        );
    }
}

export default TestResult;