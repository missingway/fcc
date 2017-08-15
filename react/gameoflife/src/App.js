import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

var Size = {small:[30,50],medium:[50,70],large:[80,100]};
var DefaultSize = Size.medium;
var BOARD = [];
var SPEED = '1000'

//component of game board
class Board extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render(){
    return (
      <div id="board">
        {
          this.props.board.map((row,index)=>
                <Row row={row} key={index} rowID={index} />
        )}
      </div>
    );
  }
}

class Row extends React.Component{
  render(){
    return (
      <div className="line">
      {
        this.props.row.map((status,i)=>
          <div id={this.props.rowID+'-'+i.toString()} className={status} key={i} ></div>
        )}
      </div>
    );
  }
}

//component for setting board size and sim speed 
class Settings extends React.Component{
   componentDidMount(){
     $('#sizeSetting button').on('click',function(){
        $(this).siblings('button').removeClass('active');
        $(this).addClass('active');
     });
     $('#speedSetting button').on('click',function(){
        $(this).siblings('button').removeClass('active');
        $(this).addClass('active');
     });
     $('#smallSize').on('click',function(){
       $('#gameofLife').css({width:"520px"});
     });
     $('#mediumSize').on('click',function(){
       $('#gameofLife').css({width:"750px"});
     });
     $('#largeSize').on('click',function(){
       $('#gameofLife').css({width:"1020px"});
     });
   }
   render(){
      return (
        <div id="setting">
          <div id="sizeSetting">
              <label>Board Size:</label>
              <button id="smallSize" onClick={()=>this.props.setSize('small')} className="btn btn-default">50X30</button>
              <button id="mediumSize" onClick={()=>this.props.setSize('medium')}   className="btn btn-default active">70X50</button>
              <button id="largeSize" onClick={()=>this.props.setSize('large')}   className="btn btn-default">100X80</button>
          </div>
          <div id="speedSetting">
              <label>Sim Speed:</label>
              <button id="slow" onClick={()=>this.props.setSpeed(2000)} className="btn btn-default">Slow</button>
              <button id="normal" onClick={()=>this.props.setSpeed(1000)}   className="btn btn-default active">Normal</button>
              <button id="fast" onClick={()=>this.props.setSpeed(100)}   className="btn btn-default">Fast</button>
          </div>
        </div>
      );
   }
}

class Controls extends React.Component{
  render(){
    return (
      <div id="controls">
          <button className="btn btn-default" onClick={()=>this.props.run()} >Run</button>
          <button className="btn btn-default"  onClick={()=>this.props.pause()} >Pause</button>
          <button className="btn btn-default"  onClick={()=>this.props.clear()}>Clear</button>
          <span id="generations"><label>Generations:</label>{this.props.generations.toString()}</span>
      </div>
    );

  }
} 

class App extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      rows:DefaultSize[0],
      cols:DefaultSize[1],
      size:'medium',
      board:[],
      control:'run',
      generations:0
    };
    this.setSize = this.setSize.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.initialBoard = this.initialBoard.bind(this);

    this.generate = this.generate.bind(this);
    this.run=this.run.bind(this);
    this.pause=this.pause.bind(this);
    this.clear=this.clear.bind(this);
  }

  componentWillMount(){
    this.initialBoard(50,70);
    this.run(); 
  }
  componentDidMount(){
    var main = this;
    $('.cell').on('click',function(){
      var id=$(this).attr('id').toString();
      var arr = id.split('-');
      var row= arr[0];
      var col = arr[1];
      var board = main.state.board;
      board[row][col]='cell alive';
      main.setState({board:board});
    });
  }
  componentDidUnMount(){
    clearInterval(this.timer1);
  }

  generate(){
    var board = [];
    board = BOARD;
    var i=0;
    var j=0;
    if(this.state.control==='pause'){
      clearInterval(this.timer1);
      return;
    }
    else if(this.state.control==='clear'){
      for(i=0;i<board.length;i++){
        for(j=0;j<board[i].length;j++){
            board[i][j]='cell dead';
        }
      }
      this.setState({board:board});
      clearInterval(this.timer1);
      return;
    }
    
    for(i=0;i<board.length;i++){
       for(j=0;j<board[i].length;j++){
          var neighbours=0;

          if((i-1)>=0  && board[i-1][j].search('alive')!==-1){
            neighbours++;
          }
          if((i-1)>=0 && (j+1)<board[i].length && board[i-1][j+1].search('alive')!==-1){
            neighbours++;
          }
          if((j+1)<board[i].length && board[i][j+1].search('alive')!==-1){
            neighbours++;
          }
          if((i+1)<board.length && (j+1)<board[i].length && board[i+1][j+1].search('alive')!==-1){
            neighbours++;
          }
          if((i+1)<board.length && board[i+1][j].search('alive')!==-1){
            neighbours++;
          }
          if((i+1)<board.length && (j-1)>=0 && board[i+1][j-1].search('alive')!==-1){
            neighbours++;
          }
          if((j-1)>=0 && board[i][j-1].search('alive')!==-1){
            neighbours++;
          }
          if((i-1)>=0 && (j-1)>=0 && board[i-1][j-1].search('alive')!==-1){
            neighbours++;
          }
          
          

          if(board[i][j].search('dead')!==-1 && neighbours===3){
            board[i][j]='cell alive';
          }
          else if(board[i][j].search('alive')!==-1 && neighbours<2){
            board[i][j]='cell dead';
          }
          else if(board[i][j].search('alive')!==-1 && neighbours===2){
            board[i][j]='cell alive old';
          }
          else if(board[i][j].search('alive')!==-1 && neighbours===3){
            board[i][j]='cell alive old';
          }
          else if(board[i][j].search('alive')!==-1 && neighbours>3){
            board[i][j]='cell dead';
          }
       }
    }
    var generations = this.state.generations+1;
    this.setState({board:board,generations:generations});
  }

  initialBoard(rows,cols){
    BOARD = [];
    for(var i=0;i<rows;i++){
      var rowArr = [];
      for(var j=0;j<cols;j++){ 
        var rand = Math.floor(Math.random()*10);
        if(rand===0){
          rowArr[j]='cell dead';  
        }
        else{
          rowArr[j]='cell alive';
        }
      }
      BOARD.push(rowArr);
    }
    this.setState({board:BOARD});  
  }

  setSize(size){
    var rows = Size[size][0];
    var cols = Size[size][1];
    this.setState({
      rows:rows,
      cols:cols,
      size:size
    });
    this.initialBoard(rows,cols);
  }

  run(){
    var prevControl=this.state.control;
    if(prevControl==='clear'){
      this.initialBoard(this.state.rows,this.state.cols);
    }
    this.setState({control:'run'});
    var main=this;
    this.timer1 = setInterval(main.generate,SPEED);
  }

  pause(){
    if(this.state.control==='run'){
      this.setState({control:'pause'});
      clearInterval(this.timer1);  
    }    
  }

  clear(){
    this.setState({control:'clear',generations:0});
  }

  setSpeed(speed){
    clearInterval(this.timer1);
    SPEED=speed;
    this.run();
  }


  render() {
    return (
      <div>
        <div id="header" className="text-center"><a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">ReactJS Game of Life</a></div>
        <div id="gameofLife" className="center-block" >
         <Controls run={this.run} pause={this.pause} clear={this.clear} generations={this.state.generations} />
         <Board board={this.state.board} />
         <Settings setSize={this.setSize} setSpeed={this.setSpeed} size={this.state.size} />
        </div>
      </div>
    );
  }
}

export default App;
