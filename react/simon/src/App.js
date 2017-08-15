import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

var shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
}


const colors = shuffle(["#33FF33","#FF0033","#FFCC33","#009FFF"]);
const sounds = [
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
            new Audio('https://s3.amazonaws.com/freesoundeffects/mp3/mp3_12258.mp3'),
            new Audio('https://s3.amazonaws.com/freesoundeffects/mp3/mp3_456195.mp3')
      ];


class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      power: "off",
      count: -1,
      start: 0,
      playerTurn:false,
      playerClicks:[],
      pcClicks: [],
      clickTimes: -1,
      strict:0
    };
    this.sound = this.sound.bind(this);
    this.start = this.start.bind(this);
    this.setStrict = this.setStrict.bind(this);
    this.flashMessage = this.flashMessage.bind(this);
  }

  componentDidMount(){
    $('#startBtn').on('mousedown',function(){
      $(this).css({backgroundColor:'brown'});
    }).on('mouseup',function(){
      $(this).css({backgroundColor:'red'});
    });
    $('#strictBtn').on('mousedown',function(){
      $(this).css({backgroundColor:'#7C622C'});
    }).on('mouseup',function(){
      $(this).css({backgroundColor:'yellow'});
    });
  }
  
  sound(block){
    switch(block) {
        case 0: sounds[0].play(); 
              break;
        case 1: sounds[1].play(); 
              break;
        case 2: sounds[2].play();
             break;
        case 3: sounds[3].play(); 
             break;
        case 4: sounds[4].play(); 
             break;
        case 5: sounds[5].play(); 
             break;
        default:
             break;
    }
  }

  power(){
    var power = this.state.power;
    if(power==="on"){
      power = "off";
      this.setState({power:power,count:-1});
    }
    else{
      power = "on";
      this.setState({power:power,count:0});
    }
    

  }

  start(){
    if(this.state.count===-1){
      return;
    }else{ 
      this.setState({start:1});
      $('.block').removeClass('clickable').addClass('unclickable');
      var i = 0;
      this.timer = setInterval(()=>{  
        if(i<this.state.count+1){
          var rand = Math.floor(Math.random()*4);
          var pcClicks = this.state.pcClicks;
          pcClicks.push(rand);
          this.setState({pcClicks:pcClicks,playerTurn:false});
          var id = '#block-'+rand.toString();
          $(id).fadeOut(150).fadeIn(150);
          this.sound(rand);
          i++;      
        }
        else{
          clearInterval(this.timer);
          this.setState({"playerTurn":true});
          $('.block').removeClass('unclickable').addClass('clickable');
        }
      },800);
    }
  }

  flashMessage(msg,times){
      var cnt = 0; 
      this.timer5 = setInterval(()=>{
        $('#countNum').addClass('led-off');
        setTimeout(()=>{
          $('#countNum').removeClass('led-off');
        },250);
        cnt++;
        if(cnt >= times){
          clearInterval(this.timer5);
        }
      },550); 
  };

  clickBlock(block){
    if(this.state.playerTurn===false){
      return;
    }
    clearTimeout(this.timer2);
    clearTimeout(this.timer3);
    clearInterval(this.timer5);
    var id = '#block-'+block;
    $(id).fadeOut(150).fadeIn(150);
    this.sound(block);
    var copy = this.state.playerClicks;
    copy.push(block);
    this.setState({playerClicks:copy});
    var t = this.state.clickTimes+1;
    
    //player clicking
    if(this.state.playerTurn===true && this.state.pcClicks[t]===this.state.playerClicks[t] && t<(this.state.pcClicks.length-1)){
      this.setState({clickTimes:t});
    }
    //player finished clicking
    else if(this.state.pcClicks[t]===this.state.playerClicks[t] && t===(this.state.pcClicks.length-1)){
      var x = this.state.count+1;
      this.setState({count:x,pcClicks:[],playerClicks:[],clickTimes:-1,playerTurn:false});
      this.timer2 = setTimeout(()=>{this.start()},1000);
      this.sound(5);   
    }
    //error in strict mode
    else if(this.state.pcClicks[t]!==this.state.playerClicks[t] && this.state.strict===1){
      this.setState({
        'count':0,
        pcClicks:[],
        playerClicks:[],
        playerTurn:false,
        start:0,
        clickTimes:-1
      });
      
      $('.block').removeClass('clickable').addClass('unclickable');
      this.timer3 = setTimeout(()=>{
        this.sound(4);
      },4000); 
    }
    //error in non strict mode
    else if(this.state.pcClicks[t]!==this.state.playerClicks[t] && this.state.strict===0){
      this.sound(4);
      $('.block').removeClass('clickable').addClass('unclickable');
      this.flashMessage('- -',2);
      var i=-1;
      var steps = this.state.pcClicks;
      this.timer6 = setTimeout(()=>{
        this.timer4 = setInterval(()=>{
          i++;
          if(i===steps.length){
            clearInterval(this.timer4);
          }else{
            var id = '#block-'+steps[i];
            $(id).fadeOut(150).fadeIn(150);
            this.sound(steps[i]);  
          }
        },1000);
      }, 1500);
      this.setState({playerClicks:[],clickTimes:-1,playerTurn:true});
      $('.block').removeClass('unclickable').addClass('clickable');
    }
          
  }

  setStrict(){
    var strict = this.state.strict===0?1:0;

    this.setState({strict:strict});
  }


  render() {
    var countStr ;
    if(this.state.power==='off'){
      countStr = '';
    }
    else if(this.state.power==='on' && this.state.start===0){
      countStr = '- -';
    }else if(this.state.start===1){
      countStr = (this.state.count+1).toString();
    }

    var strictClass = this.state.strict===0?'strictOff':'strictOn'

    return (
        <div id="board" className="container">
           <div className="blockRow">
              <div id="block-0" style={{backgroundColor:colors[0]}} className="block unclickable"  onClick={()=>this.clickBlock(0)} ></div>
              <div id="block-1" style={{backgroundColor:colors[1]}}  className="block unclickable"   onClick={()=>this.clickBlock(1)} ></div>
           </div>
           <div className="blockRow">
              <div id="block-2" style={{backgroundColor:colors[2]}}  className="block unclickable"  onClick={()=>this.clickBlock(2)} ></div>
              <div id="block-3" style={{backgroundColor:colors[3]}}  className="block unclickable"  onClick={()=>this.clickBlock(3)} ></div>
           </div>
           <div id="boardCenter">
              <h1 className="brand">Simon</h1>
              <div id="count" className="inline">
                  <div id="countNum">{countStr}</div>
                  <h3>Count</h3>
              </div>
              <div id="start" className="inline">
                  <div id="startBtn"  className="clickable" onClick={()=>this.start()} ></div>
                  <h3>Start</h3>
              </div>
              <div id="strict" className="inline">
                  <div id="strictLight" className={"inline "+strictClass}></div>
                  <div id="strictBtn" className="clickable" onClick={()=>{this.setStrict()}} ></div>
                  <h3>Strict</h3>
              </div>
              <div id="power">
                  <span>OFF</span>
                  <div id="switchWrapper" className=" inline" onClick={()=>this.power()}>
                    <div id="switch" className={this.state.power} ></div>
                  </div>
                  <span>ON</span>
              </div>
           </div>  
        </div>
    );
  }
}

export default App;
