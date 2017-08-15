import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';


class Panels extends React.Component{
  render(){
      var recipes = this.props.recipes;
      return (
          <div className="recipesInner">
          { recipes.map((item,index)=><Panel key={index} myid={index} recipe={item} handleDel={()=>this.props.handleDel(index)}  handleEdit={()=>this.props.handleEdit(index)} /> ) }
          </div>
      );   
  }
}

class Panel extends React.Component{
  constructor(props) {
    super(props);
  
    this.doEdit = this.doEdit.bind(this);
  }

  doEdit(id){
    var name = this.props.recipe.name;
    var ingredients = this.props.recipe.ingredients.join(',');
    $('#editModal #recipeName').val(name);
    $('#editModal #ingredients').val(ingredients);
    $('#editModal #recipeID').val(id);
  }

  render(){
    var ingredients = this.props.recipe.ingredients;
    
    var index = "recipe-"+this.props.myid.toString();
    return (
        <div className="panel-group" id={index}>
          <div className="panel">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" 
                   href={'#'+this.props.myid.toString()}>
                  {this.props.recipe.name}
                </a>
              </h4>
            </div>
            <div id={this.props.myid.toString()} className="panel-collapse collapse">
              <div className="panel-body">
                <h3 className="title">Ingredients</h3>
                <ul className="ingredientsList  list-group">
                { ingredients.map((item,index)=><IngredientsItem key={index} ingredient={item} /> ) }
                </ul>
                <div className="btnsRow">
                    <button className="btn btn-danger" onClick={()=>this.props.handleDel(index)} >Delete</button>
                    <button className="btn btn-default" data-toggle="modal" data-target="#editModal" onClick={()=>this.doEdit(this.props.myid)} >Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

class IngredientsItem extends React.Component{
  render(){
    return (
      <li className="list-group-item">{this.props.ingredient}</li>
    );
  };
}

class AddModal extends React.Component{
  render(){
    return (
      <div id="addForm" role="form">
        <button className="btn btn-lg btn-primary" data-toggle="modal" data-target="#myModal">Add Recipe</button>
        <form onSubmit={
          (e)=>this.props.handleSubmit(e,this.refs.recipeName.value,this.refs.ingredients.value)
        } 
        className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Add a Recipe</h3>
              </div>
              <div className="modal-body">
                <div className="form-group">
                    <label>Recipe</label>
                    <input className="form-control" id='recipeName' ref='recipeName' placeholder="Recipe Name" />
                </div>
                <div className="form-group">
                    <label>Ingredients</label>
                    <textarea className="form-control" id='ingredients' ref='ingredients' placeholder="Enter Ingredients,Separated,By Commas" ></textarea>
                </div>
                
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" type="submit">Add Recipe</button>
                <button id="closeModalBtn" className="btn btn-default"  data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

class EditModal extends React.Component{
  render(){
    return (
      <div id="editForm" role="form">
        <form onSubmit={
          (e)=>this.props.handleEdit(e,this.refs.recipeName.value,this.refs.ingredients.value,this.refs.recipeID.value)
        } 
        className="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Edit a Recipe</h3>
              </div>
              <div className="modal-body">
                <div className="form-group">
                    <label>Recipe</label>
                    <input className="form-control" id='recipeName' ref='recipeName' placeholder="Recipe Name" />
                </div>
                <div className="form-group">
                    <label>Ingredients</label>
                    <textarea className="form-control" id='ingredients' ref='ingredients' placeholder="Enter Ingredients,Separated,By Commas" ></textarea>
                </div>
                <div className="form-group">
                    <input type="hidden" name="recipeID" id="recipeID" ref="recipeID" value="" />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" type="submit">Save Recipe</button>
                <button id="closeEditBtn" className="btn btn-default"  data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    var recipes;
    if(typeof localStorage["_jiang_recipeBook"] !== "undefined"){
      recipes = JSON.parse(localStorage.getItem('_jiang_recipeBook'));
    }
    else{
      recipes = [
        {name:'Pumpkin Pie',ingredients:['Pumpkin Puree','Sweetened Condensed Milk','Eggs','Pumpkin Pie Spice','Pie Crust']},
        {name:'Onion Pie',ingredients:['Onion','Pie Crust','Sounds Yummy right?']}
      ];
      localStorage.setItem('_jiang_recipeBook',JSON.stringify(recipes));
    }

    this.state = {
      recipes:recipes
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount(){
    
  }

  handleSubmit(e,name,ingredients){
    e.preventDefault();
    var recipes = JSON.parse(localStorage.getItem('_jiang_recipeBook'));
    var ingredientsArr = ingredients.split(',');
    var recipe = {name:name,ingredients:ingredientsArr};
    recipes.push(recipe);
    localStorage.setItem('_jiang_recipeBook', JSON.stringify(recipes));
    this.setState({recipes:recipes});
    $('#closeModalBtn').click();
  }

  handleDel(index){
    var recipes = JSON.parse(localStorage.getItem('_jiang_recipeBook'));
    recipes.splice(index, 1);
    localStorage.setItem('_jiang_recipeBook', JSON.stringify(recipes));
    this.setState({recipes:recipes});
  }

  handleEdit(e,name,ingredients,id){
    e.preventDefault(); 
    var recipes = JSON.parse(localStorage.getItem('_jiang_recipeBook'));
    var ingredientsArr = ingredients.split(',');
    recipes[id] = {name:name,ingredients:ingredientsArr};
    localStorage.setItem('_jiang_recipeBook', JSON.stringify(recipes));
    this.setState({recipes:recipes});
    $('#closeEditBtn').click();   
  }

  render() {
    return (
    <div>
      <div id="header"><h1>Create Your Recipe</h1></div>
      <div id="recipes" className="container">
        <div className="jumbotron">
          <Panels recipes={this.state.recipes} handleDel={this.handleDel} />
          <AddModal handleSubmit={this.handleSubmit} />
          <EditModal   handleEdit={this.handleEdit} />
        </div>
      </div>
    </div>
    );
  }
}

export default App;
