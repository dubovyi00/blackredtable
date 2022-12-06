import React from "react";
import ReactDOM from 'react-dom/client';
import './App.css';

class RegisterResearcher extends React.Component {
    constructor(props) {
  	
        super(props);
        this.state = {
          login: "",
          password: "",
          error: 0,
          created: false
        };

        this.register = this.register.bind(this);
    }

    register() {
        if (this.state.password.length >= 6 && this.state.login.length >= 5 && this.state.login.indexOf(' ') === -1) {
            fetch("http://localhost:8888/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    login: this.state.login,
                    password: this.state.password
                }),
                credentials: "include"
            })
            .then(response => {
                if (response.status >= 400) {
                    return this.setState(() => {
                        return { admin: false };
                    });
                }
                
                else if (response.status === 200) {
                    return this.setState(() => {
                        return { 
                            created: true,
                            error: 0
                        };
                    });
                }
            })
            .catch((e) => {
                console.log(e);
                this.setState(() => {
                    return { error: 2 };
                });
            });
        } else if (this.state.password.length < 6 || this.state.login.length < 5) {
            this.setState(() => {
                return { error: 1 };
            });
        } else if (this.state.login.indexOf(' ') != -1) {
            this.setState(() => {
                return { error: 4 };
            });
        }
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
                <input type="submit" value="Сохранить данные" onClick={ this.register } />
            </div>
        );
    }
}

export default RegisterResearcher;