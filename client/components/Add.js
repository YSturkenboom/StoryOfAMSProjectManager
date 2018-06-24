import axios from 'axios';
import React from 'react'

insertNewProject(e) {
  axios.post('/insert',
    querystring.stringify({
      title: e.state.title,
      description: e.state.desc,
      date_created: e.state.date
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response) {
    e.setState({
      messageFromServer: response.data
    });
  });
}

class Add extends React.Component {
}