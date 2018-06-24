import React, { Component } from 'react';
import axios from 'axios';
import '../css/App.css';
const querystring = require('querystring');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {data: null};

    this.delete = this.delete.bind(this);
    this.getAllProjects = this.getAllProjects.bind(this);
    this.getProjectsPerCategory = this.getProjectsPerCategory.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addNewProject = this.addNewProject.bind(this);
    
    // get all items, then divide them into categories
    this.getAllProjects();

  }
  
  addNewProject() {
    var self = this;
    axios.post('/insert',
      querystring.stringify({
        title: this.state.title,
        desc: this.state.text,
        category: "flowcharts",
        date: "01-02-2012"
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
    .then(function(response) {
      console.log(response.data);
      self.getAllProjects();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getAllProjects() {
    var self = this;
    axios.get('/getAll')
    .then(function(response) {
      console.log(response.data);
      self.setState({data: response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getProjectsPerCategory(category){
    let buffer = [];
    //console.log("testje" + this.state["3"]["category"]);
    for (var key in this.state.data) {
      if(this.state.data[key]["category"] === category){
        console.log("gevonden");
        buffer.push(this.getProjectHTML(this.state.data[key]));
      }
    }
    return buffer;
  }

  delete(event) {
    console.log(event.target.parentElement.id);
    var self = this;
    axios.get('/delete?id='+event.target.parentElement.id)
    .then(function(response) {
      console.log(response.data);
      // var newState = 
      // var removed = self.state.find(function (obj) { return obj._id === event.target.parentElement.id; });
      self.setState({data: null});
      self.getAllProjects();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onDrop(event){
    console.log("drop");
    event.preventDefault();
    var id = ev.dataTransfer.getData("id");
    ev.target.appendChild(document.getElementById(id));
  }

  allowDrop(event){
    event.preventDefault();
    console.log("allowDrop");
  }

  onDragStart(event){
    console.log("drag");
    event.dataTransfer.setData("id", event.target.id);
  }


  getProjectHTML(projectData){
    return (
      <div class="project" id={projectData._id} draggable="true" onDragStart={this.onDragStart} onDrop={this.onDrop}>
        <h2 class="title"> {projectData.title} </h2>
        <p class="desc"> {projectData.description} </p>
        <p class="date"> {projectData.date_created} </p>
        <button onClick={this.delete}> Delete </button>
      </div>
    )
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleTextChange(event) {
    this.setState({text: event.target.value});
  }

  render() {

    
    return (
      <div className="App">
        <section class="categories">
          <div class="category"> </div>
          <div class="category"> Flowcharts </div>
          <div class="category"> Wireframe </div>
          <div class="category"> Prototype </div>
          <div class="category"> Development </div>
          <div class="category"> Test </div>
          <div class="category"> Launch </div>
          <div class="category"> </div>
        </section>


        <section class="projects-container">
          <div class="projectlist"></div>
          <div class="projectlist">
          {this.getProjectsPerCategory("flowcharts")}
          </div>

          <div class="projectlist" allowDrop={this.allowDrop} onDrop={this.onDrop}>
          {this.getProjectsPerCategory("wireframe")}
          </div>

          <div class="projectlist">
          {this.getProjectsPerCategory("prototype")}
          </div>

          <div class="projectlist">
          {this.getProjectsPerCategory("development")}
          </div>

          <div class="projectlist">
          {this.getProjectsPerCategory("test")}
          </div>

          <div class="projectlist">
          {this.getProjectsPerCategory("launch")}
          </div>

          <div class="projectlist"></div>
        </section>

        <section class="addDialog">
          <div class="addDialog">
            <p> Add a new project </p>
            <input type="text" name="title" hint="Project title" onChange={this.handleTitleChange} />
            <input type="text" name="desc" hint="Project description"  onChange={this.handleTextChange} />
            <button onClick={this.addNewProject}>Create project</button>
          </div>
        </section>
      </div>
    );
  }
}



export default App;
