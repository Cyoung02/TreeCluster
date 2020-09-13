import React from 'react';
import './Sidebar.css';
import TreeSelect from './TreeSelect';
import Cluster from './Cluster.js';
import Method from './Method.js';
import Threshold from './Threshold.js';

class Sidebar extends React.Component {
  constructor() {
    super() 
    this.ref = React.createRef()
  }

  componentDidMount() {
    document.addEventListener("keydown", this.props.escFunction);
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.props.escFunction);
  }

  render() {
    return (
      <React.Fragment>
        <div className='sidebar' 
	  style={{
            transform: `translatex(${this.props.xPosition}px)`,
	    width: `${this.props.width}px`
          }}>
          <div className='content'>
            <button id='close' onClick={() => this.props.closeMenu()}>close</button>
            <TreeSelect handleFileSelect={this.props.handleFileSelect} />
            <Method handleMethodChange={this.props.handleMethodChange} />
            <Threshold handleThresholdChangeSlider={this.props.handleThresholdChangeSlider} 
	      handleThresholdChangeBox={this.props.handleThresholdChangeBox} />
            <Cluster performClustering={this.props.performClustering} />
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default Sidebar;
