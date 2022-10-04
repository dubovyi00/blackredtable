import React from "react";
import ReactDOM from 'react-dom/client';
import './App.css';

function initTable() {
  var nums = [];
  for (let i = 1; i <= 25; i++) {
    nums.push({"num": i, "color": "black"});
    if (i != 25) nums.push({"num": i, "color": "red"});
  }
  var numsShuffled = [];
  while (nums.length != 0) {
    let index = Math.floor(Math.random() * nums.length);
    numsShuffled.push(nums[index]);
    nums.splice(index, 1);
    
  }
  var numsArray = [];
  for (let i = 0; i < 7; i++) {
    numsArray.push(numsShuffled.slice(i*7, (i+1)*7));
  }

  return numsArray;
}

var numsArray = initTable();

console.log(numsArray)

class TableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowId: props.rowId,
      colId: props.colId
    }
  }

  render() {
    var i = this.state.rowId;
    var j = this.state.colId;
    return (
      <td>
        <button 
          className={numsArray[i][j].color}
          onClick={() => this.props.onClick(i, j)}
          
          
        >
          {numsArray[i][j].num}
        </button>
      </td>
    )
    
  }
}

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowId: props.rowId
    }
  }

  renderCell(j) {
    return (
      <TableCell rowId={this.state.rowId} colId={j} onClick={(i, j) => this.props.onClick(i, j)} />
    );
  }
  
  render() {
    return (
      <tr>
        { this.renderCell(0) } 
        { this.renderCell(1) } 
        { this.renderCell(2) } 
        { this.renderCell(3) } 
        { this.renderCell(4) } 
        { this.renderCell(5) } 
        { this.renderCell(6) } 
      </tr>
    );
    
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: []
    }
  }

  renderRow(i) {
    return (
      <TableRow rowId={i} onClick={(i, j) => this.props.onClick(i, j)} />
    );
  }
  
  render() {
    return (
      <table>
        { this.renderRow(0)} 
        { this.renderRow(1) } 
        { this.renderRow(2) } 
        { this.renderRow(3) } 
        { this.renderRow(4) } 
        { this.renderRow(5) } 
        { this.renderRow(6) } 
      </table>
    )
  }
}

class Counter extends React.Component {
  render() {
    return (
      <span>Количество ошибок: {this.props.count}</span>
    )
  }
}

class Task extends React.Component {
  render() {
    return (
      <div>
        <span>Задание: <span className={this.props.color}>{this.props.num}</span></span>
        <br />
      </div>
      
    )
  }
}

class Timer extends React.Component {
  constructor() {
    super();
    this.state = { minute: 0, second: 0 };
    this.updateTimer = this.updateTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  updateTimer() {
    this.setState((state) => {
      return {
        second: state.second === 59 ? 0 : state.second + 1,
        minute: state.second === 59 ? state.minute + 1 : state.minute
      };
    });
  }

  resetTimer() {
    this.setState({ minute: 0, second: 0 });
  }

  render() {
    var minute = (this.state.minute < 10) ? '0'+ this.state.minute : this.state.minute
    var second = (this.state.second < 10) ? '0'+ this.state.second : this.state.second
    return (
      <>
        <p>
          {minute}:{second}
        </p>

        <Toggle updateTimer={this.updateTimer} resetTimer={this.resetTimer} />
      </>
    );
  }
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false };
    this.interval = null;
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isToggleOn !== this.state.isToggleOn) {
      if (this.state.isToggleOn) {
        this.interval = setInterval(this.props.updateTimer, 1000);
      } else {
        clearInterval(this.interval);
        this.props.resetTimer();
      }
    }
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <div>
        {!this.state.isToggleOn &&
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? "OFF" : "ON"}
          </button>
        } 
      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      color: "black",
      num: 1,
      lastRed: 25,
      lastBlack: 0
    }
  }

  handleClick(i, j) {
    console.log(numsArray[i][j])
    if (numsArray[i][j].num != this.state.num || numsArray[i][j].color != this.state.color ) {
      var count = this.state.count + 1;
      this.setState({ count });
    }
    else {
      if (this.state.color == "red") var lastRed = this.state.num;
      else var lastBlack = this.state.num;
      var color = (this.state.color == "red") ? "black" : "red";
      var num = (this.state.color == "red") ? this.state.lastBlack+1 : this.state.lastRed-1;
      this.setState({ color, num });
      if (lastRed) {
        this.setState({ lastRed });
      } else {
        this.setState({ lastBlack });
      }
    }
    
  }

  render() {
    return ( 
      <div>
        <Table onClick={(i, j) => this.handleClick(i, j)} /> 
        { this.state.num != 0 && <Task color={this.state.color} num={this.state.num} /> }
        <Counter count={this.state.count}/>
        <Timer />
        { this.state.num == 0 && <span>Всё!</span>}
      </div>
    );
    
  }
}

export default App;
