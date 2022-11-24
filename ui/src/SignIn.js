import React from "react";
import ReactDOM from 'react-dom/client';
import './App.css';

class SignIn extends React.Component {
    constructor(props) {
  	
        super(props);
        this.state = {
          login: "",
          password: "",
          nextPage: ""
        };
        this.sendCredentials = this.sendCredentials.bind(this);
        this.registerTestee = this.registerTestee.bind(this);
        this.registerResearcher = this.registerResearcher.bind(this);
    }

    componentDidUpdate() {
        if (this.state.nextPage) {
            this.props.goToPage(this.state.nextPage);
        }
    }

    sendCredentials(){
        console.log(this.props)
        this.setState({ nextPage: "Tutorial" })
    }

    registerTestee() {
        console.log(this.props)
        this.setState({ nextPage: "RegisterTestee" })
    }

    registerResearcher() {
        console.log(this.props)
        this.setState({ nextPage: "RegisterResearcher" })
    }

    render() {
        return (
            <div className="sign-in">
                <div className="sign-in_auth">
                    <span style={{ textAlign: "center" }}>Войти в систему</span>
                    <br />
                    <p>Логин</p>
                    <input 
                        type="text" 
                        size="30"
                        maxlength="30"
                        value={this.state.login}
                        onChange={(event) => {
                            this.setState({ login: event.target.value })
                        }}
                        
                    />
                    <br/>
                    <p>Пароль</p>
                    <input 
                        type="password"
                        size="30"
                        value={this.state.password}
                        onChange={(event) => {
                            this.setState({ password: event.target.value })
                        }}
                        
				    />
                    <br />
                    <input type="submit" value="Войти" onClick={ this.sendCredentials } />
                </div>
                <div className="sign-in_register">
                    <span>Регистрация</span>
                    <div className="register-buttons">
                        <button className="register" onClick={ this.registerTestee }>Вы - испытуемый(ая)?</button>
                        <button className="register" onClick={ this.registerResearcher }>Вы - исследователь?</button>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default SignIn;