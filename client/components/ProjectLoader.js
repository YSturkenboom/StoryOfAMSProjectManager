import React, { Component } from 'react';
import axios from 'axios';
import '../css/App.css';
const querystring = require('querystring');

class ProjectLoader extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
      		data: null,
    	};
  	}

	getAllProjects() {
	    axios.get('/getAll')
	    .then(function(response) {
	      console.log(response.data);
	      this.setState({data: response.data});
	      
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	}

}