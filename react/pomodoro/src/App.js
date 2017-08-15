import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'

class Break extends React.Component{
  
  render(){
    return (
      <div>
        <h5>BREAK LENGTH</h5>
        <a className="sub" onClick={(e)=>this.props.setBreak(e,-1)} >-</a>
        <p id="breakField">{this.props.break}</p>
        <a  onClick={(e)=>this.props.setBreak(e,1)}  className="add">+</a>
      </div>
    );
  }
}

class Session extends React.Component{
  
  render(){
    return (
      <div id="session">
        <h5>SESSION LENGTH</h5>
        <a className="sub" onClick={(e)=>this.props.setSession(e,-1)} >-</a>
        <p id="sessionField">{this.props.session}</p>
        <a  onClick={(e)=>this.props.setSession(e,1)}  className="add">+</a>
      </div>
    );
  }
}

class Clock extends React.Component{
  
  render(){
    var t = this.props.time;
    var h = Math.floor(t/3600);
    var m = Math.floor((t-h*3600)/60);
    var s = t%60;
    console.log(t,h,m,s);
    return (
      <div id="clock" onClick={(e)=>this.props.t()}>
        <p className="title">Session</p>
        <p id="timer">
        {h}:{m}:{s}
        </p>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
  
    this.state = {
      time: 25*60,
      status: 0,
      session: 25*60,
      break: 5*60,
      startBreak: 0
    };

    this.control = this.control.bind(this);
    this.setBreak = this.setBreak.bind(this);
    this.setSession = this.setSession.bind(this);
  }
  
  control(){
    if(this.state.time===0){
      return;
    }
    var status = this.state.status;
    if(status===0){
      this.setState({
        status:1
      });
      this.timer = setInterval(()=>{
          var time = this.state.time-1;
          this.setState({time:time});
          if(time===0 && this.state.startBreak===0){
            time = this.state.break;
            this.setState({time:time,startBreak:1});
            $('#clock .title').text('Break');
          }
          if(time===0 && this.state.startBreak===1){
            time = this.state.session;
            this.setState({time:time,startBreak:0});
            $('#clock .title').text('Session');
          }
      },1000);
    }
    else{
      this.setState({
        status:0
      });
      clearInterval(this.timer); 
    }
    
  }

  setBreak(e,num){
    if(this.state.status===0){
      e.preventDefault();
      if(this.state.break===0 && num<0){ }
      else{
        var newBreak = parseInt($("#breakField").text())*60+(num*60);
        var m = newBreak/60;
        $('#breakField').html(m.toString());
        this.setState({break:newBreak});  
      }
      
    }
  }

  setSession(e,num){
    if(this.state.status===0){
      if(this.state.session===0 && num<0){ 
        //do nothing
      }
      else{
        e.preventDefault();
        var newSession = parseInt($("#sessionField").text())*60+(num*60);
        var m = newSession/60;
        $('#sessionField').html(m.toString());
        this.setState({session:newSession,time:newSession});  
      }   
    }
  }


  render() {
    return (
        <div id="app">
          <div id="settings">
            <Break break={this.state.break/60} setBreak={this.setBreak} />
            <Session session={this.state.session/60} setSession={this.setSession} />
          </div>
          <div className="clearfix"></div>
          <Clock time={this.state.time} t={this.control} />
        </div>
    );
  }
}

export default App;
