import React from "react";
import ReactDOM from 'react-dom/client';
import './App.css';

class RegisterTestee extends React.Component {
    constructor(props) {
  	
        super(props);
        this.state = {
          name: ""

        };
    }

    render() {
        return (
            <div className="register">
                <span>Регистрация испытуемого</span>
                <br />
                <div className="register-box">
                    <p>Ваше имя:</p>
                    
                    <input 
                        type="text" 
                        size="30"
                        maxlength="30"
                        value={this.state.name}
                        onChange={(event) => {
                            this.setState({ name: event.target.value, created: false })
                        }}  
                    />    
                </div>
                    
                <br />
                <input type="submit" value="Продолжить"  />
            </div>
        );
    }
}

export default RegisterTestee;