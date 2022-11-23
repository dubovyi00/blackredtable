import SignIn from './SignIn';
import Test from './Test';
import TestResult from './TestResult';
import SummaryResult from './SummaryResult';
import RegisterTestee from './RegisterTestee';
import RegisterResearcher from './RegisterResearcher';
import Tutorial from './Tutorial';
import React from "react";
import ReactDOM from 'react-dom/client';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Test"
    }
  }


  goToPage(page) {
    console.log(page)
    this.setState({ page });
  }
  
  render() {
    return (
      <>
        { this.state.page == "SignIn" && <SignIn goTo={this.goToPage} /> }
        { this.state.page == "Test" && <Test goTo={this.goToPage} /> }
        { this.state.page == "TestResult" && <TestResult goTo={this.goToPage} /> }
        { this.state.page == "SummaryResult" && <SummaryResult goTo={this.goToPage} /> }
        { this.state.page == "RegisterTestee" && <RegisterTestee goTo={this.goToPage} /> }
        { this.state.page == "RegisterResearcher" && <RegisterResearcher goTo={this.goToPage} /> }
        { this.state.page == "Tutorial" && <Tutorial goTo={this.goToPage} /> }
      </>
    );
  }
  
}

export default App;