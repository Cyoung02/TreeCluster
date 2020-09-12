import React from 'react';
import './App.css';
import TreeSelect from './components/TreeSelect';
import Cluster from './components/Cluster.js';
import Method from './components/Method.js';
import Threshold from './components/Threshold.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      tree: '',
      method: 'Maximum Clade',
      threshold: ''
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

  //TODO add description of clustering methods beneath?
  handleMethodChange = (event) => {
    this.setState({
      method: event.target.value
    });
  }

  handleThresholdChangeSlider = (event) => {
    this.setState({
      threshold: event.target.value
    });
    document.getElementById('box').value = document.getElementById('slider').value;
  }

  handleThresholdChangeBox = (event) => {
    this.setState({
      threshold: event.target.value
    });
    document.getElementById('slider').value = document.getElementById('box').value;
  }

  render() { 
    return (
      <React.Fragment>
        <TreeSelect handleFileSelect={this.handleFileSelect} />
        <Method handleMethodChange={this.handleMethodChange} />
        <Threshold handleThresholdChangeSlider={this.handleThresholdChangeSlider} handleThresholdChangeBox={this.handleThresholdChangeBox} />
        <Cluster performClustering={this.performClustering} />
        <pre id='tester'></pre>
      </React.Fragment>
    );
  }
}

export default App;
