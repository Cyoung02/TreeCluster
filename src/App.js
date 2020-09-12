import React from 'react';
import './App.css';
import TreeSelect from './components/TreeSelect';
import Cluster from './components/Cluster.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      tree: ''
    }
  }

  handleFileSelect = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  performClustering = (event) => {
      const fr = new FileReader();
      fr.onload = (event) => {
        document.getElementById('tester').textContent=fr.result;
        this.setState({
          tree: fr.result
        });
      }
      fr.readAsText(this.state.file);
  }

  render() { 
    return (
      <React.Fragment>
        <TreeSelect handleFileSelect={this.handleFileSelect} />
        <Cluster performClustering={this.performClustering} />
	<pre id='tester'></pre>
      </React.Fragment>
    );
  }
}

export default App;
