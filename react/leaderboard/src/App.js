import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';


class Header extends React.Component{
  render(){
    return (
      <div id="header">
         <h1 id="logo"><a href="https://www.freecodecamp.com"><img src="http://www.freecodecamp.cn/images/logo-navbar.png" /></a></h1>
      </div>
    );
  };
}

class Footer extends React.Component{
  render(){
    return (
      <div id="footer" className="text-center">
         <a href="#">Camper Leaderboard By Missingway with React</a>
      </div>
    );
  };
}

class CamperRow extends React.Component{
  render(){
    var rowClass = this.props.id%2===0?'even':'odd';
    return (
      <tr className={rowClass}>
        <td style={{width:'10%'}} >{this.props.id}</td>
        <td style={{width:'30%'}} >{this.props.camper.username}</td>
        <td style={{width:'30%'}} >{this.props.camper.recent}</td>
        <td style={{width:'30%'}} >{this.props.camper.alltime}</td>
      </tr>
    );
  }
}

class CampersRows extends React.Component{
  render(){
    var rows = this.props.campers;
    return(
      <tbody>
        {
          rows.map((item,index)=><CamperRow key={index} id={index+1} camper={item} />)
        }
      </tbody> 
    );
  };
}



class TopCampersTbl extends React.Component{
  
  render(){
    var recentClass = '';
    var alltimeClass = '';
    if(this.props.search==='recent'){
      recentClass = 'active glyphicon  glyphicon-circle-arrow-down';
      alltimeClass = '';
    }
    else if(this.props.search==='alltime'){
      alltimeClass = 'active glyphicon  glyphicon-circle-arrow-down';
      recentClass = '';
    }
    return (
      <div id="topCampers">
        <table id="TopCampersTbl" className="table">
           <caption>FCC Campers Leaderboard</caption>
           <thead>
              <tr>
                 <th>#</th>
                 <th>Camper Name</th>
                 <th><span id="recent" onClick={()=>this.props.handleSearch('recent')}  className={recentClass} >Points in past 30 days</span></th>
                 <th><span id="alltime"  onClick={()=>this.props.handleSearch('alltime')} className={alltimeClass} >All time points</span></th>
              </tr>
           </thead>
           <CampersRows campers={this.props.campers} />
        </table>
      </div>
    );
  };
}


class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      search:'alltime', 
      campers:[]
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.getCampers = this.getCampers.bind(this);
  }

  componentDidMount(){
    this.getCampers(this.state.search);
  }

  getCampers(search){
    var main = this;
    var url = '';
    if(search==='recent'){
      url = ('http://fcctop100.herokuapp.com/api/fccusers/top/recent').toString();
    }
    else if(search==='alltime'){
      url = ('http://fcctop100.herokuapp.com/api/fccusers/top/alltime').toString();
    }
    $.ajax({
        url: url,
        success: function(data) {
          main.setState({
            campers:data
          });
        }
    });
  }

  handleSearch(search){
    this.setState({search:search});
    this.getCampers(search);
  }

  render() {
    return (
      <div id="leaderBoard" className="container">
        <Header />
        <TopCampersTbl campers={this.state.campers} search={this.state.search} handleSearch={this.handleSearch}/>
        <Footer />
      </div>
    );
  }
}

export default App;
