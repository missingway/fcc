import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';


class Markdown extends React.Component{
  render(){

    return (
        <form id="markdown" className="col-xs-6 pull-left">
            <textarea type="text" rows="23" value={this.props.markdown} ref={(el)=>this.markdownField=el} onChange={()=>{this.props.handleChange(this.markdownField.value)}} />
        </form>
    );  
  }
  
}

class MarkdownHtml extends React.Component{
  constructor() {
    super();
  
    this.state = {};
    this.getMarkdownHtml = this.getMarkdownHtml.bind(this);
  }
  getMarkdownHtml(){
    var marked = require('marked');
    var text= marked(this.props.markdown,{sanitize:true});
    return {__html: text};
  }
  render(){
    var html = this.getMarkdownHtml(this.props.markdown);
    return (
      <div id="markdownHtml" className="col-xs-5 pull-right" dangerouslySetInnerHTML={this.getMarkdownHtml()} />
    );
  };
  
}

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
       markdown:'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value){
    this.setState({
      markdown:value
    });
  }


  render() {

    return (
      <div id="wrapper" className="container">
        <Markdown markdown={this.state.markdown} handleChange={this.handleChange} />
        <MarkdownHtml markdown={this.state.markdown} />
      </div>
    );
  }
}

export default App;
