import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      fileSize: '',
      tree: '',
      method: 'Maximum Clade',
      threshold: '0.5',
      xPosition: -200,
      open: false
    }
  }

  /*
   * Reads the file into the tree state variable
   * TODO check for invalid tree
   */
  handleFileSelect = (event) => {
    event.persist()
    this.setState({
      fileName: event.target.files[0].name,
      fileSize: event.target.files[0].size
    });
    const fr = new FileReader();
    fr.onload = (event) => {
      document.getElementById('tester').textContent=fr.result;
      this.setState({
        tree: fr.result
      });
    }
    fr.readAsText(event.target.files[0]);
    console.log(event)
  }

  /*
   * performs clustering analyses
   */
  performClustering = (event) => {
    //TODO perform clustering analyses
  }

  /*
   * Update the clustering method state variable
   * when the clustering method is altered
   * TODO Add Clustering Method Description
   */
  handleMethodChange = (event) => {
    this.setState({
      method: event.target.value
    });
  }

  /*
   * When the clustering threshold slider changes, set
   * the box to match and update the state variable
   */
  handleThresholdChangeSlider = (event) => {
    this.setState({
      threshold: event.target.value
    });
    document.getElementById('box').value = document.getElementById('slider').value;
  }
  
  /*
   * When the clustering threshold box changes, set the
   * slider to match and update the state variable
   */
  handleThresholdChangeBox = (event) => {
    this.setState({
      threshold: event.target.value
    });
    document.getElementById('slider').value = document.getElementById('box').value;
  }

  /*
   * closes sidebar
   */
  closeMenu = () => {
    this.setState({
      xPosition: -200,
      open: false
    });
  }

  /*
   * opens sidebar and sets open state
   * to prevent abrupt closing animations
   */
  openMenu = () => {
    this.setState({
      xPosition: 0
    });
    setTimeout(() => { 
      this.setState({open: true}); 
    }, 800);
  }
 
  escFunction = (event) => {
    if(event.keyCode === 27 && this.state.open) {
      this.closeMenu();
    }
  }

  render() { 
    return (
      <React.Fragment>
        <Sidebar 
	  width='200'
	  xPosition={this.state.xPosition}
	  escFunction={this.escFunction}
	  closeMenu={this.closeMenu}
	  openMenu={this.openMenu}
          handleFileSelect={this.handleFileSelect}
          handleMethodChange={this.handleMethodChange}
          handleThresholdChangeSlider={this.handleThresholdChangeSlider}
          handleThresholdChangeBox={this.handleThresholdChangeBox}
          performClustering={this.performClustering}
        />
        <button onClick={() => this.openMenu()}>menu
        </button>
        <pre id='tester'></pre>
      </React.Fragment>
    );
  }
}

export default App;
