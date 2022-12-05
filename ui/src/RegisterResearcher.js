import React from "react";
import ReactDOM from 'react-dom/client';
import './App.css';

class RegisterResearcher extends React.Component {
    constructor(props) {
  	
        super(props);
        this.state = {
          login: "",
          password: ""

        };
    }

    render() {
        return (
            <div className="register">
                <span>Регистрация исследователя</span>
                <br />
                <div className="register-box">
                    <p>Введите логин:</p>
                    
                    <input 
                        type="text" 
                        size="30"
                        maxlength="30"
                        value={this.state.login}
                        onChange={(event) => {
                            this.setState({ login: event.target.value, created: false })
                        }}  
                    />    
                    <p>Введите пароль:</p>
                    
                    <input 
                        type="password" 
                        size="30"
                        maxlength="30"
                        value={this.state.password}
                        onChange={(event) => {
                            this.setState({ password: event.target.value, created: false })
                        }}  
                    />  
                </div>
                    
                <br />
                <input type="submit" value="Сохранить данные"  />
            </div>
        );
    }
}

export default RegisterResearcher;