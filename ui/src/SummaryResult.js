import React from "react";
import ReactDOM from 'react-dom/client';
import './App.css';

class SummaryResult extends React.Component {
    constructor(props) {
  	
        super(props);
        this.state = {
          timeFirst: "01:03",
          errorsFirst: "7",
          timeSecond: "01:24",
          errorsSecond: "2"
        };
    }

    render() {
        return (
            <div className="summary-result">
                <span>Общие результаты тестирования</span>
                <div className="summary-result_list">
                    <div className="summary-result_test">
                        <p>Затраченное время: </p>
                        <p>{ this.state.timeFirst }</p>
                        <br />
                        <p>Количество ошибок: </p>
                        <p>{ this.state.errorsFirst }</p>
                    </div>
                    <div className="summary-result_test">
                    <p>Затраченное время: </p>
                        <p>{ this.state.timeSecond }</p>
                        <br />
                        <p>Количество ошибок: </p>
                        <p>{ this.state.errorsSecond }</p>
                    </div>
                </div>
                
                <button className="register">Продолжить</button>
            </div>
        );
    }
}

export default SummaryResult;