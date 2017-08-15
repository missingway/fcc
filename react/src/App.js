import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

function randomColor() {
  var rc = (~~(Math.random() * 0xFFFFFF)).toString(16);
  return '#' + new Array(7 - rc.length).join('0') + rc;
}

class DanmuForm extends React.Component{
  render(){
    return (
      <form id="danmuForm" onSubmit={(e)=>this.props.handleSubmit(e,this.refs.msg.value)} >
        <input id="msg" ref="msg" type="text" className="form-control" />
        <button type="submit" className="btn btn-default">Send Your Comment</button>
        <button onClick={(e)=>this.props.handleClear(e)} className="btn btn-default">Clear</button>
      </form>
    );
  }
}

class Text extends React.Component{

  componentDidMount(){
    var main=this;
    main.timer = setInterval(()=>{
      
      $('#'+main.props.id.toString()).animate({
        opacity: 0,
        right:"1050px",
      }, main.props.item.speed, function() {

      }).animate({
        opacity: 0,
        right:"-100px",
      }, main.props.item.speed/3, function() {
        $(this).css({opacity:1});
        clearInterval(main.timer);
      }); 
    },1);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render(){
    var item = this.props.item;
    var id=this.props.id.toString();
    return (
      <span id={id} style={{color:item.color,position:"absolute",top:item.top+'px',right:"-100px",zIndex:item.zindex}}>{item.text}</span>
    );
  }
}


class DanmuWindow extends React.Component{
  render(){
    var texts=this.props.texts;
    return (
      <div id="danmuWindow" className="">
      {texts.map((item,i)=>
          <Text item={item} key={i} id={i} />
      )}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
       texts:[]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleSubmit(e,msg){
    e.preventDefault();
    var speed=Math.ceil(Math.random()*5000)+5000;
    var top = Math.ceil(Math.random()*450);
    var zIndex = Math.ceil(Math.random()*20000);
    var info = {
        'text':msg.toString(),
        'speed': speed,
        'color': randomColor(),
        'top': top.toString(),
        'zindex': zIndex.toString()
    }
    var textsCopy = this.state.texts;
    textsCopy.push(info);
    this.setState({
      texts:textsCopy
    });
  }

  handleClear(e){
    e.preventDefault();
    var texts=[];
    this.setState({texts:texts});
  }

  render() {
    return (
      <div id="danmu">
         <DanmuWindow texts={this.state.texts} />
         <DanmuForm handleSubmit={this.handleSubmit} handleClear={this.handleClear} />
      </div>
    );
  }
}

export default App;
